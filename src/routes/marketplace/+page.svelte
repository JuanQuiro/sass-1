<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { Sparkles, MapPin } from '@lucide/svelte';
  export let data: { salons?: Array<{ id: number | string; name?: string; address?: string; city?: string }>; };
</script>

<svelte:head>
  <title>Marketplace Estética Venezuela</title>
  <meta name="description" content="Aumenta tu visibilidad en el Marketplace Estética Venezuela con BellezaApp." />
</svelte:head>

<section class="max-w-5xl mx-auto px-4 py-12">
  <div class="flex items-center gap-2 mb-6">
    <div class="w-10 h-10 gradient-gold rounded-lg flex items-center justify-center">
      <Sparkles class="w-5 h-5 text-white" />
    </div>
    <h1 class="font-serif text-3xl md:text-4xl font-bold">Marketplace Estética Venezuela</h1>
  </div>
  <p class="text-gray-600 mb-6">
    Publica tu salón, spa o barbería para que nuevos clientes te encuentren. Gestiónalo desde BellezaApp y recibe
    reservas por tu web o WhatsApp sin comisiones.
  </p>
  <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-8">
    <li>Perfil con fotos, servicios y precios</li>
    <li>Botón de reserva/pago directo a tu agenda</li>
    <li>Integración con WhatsApp para atención inmediata</li>
  </ul>
  {#if data?.salons?.length}
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {#each data.salons as s}
        <div class="border rounded-lg bg-white p-4">
          <div class="font-semibold text-gray-900">{s.name || 'Salón'}</div>
          <div class="text-sm text-gray-600">{s.address}</div>
          <div class="text-xs text-gray-500">{s.city} · ID {s.id}</div>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-gray-600 mb-8">No hay salones publicados aún.</p>
  {/if}
  <div class="flex flex-wrap gap-3">
    <a href="/" class="inline-block">
      <Button variant="outline" class="cursor-pointer"><MapPin class="w-4 h-4 mr-2" /> Volver al inicio</Button>
    </a>
  </div>
</section>
