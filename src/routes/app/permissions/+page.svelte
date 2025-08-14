<script lang="ts">
  export let data: { perms: string[] };
</script>

<h1 class="text-xl font-semibold mb-4">Permisos</h1>
<ul class="bg-white border rounded divide-y">
  {#if data.perms?.length}
    {#each data.perms as p}
      <li class="px-4 py-2 text-sm text-gray-800">{p}</li>
    {/each}
  {:else}
    <li class="px-4 py-2 text-sm text-gray-500">Sin permisos asignados.</li>
  {/if}
</ul>

<svelte:head>
  <title>Permisos - BellezaApp</title>
</svelte:head>
