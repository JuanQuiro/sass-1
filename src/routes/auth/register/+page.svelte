<script lang="ts">
  import Spinner from '$lib/components/Spinner.svelte';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { toasts } from '$lib/stores/toast';
  import { Button } from '$lib/components/ui/button/index.js';
  import { MessageCircle } from '@lucide/svelte';
  export let form: any;
  let pending = false;
  let localToast: { type: 'success' | 'error'; message: string } | null = null;
  const supportUrl = 'https://wa.me/?text=' + encodeURIComponent('Hola BellezaApp, necesito ayuda con mi registro.');
  const submit = () => {
    pending = true;
    return async ({ result }: { result: any }) => {
      pending = false;
      if (result?.type === 'success' || result?.type === 'redirect') {
        localToast = { type: 'success', message: '¡Bienvenido!' };
        toasts.success('¡Bienvenido!');
      } else if (result?.type === 'failure') {
        localToast = { type: 'error', message: result.data?.error || 'No se pudo crear la cuenta' };
        // No disparamos toast global adicional para evitar duplicar
      }
    };
  };
  function smartBack() {
    try {
      if (typeof document !== 'undefined' && typeof location !== 'undefined') {
        const ref = document.referrer;
        if (ref && new URL(ref).origin === location.origin) {
          history.back();
          return;
        }
      }
    } catch {}
    goto('/');
  }
</script>

<svelte:head>
  <title>Crear cuenta — BellezaApp</title>
  <meta name="description" content="Regístrate en BellezaApp para gestionar tu salón en Venezuela." />
</svelte:head>

<section class="max-w-md mx-auto px-4 py-12">
  <div class="mb-6 flex items-center justify-between">
    <a href="/" on:click|preventDefault={smartBack} class="inline-block">
      <Button variant="outline" class="cursor-pointer h-8 px-3 text-sm">⬅ Volver</Button>
    </a>
    <div class="flex items-center gap-2">
      <a href={supportUrl} target="_blank" rel="noopener noreferrer" class="inline-block" aria-label="WhatsApp soporte" title="WhatsApp soporte">
        <Button variant="outline" class="cursor-pointer h-8 w-8 p-0 rounded-full">
          <MessageCircle class="w-4 h-4 text-[#25D366]" />
        </Button>
      </a>
      <a href="/auth/login" class="inline-block"><Button class="cursor-pointer h-8 px-3 text-sm">Iniciar sesión</Button></a>
    </div>
  </div>
  {#if form?.error}
    <div class="mb-4 rounded border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-2">
      {form.error}
    </div>
  {/if}
  <h1 class="font-serif text-3xl font-bold mb-2">Crea tu cuenta</h1>
  <p class="text-gray-600 mb-6">Regístrate para usar BellezaApp. Recibirás acceso inmediato tras crear tu cuenta.</p>

  <form method="POST" use:enhance={submit} class="space-y-4">
    {#if form?.error && !form?.field}
      <div class="rounded border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-2">{form.error}</div>
    {/if}
    <div>
      <label for="name" class="block text-sm mb-1">Nombre del dueño</label>
      <input id="name" name="name" class="w-full border rounded px-3 py-2 aria-[invalid=true]:border-red-300 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-200" placeholder="Tu nombre" aria-invalid={form?.field === 'name'} />
      {#if form?.field === 'name'}
        <p class="mt-1 text-xs text-red-600">{form.error}</p>
      {/if}
    </div>
    <div>
      <label for="email" class="block text-sm mb-1">Email</label>
      <input id="email" type="email" name="email" class="w-full border rounded px-3 py-2 aria-[invalid=true]:border-red-300 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-200" placeholder="correo@ejemplo.com" aria-invalid={form?.field === 'email' || (form?.error && /email/i.test(form.error))} />
      {#if form?.field === 'email' || (form?.error && /email/i.test(form.error))}
        <p class="mt-1 text-xs text-red-600">{form.error}</p>
      {/if}
    </div>
    <div>
      <label for="username" class="block text-sm mb-1">Usuario <span class="text-xs text-gray-500">(opcional)</span></label>
      <input id="username" name="username" class="w-full border rounded px-3 py-2 aria-[invalid=true]:border-red-300 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-200" placeholder="tusalon" aria-invalid={form?.field === 'username' || (form?.error && /user(name)?|usuario/i.test(form.error))} />
      {#if form?.field === 'username' || (form?.error && /user(name)?|usuario/i.test(form.error))}
        <p class="mt-1 text-xs text-red-600">{form.error}</p>
      {/if}
      <p class="mt-1 text-xs text-gray-500">Por ahora, solo Email y Contraseña son requeridos.</p>
    </div>
    <div>
      <label for="password" class="block text-sm mb-1">Contraseña</label>
      <input id="password" type="password" name="password" class="w-full border rounded px-3 py-2 aria-[invalid=true]:border-red-300 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-200" required aria-invalid={form?.field === 'password' || (form?.error && /password|contraseña/i.test(form.error))} />
      {#if form?.field === 'password' || (form?.error && /password|contraseña/i.test(form.error))}
        <p class="mt-1 text-xs text-red-600">{form.error}</p>
      {/if}
    </div>
    <div class="flex items-center gap-3">
      <Button type="submit" disabled={pending} class="cursor-pointer disabled:opacity-50 bg-[#C9A76F] hover:bg-[#b49157] text-white">
        {#if pending}
          <span class="inline-flex items-center gap-2"><Spinner size={16}/> Enviando...</span>
        {:else}
          Crear cuenta
        {/if}
      </Button>
    </div>
  </form>

  {#if localToast}
    <div class="mt-4 rounded px-4 py-3 text-sm border"
      class:!bg-green-50={localToast.type === 'success'}
      class:!text-green-800={localToast.type === 'success'}
      class:!border-green-200={localToast.type === 'success'}
      class:!bg-red-50={localToast.type === 'error'}
      class:!text-red-800={localToast.type === 'error'}
      class:!border-red-200={localToast.type === 'error'}>
      {localToast.message}
    </div>
  {/if}

  {#if form?.httpStatus || form?.detail || form?.rawJson}
    <div class="mt-4 rounded border border-gray-200 bg-gray-50 p-3">
      <p class="text-xs text-gray-700"><strong>Status:</strong> {form?.httpStatus ?? '—'}</p>
      {#if form?.detail}
        <p class="mt-1 text-xs text-gray-700"><strong>Detalle:</strong> {form.detail}</p>
      {/if}
      {#if form?.rawJson}
        <pre class="mt-2 text-[11px] leading-snug text-gray-700 overflow-auto">{JSON.stringify(form.rawJson, null, 2)}</pre>
      {/if}
    </div>
  {/if}
</section>
