<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button/index.js';
  import { MessageCircle, ArrowLeft } from '@lucide/svelte';

  const supportUrl = 'https://wa.me/?text=' + encodeURIComponent('Hola BellezaApp, necesito ayuda con la Política de Privacidad.');

  function smartBack() {
    try {
      if (typeof document !== 'undefined' && typeof location !== 'undefined') {
        const ref = document.referrer;
        if (ref && new URL(ref).origin === location.origin) {
          history.back();
          return;
        }
      }
    } catch {}
    goto('/');
  }
</script>

<svelte:head>
  <title>Política de Privacidad | BellezaApp</title>
  <meta name="description" content="Política de Privacidad de BellezaApp: cómo recopilamos, usamos y protegemos tus datos personales." />
  <meta name="robots" content="index,follow" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-white to-rose-50/50">
  <header class="sticky top-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100">
    <div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="/" on:click|preventDefault={smartBack} class="inline-flex items-center text-gray-600 hover:text-primary transition-colors group">
        <ArrowLeft class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver
      </a>
      <a href={supportUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp soporte" title="WhatsApp soporte">
        <Button variant="outline" size="sm" class="border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600">
          <MessageCircle class="w-4 h-4 mr-2" />
          Soporte
        </Button>
      </a>
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-4 py-10 lg:py-14">
    <div class="mb-8 text-center space-y-3">
      <h1 class="font-serif text-4xl font-bold bg-gradient-to-r from-gray-900 via-primary to-rose-600 bg-clip-text text-transparent">Política de Privacidad</h1>
      <p class="text-gray-600">Tu confianza es lo más importante para nosotros.</p>
      <p class="text-xs text-gray-500">Última actualización: 14 de agosto de 2025</p>
    </div>

    <!-- Intro card -->
    <section class="rounded-xl bg-white border border-gray-100 shadow-sm p-6 mb-8">
      <p class="text-gray-700 leading-relaxed">
        Esta Política de Privacidad explica cómo BellezaApp ("nosotros" o "nuestro") recopila, utiliza, divulga y protege la información personal de los usuarios y clientes.
        Aplica a nuestro sitio web, aplicación y servicios relacionados. Si no estás de acuerdo con esta Política, por favor no uses nuestros servicios.
      </p>
    </section>

    <!-- TOC -->
    <nav aria-label="Índice" class="mb-10">
      <div class="rounded-xl bg-white border border-gray-100 shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-3">Contenido</h2>
        <ol class="list-decimal ml-5 space-y-2 text-gray-700">
          <li><a class="text-primary hover:text-primary/80" href="#datos-que-recopilamos">Datos que recopilamos</a></li>
          <li><a class="text-primary hover:text-primary/80" href="#como-usamos-tus-datos">Cómo usamos tus datos</a></li>
          <li><a class="text-primary hover:text-primary/80" href="#bases-legales">Bases legales</a></li>
          <li><a class="text-primary hover:text-primary/80" href="#compartir-informacion">Con quién compartimos información</a></li>
          <li><a class="text-primary hover:text-primary/80" href="#retencion">Conservación de datos</a></li>
          <li><a class="text-primary hover:text-primary/80" href="#seguridad">Seguridad</a></li>
          <li><a class="text-primary hover:text-primary/80" href="#tus-derechos">Tus derechos</a></li>
          <li><a class="text-primary hover:text-primary/80" href="#cookies">Cookies y tecnologías similares</a></li>
          <li><a class="text-primary hover:text-primary/80" href="#transferencias-internacionales">Transferencias internacionales</a></li>
          <li><a class="text-primary hover:text-primary/80" href="#menores">Menores de edad</a></li>
          <li><a class="text-primary hover:text-primary/80" href="#cambios">Cambios a esta Política</a></li>
          <li><a class="text-primary hover:text-primary/80" href="#contacto">Contacto</a></li>
        </ol>
      </div>
    </nav>

    <!-- Sections -->
    <section id="datos-que-recopilamos" class="rounded-xl bg-white border border-gray-100 shadow-sm p-6 mb-6 scroll-mt-24">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">1. Datos que recopilamos</h2>
      <ul class="list-disc ml-5 space-y-2 text-gray-700">
        <li><span class="font-medium">Datos de cuenta:</span> nombre, correo electrónico, contraseña y, opcionalmente, nombre de usuario.</li>
        <li><span class="font-medium">Datos del salón:</span> nombre comercial, dirección, horarios y servicios ofrecidos.</li>
        <li><span class="font-medium">Datos de uso:</span> interacciones con la app, páginas visitadas, clics y métricas de rendimiento.</li>
        <li><span class="font-medium">Datos técnicos:</span> dirección IP, tipo de navegador, dispositivo, sistema operativo.</li>
        <li><span class="font-medium">Soporte:</span> mensajes que nos envíes por WhatsApp, correo u otros canales.</li>
      </ul>
    </section>

    <section id="como-usamos-tus-datos" class="rounded-xl bg-white border border-gray-100 shadow-sm p-6 mb-6 scroll-mt-24">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">2. Cómo usamos tus datos</h2>
      <ul class="list-disc ml-5 space-y-2 text-gray-700">
        <li>Proveer y operar los servicios de BellezaApp.</li>
        <li>Crear y gestionar tu cuenta, autenticación y seguridad.</li>
        <li>Mejorar el rendimiento, la experiencia de usuario y desarrollar nuevas funciones.</li>
        <li>Comunicarnos contigo sobre actualizaciones, soporte y novedades relevantes.</li>
        <li>Cumplir obligaciones legales y hacer valer nuestros términos.</li>
      </ul>
    </section>

    <section id="bases-legales" class="rounded-xl bg-white border border-gray-100 shadow-sm p-6 mb-6 scroll-mt-24">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">3. Bases legales</h2>
      <p class="text-gray-700 leading-relaxed">
        Tratamos tus datos en base a la ejecución del contrato (proporcionarte el servicio), consentimiento (por ejemplo, comunicaciones opcionales), interés legítimo (mejoras de producto, seguridad)
        y cumplimiento de obligaciones legales. Cuando solicitemos tu consentimiento, podrás retirarlo en cualquier momento.
      </p>
    </section>

    <section id="compartir-informacion" class="rounded-xl bg-white border border-gray-100 shadow-sm p-6 mb-6 scroll-mt-24">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">4. Con quién compartimos información</h2>
      <ul class="list-disc ml-5 space-y-2 text-gray-700">
        <li><span class="font-medium">Proveedores:</span> servicios de hosting, analítica, mensajería y pago que actúan como encargados de tratamiento.</li>
        <li><span class="font-medium">Autoridades:</span> cuando la ley lo requiera o para proteger derechos, seguridad y cumplimiento.</li>
        <li><span class="font-medium">Transferencias comerciales:</span> en caso de fusión, adquisición u otra reorganización.</li>
      </ul>
    </section>

    <section id="retencion" class="rounded-xl bg-white border border-gray-100 shadow-sm p-6 mb-6 scroll-mt-24">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">5. Conservación de datos</h2>
      <p class="text-gray-700 leading-relaxed">
        Conservamos tus datos mientras mantengas una cuenta activa o según sea necesario para los fines descritos. También podremos conservarlos para cumplir obligaciones legales,
        resolver disputas y hacer cumplir acuerdos. Posteriormente, aplicaremos anonimización o eliminación segura.
      </p>
    </section>

    <section id="seguridad" class="rounded-xl bg-white border border-gray-100 shadow-sm p-6 mb-6 scroll-mt-24">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">6. Seguridad</h2>
      <p class="text-gray-700 leading-relaxed">
        Aplicamos medidas técnicas y organizativas razonables para proteger tu información (por ejemplo, HTTPS, controles de acceso y buenas prácticas de desarrollo).
        Ningún sistema es 100% seguro, pero trabajamos continuamente para mejorar nuestra postura de seguridad.
      </p>
    </section>

    <section id="tus-derechos" class="rounded-xl bg-white border border-gray-100 shadow-sm p-6 mb-6 scroll-mt-24">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">7. Tus derechos</h2>
      <ul class="list-disc ml-5 space-y-2 text-gray-700">
        <li>Acceder a tus datos personales y solicitar una copia.</li>
        <li>Rectificar datos inexactos o incompletos.</li>
        <li>Eliminar tus datos cuando ya no sean necesarios o bajo las condiciones previstas por ley.</li>
        <li>Oponerte o limitar ciertos tratamientos.</li>
        <li>Portabilidad de datos cuando aplique.</li>
        <li>Retirar tu consentimiento cuando el tratamiento se base en éste.</li>
      </ul>
      <p class="text-gray-700 mt-3">Para ejercer tus derechos, contáctanos usando los canales en la sección de Contacto.</p>
    </section>

    <section id="cookies" class="rounded-xl bg-white border border-gray-100 shadow-sm p-6 mb-6 scroll-mt-24">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">8. Cookies y tecnologías similares</h2>
      <p class="text-gray-700 leading-relaxed">
        Utilizamos cookies esenciales para operar el servicio, y cookies analíticas para entender el uso y mejorar la experiencia. Puedes gestionar tus preferencias desde la configuración del navegador.
      </p>
    </section>

    <section id="transferencias-internacionales" class="rounded-xl bg-white border border-gray-100 shadow-sm p-6 mb-6 scroll-mt-24">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">9. Transferencias internacionales</h2>
      <p class="text-gray-700 leading-relaxed">
        Algunos proveedores pueden estar ubicados fuera de tu país. En tales casos, adoptamos salvaguardas adecuadas para proteger tus datos conforme a la normativa aplicable.
      </p>
    </section>

    <section id="menores" class="rounded-xl bg-white border border-gray-100 shadow-sm p-6 mb-6 scroll-mt-24">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">10. Menores de edad</h2>
      <p class="text-gray-700 leading-relaxed">
        BellezaApp no está dirigida a menores de 13 años y no recopilamos conscientemente información personal de menores. Si crees que un menor nos ha proporcionado datos, contáctanos para eliminarlos.
      </p>
    </section>

    <section id="cambios" class="rounded-xl bg-white border border-gray-100 shadow-sm p-6 mb-6 scroll-mt-24">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">11. Cambios a esta Política</h2>
      <p class="text-gray-700 leading-relaxed">
        Podemos actualizar esta Política para reflejar cambios legales, técnicos o de negocio. Publicaremos la versión vigente en esta página e indicaremos la fecha de actualización.
        Si los cambios son significativos, podremos avisarte por los medios adecuados.
      </p>
    </section>

    <section id="contacto" class="rounded-xl bg-white border border-gray-100 shadow-sm p-6 mb-6 scroll-mt-24">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">12. Contacto</h2>
      <p class="text-gray-700 leading-relaxed">
        Si tienes preguntas o deseas ejercer tus derechos, contáctanos:
      </p>
      <ul class="list-disc ml-5 space-y-2 text-gray-700">
        <li>WhatsApp: <a class="text-primary hover:text-primary/80" href={supportUrl} target="_blank" rel="noopener noreferrer">Escríbenos aquí</a></li>
        <li>Email: soporte@belleza.app</li>
      </ul>
      <div class="mt-4">
        <a href={supportUrl} target="_blank" rel="noopener noreferrer">
          <Button class="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <MessageCircle class="w-4 h-4 mr-2" />
            Abrir WhatsApp
          </Button>
        </a>
      </div>
    </section>

    <div class="text-center text-xs text-gray-500 mt-10">
      © {new Date().getFullYear()} BellezaApp. Todos los derechos reservados.
    </div>
  </main>
</div>
