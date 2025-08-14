<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { goto } from '$app/navigation';
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
  <title>Términos y Condiciones — BellezaApp</title>
  <meta name="description" content="Términos y condiciones de uso de BellezaApp." />
</svelte:head>

<section class="max-w-3xl mx-auto px-4 py-12">
  <div class="mb-6">
    <a href="/" on:click|preventDefault={smartBack} class="inline-block">
      <Button variant="outline" class="cursor-pointer">⬅ Volver</Button>
    </a>
  </div>
  <h1 class="font-serif text-3xl md:text-4xl font-bold mb-4">Términos y Condiciones</h1>
  <p class="text-gray-600 mb-4">Última actualización: 2025-08-14</p>
  <div class="space-y-4 text-gray-700">
    <p>Al utilizar BellezaApp aceptas estos términos. Nuestro objetivo es facilitar la gestión de tu negocio de belleza sin comisiones ocultas.</p>
    <p><strong>Privacidad:</strong> Usamos cookies de sesión para autenticación. Los datos de tus clientes se usan solo para prestar el servicio.</p>
    <p><strong>Pagos:</strong> Los métodos de pago que configures son procesados por los proveedores correspondientes. BellezaApp no retiene comisiones por reservas.</p>
    <p><strong>Soporte:</strong> Atención por WhatsApp en horario laboral de lunes a viernes.</p>
  </div>
</section>
