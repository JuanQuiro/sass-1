<script lang="ts">
  import { enhance } from '$app/forms';
  import Spinner from '$lib/components/Spinner.svelte';
  import { toasts } from '$lib/stores/toast';
  export let data: { staff: any[]; salons?: any[]; page?: number; per_page?: number; q?: string; status?: number; error?: string };
  let name = '';
  let skills = '';
  let salon_id: string | number | '' = '';
  let active = true;
  let pending = false;
  let editingId: string | number | null = null;
  let editName = '';
  let editSkills = '';
  let editActive = true;
  const submit: Parameters<typeof enhance>[1] = () => {
    pending = true;
    return async ({ result, update }: { result: any; update: (opts?: any) => Promise<void> }) => {
      pending = false;
      if (result.type === 'success') {
        toasts.success('Operación realizada');
        await update();
        name = '';
        skills = '';
        salon_id = '';
        active = true;
        editingId = null;
      } else if (result.type === 'failure') {
        toasts.error(result.data?.error || 'Ocurrió un error');
      }
    };
  };
</script>

<div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-4">
  <div class="space-y-2">
    <h1 class="text-xl font-semibold">Staff</h1>
    <form method="GET" class="flex gap-2 items-center">
      <input name="q" value={data.q || ''} class="border rounded px-3 py-2" placeholder="Buscar por nombre/skills" />
      <button class="border px-3 py-2 rounded">Buscar</button>
    </form>
  </div>
  <form method="POST" use:enhance={submit} class="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
    <input name="name" bind:value={name} class="border rounded px-3 py-2" placeholder="Nombre" />
    <input name="skills" bind:value={skills} class="border rounded px-3 py-2" placeholder="Skills" />
    <select name="salon_id" bind:value={salon_id} class="border rounded px-3 py-2">
      <option value="">Selecciona salón</option>
      {#each data.salons || [] as salon}
        <option value={salon.id}>{salon.name || `Salón ${salon.id}`}</option>
      {/each}
    </select>
    <label class="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="active" bind:checked={active} /> Activo</label>
    <button class="bg-gray-900 text-white px-4 py-2 rounded disabled:opacity-50" formaction="?/create" disabled={pending}>
      {#if pending}
        <span class="inline-flex items-center gap-2"><Spinner size={16}/> Guardando...</span>
      {:else}
        Agregar
      {/if}
    </button>
  </form>
</div>

{#if data.status === 403}
  <div class="bg-yellow-50 text-yellow-800 border border-yellow-200 rounded p-3 mb-3 text-sm">
    No tienes permisos para ver el staff (403). Verifica tu rol o solicita acceso.
  </div>
{/if}

<div class="grid gap-3">
  {#if data.staff?.length}
    {#each data.staff as s}
      <div class="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded border gap-3">
        <div class="min-w-0 flex-1">
          {#if editingId === s.id}
            <form method="POST" use:enhance={submit} class="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
              <input type="hidden" name="id" value={s.id} />
              <input name="name" bind:value={editName} class="border rounded px-2 py-1" placeholder="Nombre" />
              <input name="skills" bind:value={editSkills} class="border rounded px-2 py-1" placeholder="Skills" />
              <div class="text-sm text-gray-600 truncate">Salón: {s.salon_id}</div>
              <label class="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="active" bind:checked={editActive} /> Activo</label>
              <div class="flex gap-2">
                <button class="text-blue-600 hover:underline disabled:opacity-50" formaction="?/update" disabled={pending}>
                  {#if pending}
                    <span class="inline-flex items-center gap-1"><Spinner size={14}/> Guardando</span>
                  {:else}
                    Guardar
                  {/if}
                </button>
                <button type="button" class="border px-3 py-1 rounded" on:click={() => { editingId = null; }}>
                  Cancelar
                </button>
              </div>
            </form>
          {:else}
            <div class="truncate">
              <div class="font-medium truncate">{s.name}</div>
              <div class="text-xs text-gray-500 truncate">ID: {s.id} · Salón: {s.salon_id} · {s.skills} {#if s.active}· Activo{/if}</div>
            </div>
          {/if}
        </div>
        <div class="flex gap-3">
          {#if editingId !== s.id}
            <button class="text-blue-700 hover:underline" on:click={() => { editingId = s.id; editName = s.name || ''; editSkills = s.skills || ''; editActive = Boolean(s.active); }}>Editar</button>
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
    <p class="text-gray-600">No hay miembros del staff.</p>
  {/if}
</div>

{#if (data.page || 1) > 1 || (data.staff?.length || 0) === (data.per_page || 20)}
  <div class="flex items-center justify-between mt-4">
    <a class="border px-3 py-2 rounded disabled:opacity-50" href={`?page=${Math.max(1, (data.page || 1) - 1)}&per_page=${data.per_page || 20}${data.q ? `&q=${encodeURIComponent(data.q)}` : ''}`}>Anterior</a>
    <div class="text-sm text-gray-500">Página {data.page || 1}</div>
    <a class="border px-3 py-2 rounded" href={`?page=${(data.page || 1) + 1}&per_page=${data.per_page || 20}${data.q ? `&q=${encodeURIComponent(data.q)}` : ''}`}>Siguiente</a>
  </div>
{/if}

<svelte:head>
  <title>Staff - BellezaApp</title>
</svelte:head>
