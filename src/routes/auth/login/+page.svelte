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
  const supportUrl = 'https://wa.me/?text=' + encodeURIComponent('Hola BellezaApp, necesito ayuda con mi cuenta.');
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
  const submit = () => {
    pending = true;
    return async ({ result }: { result: any }) => {
      console.info('[login enhance] result.type =', result?.type, 'result =', result);
      pending = false;
      if (result?.type === 'success' || result?.type === 'redirect') {
        localToast = { type: 'success', message: '¡Bienvenido!' };
        toasts.success('¡Bienvenido!');
      } else if (result?.type === 'failure') {
        localToast = { type: 'error', message: result.data?.error || 'No se pudo iniciar sesión' };
        // evitar toast global duplicado
      }
    };
  };
  const onSupportClick = (e: Event) => {
    // Let anchor handle navigation; keep button subtle
  };
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <form method="POST" use:enhance={submit} class="w-full max-w-sm bg-white shadow rounded p-6 space-y-4">
    <div class="flex items-center justify-between">
      <a href="/" on:click|preventDefault={smartBack} class="inline-block">
        <Button variant="outline" class="h-8 px-3 text-sm">⬅ Volver</Button>
      </a>
      <div class="flex items-center gap-2">
        <a href={supportUrl} target="_blank" rel="noopener noreferrer" class="inline-block" aria-label="WhatsApp soporte" title="WhatsApp soporte">
          <Button variant="outline" class="h-8 w-8 p-0 rounded-full">
            <MessageCircle class="w-4 h-4 text-[#25D366]" />
          </Button>
        </a>
      </div>
    </div>
    <h1 class="text-xl font-semibold text-gray-900">Iniciar sesión</h1>
    {#if form?.error}
      <div class="rounded border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-2">
        {form.error}
      </div>
    {/if}
    {#if form?.error && !form?.field}
      <div class="mb-2 rounded border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-2">{form.error}</div>
    {/if}
    <div class="space-y-2">
      <label for="identity" class="text-sm text-gray-700">Email o usuario</label>
      <input id="identity" name="identity" class="w-full border rounded px-3 py-2 aria-[invalid=true]:border-red-300 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-200" placeholder="email@dominio.com" required aria-invalid={form?.field === 'email' || form?.field === 'username' || (form?.error && /email|usuario|user(name)?/i.test(form.error))} />
      {#if form?.field === 'email' || form?.field === 'username' || (form?.error && /email|usuario|user(name)?/i.test(form.error))}
        <p class="text-xs text-red-600">{form.error}</p>
      {/if}
    </div>
    <div class="space-y-2">
      <label for="password" class="text-sm text-gray-700">Contraseña</label>
      <input id="password" type="password" name="password" class="w-full border rounded px-3 py-2 aria-[invalid=true]:border-red-300 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-200" required aria-invalid={form?.field === 'password' || (form?.error && /password|contraseña/i.test(form.error))} />
      {#if form?.field === 'password' || (form?.error && /password|contraseña/i.test(form.error))}
        <p class="text-xs text-red-600">{form.error}</p>
      {/if}
    </div>
    <button class="w-full bg-[#C9A76F] hover:bg-[#b49157] text-white rounded px-4 py-2 disabled:opacity-50" disabled={pending}>
      {#if pending}
        <span class="inline-flex items-center justify-center gap-2"><Spinner size={16}/> Entrando...</span>
      {:else}
        Iniciar sesión
      {/if}
    </button>
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
</div>
