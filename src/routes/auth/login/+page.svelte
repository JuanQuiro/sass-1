<script lang="ts">
  import Spinner from '$lib/components/Spinner.svelte';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { toasts } from '$lib/stores/toast';
  import { Button } from '$lib/components/ui/button/index.js';
  import { MessageCircle, ArrowLeft, Eye, EyeOff, Sparkles, Crown, Scissors } from '@lucide/svelte';
  export let form: any;
  let pending = false;
  let localToast: { type: 'success' | 'error'; message: string } | null = null;
  const supportUrl = 'https://wa.me/?text=' + encodeURIComponent('Hola BellezaApp, necesito ayuda con mi cuenta.');
  let showPassword = false;
  let identity = '';
  let password = '';
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

<div class="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex relative overflow-hidden">
  <!-- Animated SVG Background Pattern -->
  <div class="absolute inset-0 opacity-5 pointer-events-none">
    <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="beauty-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <!-- Scissors -->
          <g transform="translate(20,20)" class="animate-pulse">
            <path d="M8 2L4 6L8 10M16 2L20 6L16 10M12 6H20" stroke="#C9A76F" stroke-width="1.5" fill="none" opacity="0.6" />
          </g>
          <!-- Mirror -->
          <g transform="translate(80,20)" class="animate-bounce" style="animation-delay: 1s; animation-duration: 3s;">
            <circle cx="12" cy="12" r="8" stroke="#F9E6E0" stroke-width="1.5" fill="none" opacity="0.4" />
            <path d="M12 20V24" stroke="#C9A76F" stroke-width="2" opacity="0.6" />
          </g>
          <!-- Flower -->
          <g transform="translate(20,80)" class="animate-spin" style="animation-duration: 8s;">
            <path d="M12 2C12 2 8 6 12 10C16 6 12 2 12 2ZM2 12C2 12 6 8 10 12C6 16 2 12 2 12ZM22 12C22 12 18 8 14 12C18 16 22 12 22 12ZM12 22C12 22 8 18 12 14C16 18 12 22 12 22Z" fill="#F9E6E0" opacity="0.3" />
            <circle cx="12" cy="12" r="2" fill="#C9A76F" opacity="0.6" />
          </g>
          <!-- Lipstick -->
          <g transform="translate(80,80)" class="animate-pulse" style="animation-delay: 2s;">
            <rect x="10" y="8" width="4" height="12" rx="2" fill="#F9E6E0" opacity="0.4" />
            <rect x="9" y="4" width="6" height="6" rx="3" fill="#C9A76F" opacity="0.6" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#beauty-pattern)" />
    </svg>
  </div>

  <!-- Left Side - Visual Elements (appears right on lg via order) -->
  <div class="hidden lg:flex lg:w-1/2 lg:order-2 relative overflow-hidden">
    <div class="hidden lg:flex items-center justify-center p-6 order-2 lg:order-1 relative">
      <div class="relative">
        <div class="bg-gradient-to-br from-white via-rose-50 to-amber-50 rounded-3xl p-12 shadow-lg border border-primary/10 relative z-10">
          <!-- Floating Icons -->
          <div class="absolute -top-6 -left-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <Crown class="w-6 h-6 text-white" />
          </div>
          <div class="absolute -top-4 -right-8 w-10 h-10 bg-rose-400 rounded-full flex items-center justify-center shadow-lg">
            <Sparkles class="w-5 h-5 text-white" />
          </div>
          <div class="absolute -bottom-6 -right-4 w-14 h-14 bg-gradient-to-r from-primary to-rose-400 rounded-full flex items-center justify-center shadow-lg">
            <Scissors class="w-7 h-7 text-white" />
          </div>

          <div class="text-center space-y-6">
            <div class="relative">
              <h2 class="font-serif text-4xl font-bold bg-gradient-to-r from-gray-900 via-primary to-rose-600 bg-clip-text text-transparent mb-4">BellezaApp</h2>
              <div class="absolute -inset-2 bg-gradient-to-r from-primary/20 to-rose-400/20 rounded-lg blur-xl opacity-30 animate-gentle-pulse -z-10"></div>
            </div>
            <p class="text-gray-700 text-xl leading-relaxed font-medium">La revolución digital para tu salón de belleza</p>
            <div class="space-y-4">
              <div class="flex items-center justify-center space-x-3 p-4 bg-white rounded-2xl border border-primary/10">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="text-primary font-semibold text-lg">Sin comisiones</span>
              </div>
              <div class="flex items-center justify-center space-x-3 p-4 bg-white rounded-2xl border border-primary/10">
                <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span class="text-primary font-semibold text-lg">Pagos venezolanos</span>
              </div>
              <div class="flex items-center justify-center space-x-3 p-4 bg-white rounded-2xl border border-primary/10">
                <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span class="text-primary font-semibold text-lg">IA integrada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Right Side - Login Form (appears left on lg via order) -->
  <div class="w-full lg:w-1/2 lg:order-1 flex items-center justify-center p-6 lg:p-12 relative">
    <div class="w-full max-w-md space-y-8 relative z-10">
      <!-- Header -->
      <div class="text-center space-y-4">
        <a href="/" on:click|preventDefault={smartBack} class="inline-flex items-center text-gray-600 hover:text-primary transition-all duration-500 group mb-8 transform">
          <ArrowLeft class="w-4 h-4 mr-2 group-hover:-translate-x-2 transition-transform duration-500" />
          Volver al inicio
        </a>
        <div class="space-y-2 relative">
          <h1 class="font-serif text-4xl font-bold bg-gradient-to-r from-gray-900 via-primary to-rose-600 bg-clip-text text-transparent relative">
            Iniciar Sesión
            <div class="absolute -inset-4 bg-gradient-to-r from-primary/10 to-rose-400/10 rounded-2xl blur-2xl opacity-50 animate-gentle-pulse -z-10"></div>
          </h1>
          <p class="text-gray-600 text-lg">Accede a tu mundo de belleza</p>
        </div>
      </div>

      <!-- Login Card -->
      <div class="relative">
        <div class="border-0 shadow-lg bg-white relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-rose-400/5"></div>

          <div class="space-y-4 pb-8 relative z-10 p-6">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-serif text-gray-900 relative">Bienvenido</h2>
              <a href={supportUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp soporte" title="WhatsApp soporte">
                <Button variant="outline" size="sm" class="border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 transition-all duration-500 bg-white">
                  <MessageCircle class="w-4 h-4 mr-2" />
                  Soporte
                </Button>
              </a>
            </div>
            <p class="text-gray-600 text-lg">Ingresa y transforma tu negocio</p>
          </div>

          <div class="space-y-6 relative z-10 p-6 pt-0">
            <form method="POST" class="space-y-6" use:enhance={submit}>
              <!-- Email/user field -->
              <div class="space-y-2 group">
                <label for="identity" class="text-gray-700 font-medium">Email o usuario</label>
                <div class="relative">
                  <input id="identity" name="identity" bind:value={identity} type="text" placeholder="email@dominio.com" class="h-12 w-full border-2 border-gray-200 focus:border-primary focus:ring-primary/20 bg-white rounded-md px-4 aria-[invalid=true]:border-red-300 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-200" required aria-invalid={form?.field === 'email' || form?.field === 'username' || (form?.error && /email|usuario|user(name)?/i.test(form.error))} />
                  <div class="absolute inset-0 rounded-md pointer-events-none"></div>
                </div>
                {#if form?.field === 'email' || form?.field === 'username' || (form?.error && /email|usuario|user(name)?/i.test(form.error))}
                  <p class="text-sm text-red-600">{form.error}</p>
                {/if}
              </div>

              <!-- Password field -->
              <div class="space-y-2 group">
                <label for="password" class="text-gray-700 font-medium">Contraseña</label>
                <div class="relative">
                  <input id="password" name="password" bind:value={password} type={showPassword ? 'text' : 'password'} placeholder="••••••••" class="h-12 w-full pr-12 border-2 border-gray-200 focus:border-primary focus:ring-primary/20 bg-white rounded-md px-4 aria-[invalid=true]:border-red-300 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-200" required aria-invalid={form?.field === 'password' || (form?.error && /password|contraseña/i.test(form.error))} />
                  <Button type="button" variant="ghost" size="sm" class="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0">
                    {#if showPassword}
                      <EyeOff class="w-5 h-5 text-gray-500" />
                    {:else}
                      <Eye class="w-5 h-5 text-gray-500" />
                    {/if}
                  </Button>
                  <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-rose-400/5 rounded-md opacity-0 pointer-events-none"></div>
                </div>
                {#if form?.field === 'password' || (form?.error && /password|contraseña/i.test(form.error))}
                  <p class="text-sm text-red-600">{form.error}</p>
                {/if}
              </div>

              <!-- Remember & Forgot -->
              <div class="flex items-center justify-between">
                <label class="flex items-center space-x-3 cursor-pointer group select-none">
                  <input type="checkbox" class="w-5 h-5 text-primary border-2 border-gray-300 rounded focus:ring-primary/20" />
                  <span class="group-hover:text-primary transition-colors duration-500">Recordarme</span>
                </label>
                <a href="/forgot-password" class="text-primary font-semibold">¿Olvidaste tu contraseña?</a>
              </div>

              <!-- Login button -->
              <button class="w-full h-12 bg-gradient-to-r from-primary via-primary to-rose-400 text-white font-semibold shadow overflow-hidden relative disabled:opacity-60" disabled={pending}>
                <span class="relative z-10 flex items-center justify-center gap-2">
                  {#if pending}
                    <Spinner size={18} /> Entrando...
                  {:else}
                    Iniciar Sesión
                  {/if}
                </span>
              </button>
            </form>

            <!-- Divider -->
            <div class="relative">
              <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200" /></div>
              <div class="relative flex justify-center text-sm"><span class="px-4 bg-white text-gray-500 font-medium">o continúa con</span></div>
            </div>

            <!-- Social buttons (decorative) -->
            <div class="grid grid-cols-2 gap-6">
              <Button variant="outline" class="h-12 border-2 border-gray-200 bg-white">
                <svg class="w-6 h-6 mr-3" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                <span class="font-semibold">Google</span>
              </Button>
              <Button variant="outline" class="h-12 border-2 border-gray-200 bg-white">
                <svg class="w-6 h-6 mr-3" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span class="font-semibold">Facebook</span>
              </Button>
            </div>

            <!-- Sign up link -->
            <div class="text-center pt-2">
              <p class="text-gray-600">¿No tienes una cuenta?
                <a href="/auth/register" class="text-primary hover:text-primary/80 font-bold transition-all duration-500 inline-block ml-1">Regístrate gratis</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust indicators -->
      <div class="text-center space-y-4 pt-4">
        <div class="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div class="flex items-center space-x-2 cursor-pointer">
            <div class="w-3 h-3 bg-green-500 rounded-full animate-gentle-pulse shadow-lg shadow-green-500/50"></div>
            <span class="text-green-600">Conexión segura</span>
          </div>
          <div class="flex items-center space-x-2 cursor-pointer">
            <div class="w-3 h-3 bg-primary rounded-full animate-gentle-pulse shadow-lg shadow-primary/50" style="animation-delay: .5s;"></div>
            <span class="text-primary">Datos protegidos</span>
          </div>
          <div class="flex items-center space-x-2 group cursor-pointer transform hover:scale-105 transition-all duration-500">
            <div class="w-3 h-3 bg-blue-500 rounded-full animate-gentle-pulse shadow-lg shadow-blue-500/50" style="animation-delay: 1s;"></div>
            <span class="group-hover:text-blue-600 transition-colors duration-500">Soporte 24/7</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Floating WhatsApp Support -->
  <div class="fixed bottom-8 right-8 z-50 group">
    <div class="relative">
      <a href={supportUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp soporte" title="WhatsApp soporte">
        <Button size="lg" class="h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-2xl hover:shadow-green-500/50 transition-all duration-500 transform hover:scale-125 hover:-translate-y-2 group relative overflow-hidden">
          <MessageCircle class="w-8 h-8 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative z-10" />
          <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Button>
      </a>
      <div class="absolute -top-16 right-0 bg-gray-900 text-white px-4 py-2 rounded-xl text-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl">Soporte 24/7 ⚡
        <div class="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
      <div class="absolute inset-0 rounded-full border-4 border-green-400 animate-ping opacity-20"></div>
      <div class="absolute inset-0 rounded-full border-2 border-green-300 animate-pulse opacity-30"></div>
    </div>
  </div>

  <!-- Local toast under the form -->
  {#if localToast}
    <div class="fixed left-1/2 -translate-x-1/2 bottom-32 md:bottom-20 rounded px-4 py-3 text-sm border bg-white/90 backdrop-blur-md shadow-lg"
      class:!bg-green-50={localToast.type === 'success'}
      class:!text-green-800={localToast.type === 'success'}
      class:!border-green-200={localToast.type === 'success'}
      class:!bg-red-50={localToast.type === 'error'}
      class:!text-red-800={localToast.type === 'error'}
      class:!border-red-200={localToast.type === 'error'}>
      {localToast.message}
    </div>
  {/if}

  <!-- Technical error panel -->
  {#if form?.httpStatus || form?.detail || form?.rawJson}
    <div class="fixed left-1/2 -translate-x-1/2 bottom-6 w-[95%] md:w-[700px] rounded border border-gray-200 bg-gray-50 p-3 shadow">
      <p class="text-xs text-gray-700"><strong>Status:</strong> {form?.httpStatus ?? '—'}</p>
      {#if form?.detail}
        <p class="mt-1 text-xs text-gray-700"><strong>Detalle:</strong> {form.detail}</p>
      {/if}
      {#if form?.rawJson}
        <pre class="mt-2 text-[11px] leading-snug text-gray-700 overflow-auto max-h-40">{JSON.stringify(form.rawJson, null, 2)}</pre>
      {/if}
    </div>
  {/if}
</div>
