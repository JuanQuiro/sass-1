<script lang="ts">
  import { toasts } from '$lib/stores/toast';
  const colors: Record<string, string> = {
    success: 'bg-emerald-600',
    error: 'bg-red-600',
    info: 'bg-gray-900'
  };
</script>

<div class="fixed inset-0 pointer-events-none flex flex-col items-end p-4 gap-2 z-[1000]">
  {#each $toasts as t (t.id)}
    <div class={`pointer-events-auto text-white px-4 py-2 rounded shadow ${colors[t.type] || 'bg-gray-900'}`}>
      {t.message}
    </div>
  {/each}
</div>
