<script lang="ts">
  import { enhance } from '$app/forms';
  import Spinner from '$lib/components/Spinner.svelte';
  import { toasts } from '$lib/stores/toast';
  export let data: { clients: any[] };
  let name = '';
  let phone = '';
  let pending = false;
  const submit: any = ({ update }: { update: (options?: any) => Promise<void> }) => {
    pending = true;
    return async ({ result }: { result: any }) => {
      pending = false;
      if (result.type === 'success') {
        toasts.success('Cliente creado');
        await update();
        name = '';
        phone = '';
      } else if (result.type === 'failure') {
        toasts.error(result.data?.error || 'Ocurrió un error');
      }
    };
  };
</script>

<div class="flex items-center justify-between mb-4">
  <h1 class="text-xl font-semibold">Clientes</h1>
  <form method="POST" use:enhance={submit} class="flex gap-2 items-center">
    <input name="name" bind:value={name} class="border rounded px-3 py-2" placeholder="Nombre" />
    <input name="phone" bind:value={phone} class="border rounded px-3 py-2" placeholder="Teléfono" />
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
  {#if data.clients?.length}
    {#each data.clients as c}
      <div class="flex items-center justify-between bg-white p-4 rounded border">
        <div>
          <div class="font-medium">{c.name}</div>
          <div class="text-xs text-gray-500">{c.phone} · ID: {c.id}</div>
        </div>
      </div>
    {/each}
  {:else}
    <p class="text-gray-600">No hay clientes.</p>
  {/if}
</div>

<svelte:head>
  <title>Clientes - BellezaApp</title>
</svelte:head>
