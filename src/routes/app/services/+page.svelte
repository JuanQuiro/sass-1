<script lang="ts">
  import { enhance } from '$app/forms';
  import Spinner from '$lib/components/Spinner.svelte';
  import { toasts } from '$lib/stores/toast';
  export let data: { services: any[] };
  let name = '';
  let price: number | string = '';
  let duration: number | string = '';
  let pending = false;
  const submit: any = ({ update }: { update: (options?: any) => Promise<void> }) => {
    pending = true;
    return async ({ result }: { result: any }) => {
      pending = false;
      if (result.type === 'success') {
        toasts.success('Servicio creado');
        await update();
        name = '';
        price = '';
        duration = '';
      } else if (result.type === 'failure') {
        toasts.error(result.data?.error || 'Ocurrió un error');
      }
    };
  };
</script>

<div class="flex items-center justify-between mb-4">
  <h1 class="text-xl font-semibold">Servicios</h1>
  <form method="POST" use:enhance={submit} class="flex gap-2 items-center">
    <input name="name" bind:value={name} class="border rounded px-3 py-2" placeholder="Nombre" />
    <input name="price" bind:value={price} class="border rounded px-3 py-2 w-28" placeholder="$" type="number" step="0.01" />
    <input name="duration" bind:value={duration} class="border rounded px-3 py-2 w-28" placeholder="Min" type="number" />
    <button class="bg-gray-900 text-white px-4 py-2 rounded disabled:opacity-50" formaction="?/create" disabled={pending}>
      {#if pending}
        <span class="inline-flex items-center gap-2"><Spinner size={16}/> Guardando...</span>
      {:else}
        Agregar
      {/if}
    </button>
  </form>
</div>

<div class="grid gap-3">
  {#if data.services?.length}
    {#each data.services as s}
      <div class="flex items-center justify-between bg-white p-4 rounded border">
        <div>
          <div class="font-medium">{s.name}</div>
          <div class="text-xs text-gray-500">{s.duration_minutes ?? s.duration} min · ${s.price}</div>
        </div>
        <div class="text-xs text-gray-500">ID: {s.id}</div>
      </div>
    {/each}
  {:else}
    <p class="text-gray-600">No hay servicios.</p>
  {/if}
</div>

<svelte:head>
  <title>Servicios - BellezaApp</title>
</svelte:head>
