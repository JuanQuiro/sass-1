<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { toasts } from '$lib/stores/toast';
  // Simple dashboard landing with welcome toast
  onMount(() => {
    const url = page?.subscribe ? null : null;
    try {
      const hasWelcome = typeof location !== 'undefined' && new URL(location.href).searchParams.get('welcome') === '1';
      if (hasWelcome) {
        toasts.success('¡Bienvenido!');
        // Clean the URL without reloading
        const u = new URL(location.href);
        u.searchParams.delete('welcome');
        history.replaceState({}, '', u.toString());
      }
    } catch {}
  });
</script>

<section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <a href="/app/salons" class="block p-6 rounded border bg-white hover:shadow">
    <h2 class="font-semibold mb-1">Salones</h2>
    <p class="text-sm text-gray-600">Gestiona salones</p>
  </a>
  <a href="/app/staff" class="block p-6 rounded border bg-white hover:shadow">
    <h2 class="font-semibold mb-1">Staff</h2>
    <p class="text-sm text-gray-600">Gestiona el personal</p>
  </a>
  <a href="/app/services" class="block p-6 rounded border bg-white hover:shadow">
    <h2 class="font-semibold mb-1">Servicios</h2>
    <p class="text-sm text-gray-600">Catálogo de servicios</p>
  </a>
  <a href="/app/clients" class="block p-6 rounded border bg-white hover:shadow">
    <h2 class="font-semibold mb-1">Clientes</h2>
    <p class="text-sm text-gray-600">Listado de clientes</p>
  </a>
  <a href="/app/appointments" class="block p-6 rounded border bg-white hover:shadow">
    <h2 class="font-semibold mb-1">Citas</h2>
    <p class="text-sm text-gray-600">Agenda y disponibilidad</p>
  </a>
  <a href="/app/service-staff" class="block p-6 rounded border bg-white hover:shadow">
    <h2 class="font-semibold mb-1">Asignaciones</h2>
    <p class="text-sm text-gray-600">Servicios ↔ Staff</p>
  </a>
  <a href="/app/permissions" class="block p-6 rounded border bg-white hover:shadow">
    <h2 class="font-semibold mb-1">Permisos</h2>
    <p class="text-sm text-gray-600">Roles y permisos</p>
  </a>
</section>
