<script lang="ts">
  import { enhance } from '$app/forms';
  import Spinner from '$lib/components/Spinner.svelte';
  import { toasts } from '$lib/stores/toast';
  export let data: { appointments: any[]; clients: any[]; staff: any[]; services: any[] };
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
  let client_id = '';
  let staff_id = '';
  let service_id = '';
  let start = '';
  let end = '';
</script>

<h1 class="text-xl font-semibold mb-4">Citas</h1>

<form method="POST" use:enhance={submit} class="grid gap-2 bg-white border rounded p-4 mb-4 md:grid-cols-5">
  <select name="client_id" bind:value={client_id} class="border rounded px-2 py-1">
    <option value="">Cliente</option>
    {#each data.clients as c}
      <option value={c.id}>{c.name || `Cliente ${c.id}`}</option>
    {/each}
  </select>
  <select name="staff_id" bind:value={staff_id} class="border rounded px-2 py-1">
    <option value="">Staff</option>
    {#each data.staff as s}
      <option value={s.id}>{s.name || `Staff ${s.id}`}</option>
    {/each}
  </select>
  <select name="service_id" bind:value={service_id} class="border rounded px-2 py-1">
    <option value="">Servicio</option>
    {#each data.services as s}
      <option value={s.id}>{s.name || `Servicio ${s.id}`}</option>
    {/each}
  </select>
  <input type="datetime-local" name="start" bind:value={start} class="border rounded px-2 py-1" />
  <div class="flex items-center gap-2">
    <input type="datetime-local" name="end" bind:value={end} class="border rounded px-2 py-1" />
    <button class="bg-gray-900 text-white px-3 py-1.5 rounded disabled:opacity-50" formaction="?/create" disabled={pending}>
      {#if pending}
        <span class="inline-flex items-center gap-1"><Spinner size={14}/> Guardar</span>
      {:else}
        Crear
      {/if}
    </button>
  </div>
</form>

<div class="grid gap-2">
  {#if data.appointments?.length}
    {#each data.appointments as a}
      <div class="bg-white border rounded p-3 flex items-center justify-between">
        <div class="text-sm">
          <div class="font-medium">Cita #{a.id}</div>
          <div class="text-gray-600">Cliente: {a.client_id} · Staff: {a.staff_id} · Servicio: {a.service_id}</div>
          <div class="text-gray-500">{a.start} → {a.end}</div>
        </div>
        <form method="POST" use:enhance={submit}>
          <input type="hidden" name="id" value={a.id} />
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
    <p class="text-gray-600">No hay citas.</p>
  {/if}
</div>

<svelte:head>
  <title>Citas - BellezaApp</title>
</svelte:head>
