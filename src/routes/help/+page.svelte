<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { MessageSquare } from '@lucide/svelte';
  import { goto } from '$app/navigation';
  const whatsapp = 'https://wa.me/?text=' + encodeURIComponent('Hola BellezaApp, necesito ayuda.');
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
  <title>Centro de Ayuda — BellezaApp</title>
  <meta name="description" content="Preguntas frecuentes y soporte de BellezaApp." />
</svelte:head>

<section class="max-w-4xl mx-auto px-4 py-12">
  <div class="mb-6 flex items-center justify-between">
    <a href="/" on:click|preventDefault={smartBack} class="inline-block">
      <Button variant="outline" class="cursor-pointer">⬅ Volver</Button>
    </a>
    <a href={whatsapp} target="_blank" rel="noopener noreferrer" class="inline-block">
      <Button class="cursor-pointer bg-[#25D366] hover:bg-[#1ebe57] text-white"><MessageSquare class="w-4 h-4 mr-2"/>Hablar por WhatsApp</Button>
    </a>
  </div>
  <h1 class="font-serif text-3xl md:text-4xl font-bold mb-4">Centro de Ayuda</h1>
  <p class="text-gray-600 mb-6">Respuestas rápidas a preguntas frecuentes. Si necesitas soporte personalizado, escríbenos por WhatsApp.</p>

  <div class="space-y-4">
    <details class="border rounded p-4">
      <summary class="font-semibold cursor-pointer">¿Cómo creo mi cuenta?</summary>
      <p class="text-gray-600 mt-2">Por ahora verificamos negocios por WhatsApp. Ve a <a href="/auth/register" class="text-blue-600 underline">Registrarse</a> y usa el botón de WhatsApp.</p>
    </details>
    <details class="border rounded p-4">
      <summary class="font-semibold cursor-pointer">¿Cobran comisión por reservas?</summary>
      <p class="text-gray-600 mt-2">No. Las reservas que entran por tu web o WhatsApp son 100% tuyas.</p>
    </details>
    <details class="border rounded p-4">
      <summary class="font-semibold cursor-pointer">¿Qué métodos de pago aceptan?</summary>
      <p class="text-gray-600 mt-2">Pago Móvil, Bs, Zelle, USDT y más. Puedes configurarlos en tu cuenta.</p>
    </details>
  </div>
</section>
