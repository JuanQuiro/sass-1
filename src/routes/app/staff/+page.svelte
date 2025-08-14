<script lang="ts">
  import { enhance } from '$app/forms';
  import Spinner from '$lib/components/Spinner.svelte';
  import { toasts } from '$lib/stores/toast';
  export let data: { staff: any[] };
  let name = '';
  let role = '';
  let pending = false;
  const submit: Parameters<typeof enhance>[1] = () => {
    pending = true;
    return async ({ result, update }: { result: any; update: (opts?: any) => Promise<void> }) => {
      pending = false;
      if (result.type === 'success') {
        toasts.success('Operación realizada');
        await update();
        name = '';
        role = '';
      } else if (result.type === 'failure') {
        toasts.error(result.data?.error || 'Ocurrió un error');
      }
    };
  };
</script>

<div class="flex items-center justify-between mb-4">
  <h1 class="text-xl font-semibold">Staff</h1>
  <form method="POST" use:enhance={submit} class="flex gap-2 items-center">
    <input name="name" bind:value={name} class="border rounded px-3 py-2" placeholder="Nombre" />
    <input name="role" bind:value={role} class="border rounded px-3 py-2" placeholder="Rol" />
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
  {#if data.staff?.length}
    {#each data.staff as s}
      <div class="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded border gap-3">
        <div>
          <div class="font-medium">{s.name}</div>
          <div class="text-xs text-gray-500">{s.role} · ID: {s.id}</div>
        </div>
        <div class="flex gap-3">
          <form method="POST" use:enhance={submit} class="flex gap-2 items-center">
            <input type="hidden" name="id" value={s.id} />
            <input name="name" class="border rounded px-2 py-1" placeholder="Nombre" value={s.name} />
            <input name="role" class="border rounded px-2 py-1" placeholder="Rol" value={s.role} />
            <button class="text-blue-600 hover:underline disabled:opacity-50" formaction="?/update" disabled={pending}>
              {#if pending}
                <span class="inline-flex items-center gap-1"><Spinner size={14}/>...</span>
              {:else}
                Actualizar
              {/if}
            </button>
          </form>
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
    <p class="text-gray-600">No hay miembros del staff.</p>
  {/if}
</div>

<svelte:head>
  <title>Staff - BellezaApp</title>
</svelte:head>
