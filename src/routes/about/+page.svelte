<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { goto } from '$app/navigation';
  function smartBack(event?: Event) {
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
  const whatsapp = 'https://wa.me/?text=' + encodeURIComponent('Hola BellezaApp, quiero más información.');
</script>

<svelte:head>
  <title>Acerca de BellezaApp</title>
  <meta name="description" content="Conoce BellezaApp: reservas sin comisiones, pagos locales, marketing y más." />
</svelte:head>

<section class="max-w-3xl mx-auto px-4 py-12">
  <div class="mb-6">
    <a href="/" on:click|preventDefault={smartBack} class="inline-block">
      <Button class="cursor-pointer">⬅ Volver</Button>
    </a>
  </div>
  <h1 class="font-serif text-3xl md:text-4xl font-bold mb-4">Sobre BellezaApp</h1>
  <p class="text-gray-600 mb-4">
    BellezaApp es la plataforma creada para salones de belleza, spas y barberías en Venezuela. Integra
    reservas online sin comisiones, pagos locales (Pago Móvil, Bs, Zelle, USDT), marketing automatizado y
    una presencia digital profesional en minutos.
  </p>
  <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-6">
    <li>Reservas web y WhatsApp 100% tuyas</li>
    <li>Agenda, staff, clientes y servicios en un solo lugar</li>
    <li>Campañas automáticas para recuperar clientes inactivos</li>
    <li>Marketplace Estética Venezuela para ganar visibilidad</li>
  </ul>
  <div class="flex gap-3">
    <a href={whatsapp} target="_blank" rel="noopener noreferrer" class="inline-block">
      <Button class="cursor-pointer bg-[#25D366] hover:bg-[#1ebe57] text-white">Hablar por WhatsApp</Button>
    </a>
    <a href="/" class="inline-block">
      <Button variant="outline" class="cursor-pointer">Ir al inicio</Button>
    </a>
  </div>
</section>
