<script lang="ts">
  import { enhance } from '$app/forms';
  import Spinner from '$lib/components/Spinner.svelte';
  import { toasts } from '$lib/stores/toast';
  export let data: { salons: any[]; page?: number; per_page?: number; q?: string };
  let name = '';
  let address = '';
  let pending = false;
  let editingId: string | number | null = null;
  let editName = '';
  let editAddress = '';
  const submit: Parameters<typeof enhance>[1] = () => {
    pending = true;
    return async ({ result, update }: { result: any; update: (opts?: any) => Promise<void> }) => {
      pending = false;
      if (result.type === 'success') {
        toasts.success('Operación realizada');
        await update();
        name = '';
        address = '';
        editingId = null;
      } else if (result.type === 'failure') {
        toasts.error(result.data?.error || 'Ocurrió un error');
      }
    };
  };
</script>

<div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-4">
  <div class="space-y-2">
    <h1 class="text-xl font-semibold">Salones</h1>
    <form method="GET" class="flex gap-2 items-center">
      <input name="q" value={data.q || ''} class="border rounded px-3 py-2" placeholder="Buscar por nombre/dirección" />
      <button class="border px-3 py-2 rounded">Buscar</button>
    </form>
  </div>
  <form method="POST" use:enhance={submit} class="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
    <input name="name" bind:value={name} class="border rounded px-3 py-2" placeholder="Nombre del salón" />
    <input name="address" bind:value={address} class="border rounded px-3 py-2" placeholder="Dirección (opcional)" />
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
        <div class="flex-1 min-w-0">
          {#if editingId === s.id}
            <form method="POST" use:enhance={submit} class="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
              <input type="hidden" name="id" value={s.id} />
              <input name="name" bind:value={editName} class="border rounded px-3 py-2" placeholder="Nombre" />
              <input name="address" bind:value={editAddress} class="border rounded px-3 py-2" placeholder="Dirección" />
              <div class="flex gap-2">
                <button class="bg-gray-900 text-white px-3 py-2 rounded disabled:opacity-50" formaction="?/update" disabled={pending}>
                  {#if pending}
                    <span class="inline-flex items-center gap-1"><Spinner size={14}/> Guardando</span>
                  {:else}
                    Guardar
                  {/if}
                </button>
                <button type="button" class="border px-3 py-2 rounded" on:click={() => { editingId = null; }}>
                  Cancelar
                </button>
              </div>
            </form>
          {:else}
            <div class="truncate">
              <div class="font-medium truncate">{s.name || `Salón ${s.id}`}</div>
              <div class="text-xs text-gray-500 truncate">ID: {s.id}{#if s.address} • {s.address}{/if}</div>
            </div>
          {/if}
        </div>
        <div class="flex items-center gap-3 ml-4">
          {#if editingId !== s.id}
            <button class="text-blue-700 hover:underline" on:click={() => { editingId = s.id; editName = s.name || ''; editAddress = s.address || ''; }}>Editar</button>
          {/if}
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
      </div>
    {/each}
  {:else}
    <p class="text-gray-600">No hay salones.</p>
  {/if}
</div>

{#if (data.page || 1) > 1 || (data.salons?.length || 0) === (data.per_page || 20)}
  <div class="flex items-center justify-between mt-4">
    <a class="border px-3 py-2 rounded disabled:opacity-50" href={`?page=${Math.max(1, (data.page || 1) - 1)}&per_page=${data.per_page || 20}${data.q ? `&q=${encodeURIComponent(data.q)}` : ''}`}>Anterior</a>
    <div class="text-sm text-gray-500">Página {data.page || 1}</div>
    <a class="border px-3 py-2 rounded" href={`?page=${(data.page || 1) + 1}&per_page=${data.per_page || 20}${data.q ? `&q=${encodeURIComponent(data.q)}` : ''}`}>Siguiente</a>
  </div>
{/if}

<svelte:head>
  <title>Salones - BellezaApp</title>
</svelte:head>
