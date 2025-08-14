<script lang="ts">
  import { enhance } from '$app/forms';
  import Spinner from '$lib/components/Spinner.svelte';
  import { toasts } from '$lib/stores/toast';
  export let data: { assignments: any[]; services: any[]; staff: any[] };
  let pending = false;
  const submit: Parameters<typeof enhance>[1] = () => {
    pending = true;
    return async ({ result, update }) => {
      pending = false;
      if (result.type === 'success') {
        toasts.success('Operación realizada');
        await update();
      } else if (result.type === 'failure') {
        toasts.error(result.data?.error || 'Error');
      }
    };
  };
  let service_id = '';
  let staff_id = '';
</script>

<h1 class="text-xl font-semibold mb-4">Asignaciones (Servicios ↔ Staff)</h1>

<form method="POST" use:enhance={submit} class="flex flex-col md:flex-row gap-2 bg-white border rounded p-4 mb-4">
  <select name="service_id" bind:value={service_id} class="border rounded px-2 py-1">
    <option value="">Servicio</option>
    {#each data.services as s}
      <option value={s.id}>{s.name || `Servicio ${s.id}`}</option>
    {/each}
  </select>
  <select name="staff_id" bind:value={staff_id} class="border rounded px-2 py-1">
    <option value="">Staff</option>
    {#each data.staff as st}
      <option value={st.id}>{st.name || `Staff ${st.id}`}</option>
    {/each}
  </select>
  <button class="bg-gray-900 text-white px-3 py-1.5 rounded disabled:opacity-50" formaction="?/assign" disabled={pending}>
    {#if pending}
      <span class="inline-flex items-center gap-1"><Spinner size={14}/> Asignando</span>
    {:else}
      Asignar
    {/if}
  </button>
</form>

<div class="grid gap-2">
  {#if data.assignments?.length}
    {#each data.assignments as a}
      <div class="bg-white border rounded p-3 flex items-center justify-between">
        <div class="text-sm">
          <div class="text-gray-700">Servicio: {a.service_id} · Staff: {a.staff_id}</div>
        </div>
        <form method="POST" use:enhance={submit}>
          <input type="hidden" name="service_id" value={a.service_id} />
          <input type="hidden" name="staff_id" value={a.staff_id} />
          <button class="text-red-600 hover:underline disabled:opacity-50" formaction="?/unassign" disabled={pending}>
            {#if pending}
              <span class="inline-flex items-center gap-1"><Spinner size={14}/>...</span>
            {:else}
              Quitar
            {/if}
          </button>
        </form>
      </div>
    {/each}
  {:else}
    <p class="text-gray-600">No hay asignaciones.</p>
  {/if}
</div>

<svelte:head>
  <title>Asignaciones - BellezaApp</title>
</svelte:head>
