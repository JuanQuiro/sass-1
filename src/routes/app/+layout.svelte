<script lang="ts">
  export let data: { perms: string[] };
</script>

<div class="min-h-screen bg-gray-50">
  <header class="border-b bg-white">
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <div class="flex items-center gap-6">
        <a href="/app" class="font-semibold">BellezaApp</a>
        <nav class="hidden md:flex items-center gap-4 text-sm text-gray-600">
          <a href="/app/salons" class="hover:text-gray-900">Salones</a>
          <a href="/app/staff" class="hover:text-gray-900">Staff</a>
          <a href="/app/services" class="hover:text-gray-900">Servicios</a>
          <a href="/app/clients" class="hover:text-gray-900">Clientes</a>
          <a href="/app/appointments" class="hover:text-gray-900">Citas</a>
          <a href="/app/service-staff" class="hover:text-gray-900">Asignaciones</a>
          <a href="/app/permissions" class="hover:text-gray-900">Permisos</a>
          <a href="/app/profile" class="hover:text-gray-900">Perfil</a>
        </nav>
      </div>
      <div class="flex items-center gap-3 text-sm">
        <span class="hidden sm:inline text-gray-600">{data.perms?.length || 0} permisos</span>
        <a href="/app/profile" class="px-3 py-1.5 rounded border hover:bg-gray-50">Perfil</a>
        <form method="POST" action="/auth/logout"><button class="px-3 py-1.5 rounded bg-gray-900 text-white">Salir</button></form>
      </div>
    </div>
  </header>
  <main class="max-w-7xl mx-auto p-4">
    <slot />
  </main>
</div>
