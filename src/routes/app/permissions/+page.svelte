<script lang="ts">
  import { enhance } from '$app/forms';
  import Spinner from '$lib/components/Spinner.svelte';
  import { toasts } from '$lib/stores/toast';
  export let data: { perms: string[]; userId?: string | number };
  let pending = false;
  let newPerm = '';
  const submit: Parameters<typeof enhance>[1] = () => {
    pending = true;
    return async ({ result, update }) => {
      pending = false;
      if (result.type === 'success') {
        toasts.success('Operación realizada');
        newPerm = '';
        await update();
      } else if (result.type === 'failure') {
        toasts.error(result.data?.error || 'Error');
      }
    };
  };
</script>

<h1 class="text-xl font-semibold mb-4">Permisos</h1>
<p class="text-sm text-gray-600 mb-3">Usuario: {data.userId || 'actual'}</p>

<form method="POST" use:enhance={submit} class="flex gap-2 items-center mb-4">
  <input name="perm" bind:value={newPerm} class="border rounded px-3 py-2" placeholder="nuevo permiso (ej. admin)" />
  <button class="bg-gray-900 text-white px-3 py-1.5 rounded disabled:opacity-50" formaction="?/add" disabled={pending}>
    {#if pending}
      <span class="inline-flex items-center gap-1"><Spinner size={14}/>...</span>
    {:else}
      Agregar
    {/if}
  </button>
  <input type="hidden" name="user_id" value={data.userId} />
  <input type="hidden" name="action" value="add" />
  <span class="text-xs text-gray-500">Los cambios requieren permisos adecuados.</span>
  
</form>

<ul class="bg-white border rounded divide-y">
  {#if data.perms?.length}
    {#each data.perms as p}
      <li class="px-4 py-2 text-sm text-gray-800 flex items-center justify-between">
        <span>{p}</span>
        <form method="POST" use:enhance={submit}>
          <input type="hidden" name="perm" value={p} />
          <button class="text-red-600 hover:underline disabled:opacity-50" formaction="?/revoke" disabled={pending}>
            {#if pending}
              <span class="inline-flex items-center gap-1"><Spinner size={14}/>...</span>
            {:else}
              Revocar
            {/if}
          </button>
        </form>
      </li>
    {/each}
  {:else}
    <li class="px-4 py-2 text-sm text-gray-500">Sin permisos asignados.</li>
  {/if}
</ul>

<svelte:head>
  <title>Permisos - BellezaApp</title>
</svelte:head>
