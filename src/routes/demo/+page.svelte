<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button/index.js';
  import { toasts } from '$lib/stores/toast';
  import {
    ArrowLeft,
    MessageCircle,
    Calendar,
    TrendingUp,
    Users,
    CreditCard,
    Clock,
    CheckCircle,
    Star,
    Zap,
    Shield,
    Smartphone,
    BarChart3,
    Target,
    Sparkles
  } from '@lucide/svelte';

  export let form: any;
  let pending = false;
  const wa = (text: string) =>
    `https://wa.me/?text=${encodeURIComponent(text)}`;
  const supportUrl = wa('Hola, quiero agendar una demo de BellezaApp');

  const onSubmit = () => {
    pending = true;
    return async ({ result }: { result: any }) => {
      pending = false;
      if (result?.type === 'success') {
        toasts.success('Solicitud de demo enviada. Te contactaremos pronto.');
      } else if (result?.type === 'failure') {
        toasts.error(result?.data?.error || 'No se pudo enviar la solicitud');
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
  <title>Agenda una Demo | BellezaApp</title>
  <meta name="description" content="Agenda una demo gratuita de 15 minutos y ve cómo BellezaApp puede crecer tu salón sin comisiones." />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
  <!-- Top nav -->
  <nav class="sticky top-0 z-40 bg-white/90 border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="/" on:click|preventDefault={smartBack} class="inline-flex items-center text-gray-700 hover:text-gray-900">
        <ArrowLeft class="w-5 h-5 mr-2" /> Volver
      </a>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A76F] to-[#D4B078] flex items-center justify-center">
          <Sparkles class="w-6 h-6 text-white" />
        </div>
        <span class="font-serif text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">BellezaApp</span>
      </div>
      <div class="flex items-center gap-3">
        <a href={supportUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp soporte">
          <Button class="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white p-0">
            <MessageCircle class="w-5 h-5" />
          </Button>
        </a>
        <a href="/auth/login"><Button variant="outline" class="border-[#C9A76F] text-[#C9A76F]">Iniciar sesión</Button></a>
      </div>
    </div>
  </nav>

  <!-- Hero -->
  <section class="pt-10 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">
    <div class="max-w-6xl mx-auto px-4 text-center">
      <div class="inline-flex items-center px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 mb-6">
        <Sparkles class="w-4 h-4 mr-2" /> Demo personalizada • Gratis • 15 min
        <TrendingUp class="w-4 h-4 ml-2" />
      </div>
      <h1 class="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
        Ve cómo tu salón puede crecer 40% en 30 días
      </h1>
      <p class="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">Agenda una demo de 15 minutos y descubre cómo tener reservas sin comisiones, pagos venezolanos integrados y marketing automático.</p>

      <div class="flex justify-center items-center gap-8 mt-8">
        <div class="text-center">
          <div class="text-3xl font-bold text-[#C9A76F]">+40%</div>
          <div class="text-sm text-gray-600">Más reservas</div>
        </div>
        <div class="w-px h-10 bg-gray-300" />
        <div class="text-center">
          <div class="text-3xl font-bold text-green-600">0%</div>
          <div class="text-sm text-gray-600">Comisiones</div>
        </div>
        <div class="w-px h-10 bg-gray-300" />
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-600">15min</div>
          <div class="text-sm text-gray-600">Demo</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Main -->
  <div class="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 xl:grid-cols-5 gap-8 lg:gap-12">
    <!-- Left: benefits, impact, testimonial -->
    <div class="xl:col-span-3 space-y-8">
      <!-- What you'll see -->
      <div class="bg-white border border-gray-100 rounded-2xl shadow p-6 sm:p-8">
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A76F] to-[#D4B078] flex items-center justify-center mr-4">
            <Target class="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 class="font-serif text-2xl font-bold text-gray-900">Lo que verás en la demo</h2>
            <p class="text-gray-600">Experiencia completa en 15 minutos</p>
          </div>
        </div>
        <div class="grid gap-4">
          <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50">
            <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><Smartphone class="w-5 h-5"/></div>
            <div><h3 class="font-semibold text-gray-900">Tu web profesional en 5 minutos</h3><p class="text-gray-600">Crea tu sitio con galería, precios y reservas online.</p></div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50">
            <div class="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center"><Calendar class="w-5 h-5"/></div>
            <div><h3 class="font-semibold text-gray-900">Reservas sin comisiones</h3><p class="text-gray-600">Agenda inteligente integrada con WhatsApp.</p></div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50">
            <div class="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center"><CreditCard class="w-5 h-5"/></div>
            <div><h3 class="font-semibold text-gray-900">Pagos venezolanos</h3><p class="text-gray-600">Pago Móvil, Zelle, USDT y transferencias.</p></div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50">
            <div class="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center"><BarChart3 class="w-5 h-5"/></div>
            <div><h3 class="font-semibold text-gray-900">Dashboard de control</h3><p class="text-gray-600">Ingresos, clientes y citas en tiempo real.</p></div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50">
            <div class="w-10 h-10 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center"><Zap class="w-5 h-5"/></div>
            <div><h3 class="font-semibold text-gray-900">Marketing automático</h3><p class="text-gray-600">Campañas de WhatsApp y recordatorios.</p></div>
          </div>
        </div>
      </div>

      <!-- Impact -->
      <div class="bg-gradient-to-br from-rose-50 via-white to-amber-50 border border-gray-100 rounded-2xl shadow p-6 sm:p-8">
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A76F] to-[#D4B078] flex items-center justify-center mr-4">
            <TrendingUp class="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 class="font-serif text-2xl font-bold text-gray-900">Impacto en tu negocio</h2>
            <p class="text-gray-600">Resultados reales y medibles</p>
          </div>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="text-center p-4 bg-white rounded-xl border border-gray-100">
            <div class="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-3"><Users class="w-6 h-6 text-green-600"/></div>
            <div class="text-2xl font-bold text-green-600">+40%</div>
            <div class="text-sm text-gray-700">Más reservas</div>
          </div>
          <div class="text-center p-4 bg-white rounded-xl border border-gray-100">
            <div class="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-3"><Shield class="w-6 h-6 text-blue-600"/></div>
            <div class="text-2xl font-bold text-blue-600">0%</div>
            <div class="text-sm text-gray-700">Comisiones</div>
          </div>
          <div class="text-center p-4 bg-white rounded-xl border border-gray-100">
            <div class="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-3"><Clock class="w-6 h-6 text-purple-600"/></div>
            <div class="text-2xl font-bold text-purple-600">5 min</div>
            <div class="text-sm text-gray-700">Configuración</div>
          </div>
          <div class="text-center p-4 bg-white rounded-xl border border-gray-100">
            <div class="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-3"><MessageCircle class="w-6 h-6 text-orange-600"/></div>
            <div class="text-2xl font-bold text-orange-600">24/7</div>
            <div class="text-sm text-gray-700">Soporte</div>
          </div>
        </div>
      </div>

      <!-- Testimonial -->
      <div class="bg-white border border-gray-100 rounded-2xl shadow p-6 sm:p-8">
        <div class="flex items-center mb-4">
          {#each Array(5) as _, i}
            <Star class="w-6 h-6 text-[#C9A76F] fill-current" />
          {/each}
        </div>
        <p class="text-gray-700 italic mb-6 text-lg">"La demo me convenció de inmediato. En 15 minutos vi cómo duplicar reservas y eliminar comisiones. Ahora tengo la agenda siempre llena."</p>
        <div class="flex items-center">
          <div class="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
          <div>
            <div class="font-semibold text-gray-900">María González</div>
            <div class="text-gray-600 text-sm">Salón Elegance - Caracas</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: form -->
    <div class="xl:col-span-2">
      <div class="xl:sticky xl:top-24">
        <div class="bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden">
          <div class="p-6 sm:p-8">
            <div class="text-center mb-6">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C9A76F] to-[#D4B078] flex items-center justify-center mx-auto mb-4"><Calendar class="w-7 h-7 text-white"/></div>
              <h2 class="font-serif text-2xl font-bold text-gray-900">Agenda tu demo personalizada</h2>
              <p class="text-gray-600">Completa el formulario y te contactaremos en menos de 2 horas</p>
            </div>

            {#if form?.success}
              <div class="mb-6 rounded-lg border border-green-200 bg-green-50 text-green-800 p-4">
                {form.message || 'Hemos recibido tu solicitud. ¡Gracias!'}
              </div>
            {/if}
            {#if form?.error}
              <div class="mb-6 rounded-lg border border-red-200 bg-red-50 text-red-800 p-4">{form.error}</div>
            {/if}

            <form method="POST" use:enhance={onSubmit} class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="name" class="block text-sm font-semibold text-gray-800 mb-1">Nombre completo *</label>
                  <input id="name" name="name" required class="w-full h-11 px-4 border-2 border-gray-200 rounded-md focus:border-[#C9A76F] focus:ring-[#C9A76F]" placeholder="Tu nombre" aria-invalid={form?.field==='name'} />
                  {#if form?.field==='name'}<p class="text-xs text-red-600 mt-1">{form.error}</p>{/if}
                </div>
                <div>
                  <label for="phone" class="block text-sm font-semibold text-gray-800 mb-1">Teléfono *</label>
                  <input id="phone" name="phone" type="tel" required class="w-full h-11 px-4 border-2 border-gray-200 rounded-md focus:border-[#C9A76F] focus:ring-[#C9A76F]" placeholder="+58 424 123 4567" aria-invalid={form?.field==='phone'} />
                  {#if form?.field==='phone'}<p class="text-xs text-red-600 mt-1">{form.error}</p>{/if}
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-semibold text-gray-800 mb-1">Email *</label>
                <input id="email" name="email" type="email" required class="w-full h-11 px-4 border-2 border-gray-200 rounded-md focus:border-[#C9A76F] focus:ring-[#C9A76F]" placeholder="tu@email.com" aria-invalid={form?.field==='email'} />
                {#if form?.field==='email'}<p class="text-xs text-red-600 mt-1">{form.error}</p>{/if}
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="business" class="block text-sm font-semibold text-gray-800 mb-1">Nombre del negocio *</label>
                  <input id="business" name="business" required class="w-full h-11 px-4 border-2 border-gray-200 rounded-md focus:border-[#C9A76F] focus:ring-[#C9A76F]" placeholder="Salón Belleza" aria-invalid={form?.field==='business'} />
                  {#if form?.field==='business'}<p class="text-xs text-red-600 mt-1">{form.error}</p>{/if}
                </div>
                <div>
                  <label for="businessType" class="block text-sm font-semibold text-gray-800 mb-1">Tipo de negocio *</label>
                  <select id="businessType" name="businessType" required class="w-full h-11 px-3 border-2 border-gray-200 rounded-md focus:border-[#C9A76F] focus:ring-[#C9A76F]" aria-invalid={form?.field==='businessType'}>
                    <option value="">Seleccionar</option>
                    <option value="salon">Salón de Belleza</option>
                    <option value="barberia">Barbería</option>
                    <option value="spa">Spa</option>
                    <option value="estetica">Centro de Estética</option>
                    <option value="nails">Salón de Uñas</option>
                    <option value="otro">Otro</option>
                  </select>
                  {#if form?.field==='businessType'}<p class="text-xs text-red-600 mt-1">{form.error}</p>{/if}
                </div>
              </div>

              <div>
                <label for="currentClients" class="block text-sm font-semibold text-gray-800 mb-1">Clientes por mes</label>
                <select id="currentClients" name="currentClients" class="w-full h-11 px-3 border-2 border-gray-200 rounded-md focus:border-[#C9A76F] focus:ring-[#C9A76F]">
                  <option value="">Seleccionar</option>
                  <option value="0-50">0-50</option>
                  <option value="51-100">51-100</option>
                  <option value="101-200">101-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select>
              </div>

              <div>
                <label for="message" class="block text-sm font-semibold text-gray-800 mb-1">Cuéntanos sobre tu negocio (opcional)</label>
                <textarea id="message" name="message" rows={4} class="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-[#C9A76F] focus:ring-[#C9A76F]" placeholder="¿Qué desafíos tienes actualmente?" />
              </div>

              <Button type="submit" disabled={pending} class="w-full h-12 bg-gradient-to-r from-[#D4B078] to-[#C9A76F] text-white font-bold">
                <Calendar class="w-5 h-5 mr-2" /> Agendar Demo Gratis
              </Button>

              <div class="text-center">
                <p class="text-gray-600 mb-3">O contáctanos directamente por WhatsApp</p>
                <a href={supportUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-full h-11 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold">
                  <MessageCircle class="w-5 h-5 mr-2" /> WhatsApp Directo
                </a>
              </div>
            </form>

            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="grid grid-cols-3 gap-4 text-center">
                <div class="flex flex-col items-center">
                  <CheckCircle class="w-5 h-5 text-green-500 mb-1" />
                  <span class="text-sm text-gray-700 font-semibold">100% Gratis</span>
                </div>
                <div class="flex flex-col items-center">
                  <Clock class="w-5 h-5 text-blue-500 mb-1" />
                  <span class="text-sm text-gray-700 font-semibold">15 minutos</span>
                </div>
                <div class="flex flex-col items-center">
                  <Shield class="w-5 h-5 text-purple-500 mb-1" />
                  <span class="text-sm text-gray-700 font-semibold">Sin compromiso</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Floating WhatsApp -->
  <a href={supportUrl} target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white shadow-2xl">
    <MessageCircle class="w-7 h-7" />
  </a>
</div>
