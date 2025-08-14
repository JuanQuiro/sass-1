<script lang="ts">
  import { enhance } from '$app/forms';
  import Spinner from '$lib/components/Spinner.svelte';
  import { toasts } from '$lib/stores/toast';
  export let data: { salons: any[] };
  let name = '';
  let pending = false;
  const submit: Parameters<typeof enhance>[1] = () => {
    pending = true;
    return async ({ result, update }: { result: any; update: (opts?: any) => Promise<void> }) => {
      pending = false;
      if (result.type === 'success') {
        toasts.success('Operación realizada');
        await update();
        name = '';
      } else if (result.type === 'failure') {
        toasts.error(result.data?.error || 'Ocurrió un error');
      }
    };
  };
</script>

<div class="flex items-center justify-between mb-4">
  <h1 class="text-xl font-semibold">Salones</h1>
  <form method="POST" use:enhance={submit} class="flex gap-2 items-center">
    <input name="name" bind:value={name} class="border rounded px-3 py-2" placeholder="Nombre del salón" />
    <button class="bg-gray-900 text-white px-4 py-2 rounded disabled:opacity-50" formaction="?/create" disabled={pending}>
      {#if pending}
        <span class="inline-flex items-center gap-2"><Spinner size={16}/> Guardando...</span>
      {:else}
        Crear
      {/if}
    </button>
  </form>
</div>

<div class="grid gap-3">
  {#if data.salons?.length}
    {#each data.salons as s}
      <div class="flex items-center justify-between bg-white p-4 rounded border">
        <div>
          <div class="font-medium">{s.name || `Salón ${s.id}`}</div>
          <div class="text-xs text-gray-500">ID: {s.id}</div>
        </div>
        <form method="POST" use:enhance={submit}>
          <input type="hidden" name="id" value={s.id} />
          <button class="text-red-600 hover:underline disabled:opacity-50" formaction="?/delete" disabled={pending}>
            {#if pending}
              <span class="inline-flex items-center gap-1"><Spinner size={14}/>...</span>
            {:else}
              Eliminar
            {/if}
          </button>
        </form>
      </div>
    {/each}
  {:else}
    <p class="text-gray-600">No hay salones.</p>
  {/if}
</div>

<svelte:head>
  <title>Salones - BellezaApp</title>
</svelte:head>
