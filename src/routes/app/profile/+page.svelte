<script lang="ts">
  export let data: { token: string; decoded: Record<string, unknown> | null; perms: string[] };
  let reveal = false;
  function masked(t: string) {
    if (!t) return '';
    if (reveal) return t;
    const show = 8;
    const head = t.slice(0, show);
    const tail = t.slice(-show);
    return `${head}…${tail}`;
  }
  function copy(text: string) {
    navigator.clipboard?.writeText(text).then(() => {
      // no toast store imported here; keep minimal
      alert('Token copiado');
    });
  }
</script>

<div class="max-w-3xl">
  <h1 class="text-2xl font-semibold mb-4">Perfil</h1>

  <section class="bg-white border rounded p-4 mb-4">
    <h2 class="font-medium mb-2">Token</h2>
    {#if data.token}
      <div class="flex items-center gap-2">
        <code class="text-xs break-all p-2 bg-gray-50 border rounded flex-1">{masked(data.token)}</code>
        <button class="border px-3 py-1.5 rounded" on:click={() => (reveal = !reveal)}>{reveal ? 'Ocultar' : 'Revelar'}</button>
        <button class="border px-3 py-1.5 rounded" on:click={() => copy(data.token)}>Copiar</button>
      </div>
    {:else}
      <p class="text-sm text-gray-600">No hay token de sesión</p>
    {/if}
  </section>

  <section class="bg-white border rounded p-4 mb-4">
    <h2 class="font-medium mb-2">Datos del JWT</h2>
    {#if data.decoded}
      <pre class="text-xs whitespace-pre-wrap break-words bg-gray-50 border rounded p-3">{JSON.stringify(data.decoded, null, 2)}</pre>
    {:else}
      <p class="text-sm text-gray-600">No se pudo decodificar el token.</p>
    {/if}
  </section>

  <section class="bg-white border rounded p-4">
    <h2 class="font-medium mb-2">Permisos</h2>
    {#if data.perms?.length}
      <ul class="list-disc pl-6 text-sm">
        {#each data.perms as p}
          <li>{p}</li>
        {/each}
      </ul>
    {:else}
      <p class="text-sm text-gray-600">Sin permisos o no disponibles.</p>
    {/if}
  </section>
</div>
