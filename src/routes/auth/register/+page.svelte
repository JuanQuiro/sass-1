<script lang="ts">
  import Spinner from '$lib/components/Spinner.svelte';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { toasts } from '$lib/stores/toast';
  import { Button } from '$lib/components/ui/button/index.js';
  import { MessageCircle, ArrowLeft, Eye, EyeOff } from '@lucide/svelte';
  export let form: any;
  let pending = false;
  let localToast: { type: 'success' | 'error'; message: string } | null = null;
  const supportUrl = 'https://wa.me/?text=' + encodeURIComponent('Hola BellezaApp, necesito ayuda con mi registro.');
  let showPassword = false;
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

<div class="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex relative overflow-hidden">
  <!-- Left: Register Form -->
  <div class="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">
    <div class="w-full max-w-md space-y-8">
      <!-- Header -->
      <div class="text-center space-y-4">
        <a href="/" on:click|preventDefault={smartBack} class="inline-flex items-center text-gray-600 hover:text-primary transition-colors duration-300 group mb-6">
          <ArrowLeft class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Volver al inicio
        </a>
        <div class="space-y-2">
          <h1 class="font-serif text-4xl font-bold bg-gradient-to-r from-gray-900 via-primary to-rose-600 bg-clip-text text-transparent">Crea tu cuenta</h1>
          <p class="text-gray-600 text-lg">Únete a la revolución digital de la belleza</p>
        </div>
      </div>

      <!-- Card -->
      <div class="border-0 shadow-lg bg-white relative overflow-hidden rounded-xl">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-rose-400/5"></div>
        <div class="space-y-6 relative z-10 p-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-serif text-gray-900">Bienvenido</h2>
            <a href={supportUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp soporte" title="WhatsApp soporte">
              <Button variant="outline" size="sm" class="border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 transition-colors duration-300 bg-white">
                <MessageCircle class="w-4 h-4 mr-2" />
                Soporte
              </Button>
            </a>
          </div>
          <p class="text-gray-600">Regístrate para usar BellezaApp. Recibirás acceso inmediato tras crear tu cuenta.</p>

          <form method="POST" use:enhance={submit} class="space-y-6">
            {#if form?.error && !form?.field}
              <div class="rounded border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-2">{form.error}</div>
            {/if}

            <!-- Owner Name -->
            <div class="space-y-2">
              <label for="name" class="text-gray-700 font-medium">Nombre del dueño</label>
              <input id="name" name="name" type="text" placeholder="Tu nombre completo" class="h-12 w-full border-2 border-gray-200 focus:border-primary focus:ring-primary/20 bg-white rounded-md px-4 aria-[invalid=true]:border-red-300 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-200" aria-invalid={form?.field === 'name'} />
              {#if form?.field === 'name'}
                <p class="text-sm text-red-600">{form.error}</p>
              {/if}
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <label for="email" class="text-gray-700 font-medium">Email</label>
              <input id="email" name="email" type="email" placeholder="correo@ejemplo.com" class="h-12 w-full border-2 border-gray-200 focus:border-primary focus:ring-primary/20 bg-white rounded-md px-4 aria-[invalid=true]:border-red-300 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-200" aria-invalid={form?.field === 'email' || (form?.error && /email/i.test(form.error))} />
              {#if form?.field === 'email' || (form?.error && /email/i.test(form.error))}
                <p class="text-sm text-red-600">{form.error}</p>
              {/if}
            </div>

            <!-- Username (optional) -->
            <div class="space-y-2">
              <label for="username" class="text-gray-700 font-medium">Usuario <span class="text-gray-400 text-sm">(opcional)</span></label>
              <input id="username" name="username" type="text" placeholder="tusalon" class="h-12 w-full border-2 border-gray-200 focus:border-primary focus:ring-primary/20 bg-white rounded-md px-4 aria-[invalid=true]:border-red-300 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-200" aria-invalid={form?.field === 'username' || (form?.error && /user(name)?|usuario/i.test(form.error))} />
              {#if form?.field === 'username' || (form?.error && /user(name)?|usuario/i.test(form.error))}
                <p class="text-sm text-red-600">{form.error}</p>
              {/if}
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <label for="password" class="text-gray-700 font-medium">Contraseña</label>
              <div class="relative">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" class="h-12 w-full pr-12 border-2 border-gray-200 focus:border-primary focus:ring-primary/20 bg-white rounded-md px-4 aria-[invalid=true]:border-red-300 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-200" required aria-invalid={form?.field === 'password' || (form?.error && /password|contraseña/i.test(form.error))} />
                <Button type="button" variant="ghost" size="sm" class="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0" on:click={() => (showPassword = !showPassword)}>
                  {#if showPassword}
                    <EyeOff class="w-5 h-5 text-gray-500" />
                  {:else}
                    <Eye class="w-5 h-5 text-gray-500" />
                  {/if}
                </Button>
              </div>
              {#if form?.field === 'password' || (form?.error && /password|contraseña/i.test(form.error))}
                <p class="text-sm text-red-600">{form.error}</p>
              {/if}
            </div>

            <!-- Helper note -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p class="text-blue-700 text-sm">Por ahora, solo Email y Contraseña son requeridos.</p>
            </div>

            <!-- Terms (decorative) -->
            <div class="space-y-3">
              <label class="flex items-start space-x-3 cursor-pointer">
                <input type="checkbox" class="w-4 h-4 text-primary border-2 border-gray-300 rounded focus:ring-primary/20 mt-0.5" />
                <span class="text-gray-600 text-sm leading-relaxed">
                  Acepto los <a href="/terms" class="text-primary hover:text-primary/80 font-medium">Términos de Servicio</a>
                  y la <a href="/privacy" class="text-primary hover:text-primary/80 font-medium">Política de Privacidad</a>
                </span>
              </label>
            </div>

            <!-- Submit -->
            <Button type="submit" disabled={pending} class="w-full h-12 bg-gradient-to-r from-primary to-rose-400 hover:from-primary/90 hover:to-rose-400/90 text-white font-semibold shadow disabled:opacity-60">
              {#if pending}
                <span class="inline-flex items-center gap-2"><Spinner size={16}/> Creando cuenta...</span>
              {:else}
                Crear cuenta
              {/if}
            </Button>

            <!-- Divider -->
            <div class="relative">
              <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200" /></div>
              <div class="relative flex justify-center text-sm"><span class="px-4 bg-white text-gray-500">o regístrate con</span></div>
            </div>

            <!-- Social buttons (decorative) -->
            <div class="grid grid-cols-2 gap-4">
              <Button variant="outline" class="h-12 border-2 border-gray-200 bg-white"> 
                <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </Button>
              <Button variant="outline" class="h-12 border-2 border-gray-200 bg-white">
                <svg class="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </Button>
            </div>

            <!-- Login link -->
            <div class="text-center pt-2">
              <p class="text-gray-600">¿Ya tienes una cuenta? <a href="/auth/login" class="text-primary hover:text-primary/80 font-semibold transition-colors">Iniciar sesión</a></p>
            </div>
          </form>
        </div>
      </div>

      <!-- Trust indicators -->
      <div class="text-center space-y-4">
        <div class="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Registro gratuito</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-primary rounded-full"></div>
            <span>Sin comisiones</span>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Right: Visual Elements (lightweight) -->
  <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
    <div class="text-center space-y-8 relative z-10">
      <div class="bg-white rounded-3xl p-12 shadow-lg border border-primary/10 relative">
        <div class="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6"><path fill="white" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        </div>
        <div class="absolute -bottom-4 -left-4 w-10 h-10 bg-rose-400 rounded-full flex items-center justify-center shadow-lg"></div>
        <div class="space-y-6">
          <h2 class="font-serif text-4xl font-bold bg-gradient-to-r from-gray-900 via-primary to-rose-600 bg-clip-text text-transparent">¡Únete hoy!</h2>
          <p class="text-gray-700 text-xl leading-relaxed">Más de 500+ salones ya confían en nosotros</p>
          <div class="space-y-4">
            <div class="flex items-center justify-center space-x-3 p-4 bg-white rounded-2xl border border-primary/10">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <span class="text-primary font-semibold">Configuración en 5 minutos</span>
            </div>
            <div class="flex items-center justify-center space-x-3 p-4 bg-white rounded-2xl border border-primary/10">
              <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span class="text-primary font-semibold">Soporte 24/7 por WhatsApp</span>
            </div>
            <div class="flex items-center justify-center space-x-3 p-4 bg-white rounded-2xl border border-primary/10">
              <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span class="text-primary font-semibold">Plan gratuito para siempre</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Floating WhatsApp -->
  <div class="fixed bottom-8 right-8 z-50">
    <a href={supportUrl} target="_blank" rel="noopener noreferrer">
      <Button size="lg" class="h-14 w-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow">
        <MessageCircle class="w-7 h-7 text-white" />
      </Button>
    </a>
  </div>
</div>

{#if localToast}
  <div class="fixed bottom-4 left-1/2 -translate-x-1/2 rounded px-4 py-3 text-sm border bg-white shadow"
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
  <div class="max-w-md mx-auto mt-4 rounded border border-gray-200 bg-gray-50 p-3">
    <p class="text-xs text-gray-700"><strong>Status:</strong> {form?.httpStatus ?? '—'}</p>
    {#if form?.detail}
      <p class="mt-1 text-xs text-gray-700"><strong>Detalle:</strong> {form.detail}</p>
    {/if}
    {#if form?.rawJson}
      <pre class="mt-2 text-[11px] leading-snug text-gray-700 overflow-auto">{JSON.stringify(form.rawJson, null, 2)}</pre>
    {/if}
  </div>
{/if}
