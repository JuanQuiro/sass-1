<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import {
    Sparkles, Shield, MapPin, CreditCard,
    Zap, MessageSquare, Smartphone, Wifi, Clock,
    Users, TrendingUp, Star, Check, Scissors, Heart,
    Menu, X
  } from '@lucide/svelte';

  // Navigation state
  let isMenuOpen = false;

  // Toggle mobile menu
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  // Close mobile menu when a nav link is clicked
  function closeMenu() {
    isMenuOpen = false;
  }

  // WhatsApp share URL (built on client)
  let whatsappShareUrl = '';
  onMount(() => {
    try {
      const title = 'BellezaApp - Impulsa tu salón al siguiente nivel';
      const desc = 'Gestión, reservas y marketing en una sola plataforma para salones de belleza en Venezuela';
      const page = typeof location !== 'undefined' ? location.href : '';
      const text = `${title} — ${desc} ${page}`;
      whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    } catch {}
  });

  // Features data
  const features = [
    {
      icon: Shield,
      title: "Reservas Sin Comisiones",
      description:
        "A diferencia de otros marketplaces, todas las reservas que entren por tu web o WhatsApp son 100% tuyas, sin retener ingresos",
      color: "text-[#C9A76F]",
    },
    {
      icon: MapPin,
      title: "Marketplace 'Estética Venezuela'",
      description:
        "Aparece en un portal nacional donde miles de personas buscan servicios de belleza. Gratis para todos los usuarios del SaaS",
      color: "text-[#C9A76F]",
    },
    {
      icon: CreditCard,
      title: "Pagos Integrados Venezuela",
      description:
        "Pago Móvil, transferencias en bolívares, Zelle, USDT, MercadoPago e InstaPago. Cobros adelantados opcionales",
      color: "text-[#C9A76F]",
    },
    {
      icon: Zap,
      title: "Web Estética en 5 Minutos",
      description:
        "Diseño profesional, galería de fotos, lista de precios y botón de reserva/pago. Subdominio gratis incluido",
      color: "text-[#C9A76F]",
    },
    {
      icon: MessageSquare,
      title: "Marketing Automático Inteligente",
      description:
        "Campañas de WhatsApp y SMS para cumpleaños, clientes inactivos, promociones de temporada (Navidad, Carnaval, Día de las Madres)",
      color: "text-[#C9A76F]",
    },
    {
      icon: Smartphone,
      title: "App Móvil Doble",
      description:
        "App cliente para reservar y pagar desde el teléfono. App para dueños para controlar agenda, pagos y estadísticas en cualquier lugar",
      color: "text-[#C9A76F]",
    },
    {
      icon: Sparkles,
      title: "IA y Realidad Aumentada",
      description:
        "Filtros de prueba virtual de peinados, colores y maquillaje. Recomendación automática de servicios según historial del cliente",
      color: "text-[#C9A76F]",
    },
  ];

  // Problems data
  const problems = [
    {
      icon: Wifi,
      title: "Internet Inestable",
      description: "Modo offline para ver agenda y registrar servicios, sincronizando después",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Clock,
      title: "Falta de Tiempo",
      description: "Publicaciones preprogramadas desde la plataforma para redes sociales",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Users,
      title: "Ausencias y Cancelaciones",
      description: "Confirmaciones automáticas y cobro anticipado opcional",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: TrendingUp,
      title: "Conseguir Nuevos Clientes",
      description: "Visibilidad en marketplace y SEO básico integrado",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "María González",
      business: "Salón Elegance - Caracas",
      image: "/professional-salon-owner.png",
      rating: 5,
      testimonial:
        "Desde que uso BellezaApp, mis reservas aumentaron 40%. La plataforma es súper fácil de usar y mis clientes aman poder reservar online.",
    },
    {
      name: "Carlos Mendoza",
      business: "Barbería Premium - Valencia",
      image: "/smiling-barber.png",
      rating: 5,
      testimonial:
        "El sistema de recordatorios automáticos redujo mis cancelaciones a casi cero. Ahora tengo mi agenda siempre llena.",
    },
    {
      name: "Ana Rodríguez",
      business: "Spa Relax - Maracaibo",
      image: "/luxury-salon-interior.png",
      rating: 5,
      testimonial:
        "Los pagos en bolívares y dólares me permitieron estabilizar mis ingresos completamente. El marketplace me trajo muchos clientes nuevos.",
    },
  ];
  
	const plans = [
	  {
		name: "Gratis",
		price: "$0",
		period: "para siempre",
		description: "Perfecto para comenzar",
		features: [
		  "Agenda online",
		  "Reservas por WhatsApp",
		  "Perfil en marketplace",
		  "Hasta 50 reservas/mes",
		  "Soporte por email",
		],
		cta: "Comenzar Gratis",
		popular: false,
	  },
	  {
		name: "Pro",
		price: "$15",
		period: "/mes",
		description: "Todo lo que necesitas",
		features: [
		  "Web profesional con subdominio",
		  "Pagos online (Pago Móvil, Zelle, USDT)",
		  "Marketing automático",
		  "Reportes y control de clientes",
		  "Reservas ilimitadas",
		  "Recordatorios automáticos",
		  "Soporte prioritario",
		],
		cta: "Probar 14 días gratis",
		popular: true,
	  },
	  {
		name: "Premium",
		price: "$30",
		period: "/mes",
		description: "Tecnología avanzada",
		features: [
		  "Todo del plan Pro",
		  "App personalizada (cliente + dueño)",
		  "AR/IA de prueba virtual",
		  "Multicuentas y sucursales",
		  "Dominio propio",
		  "Soporte VIP",
		  "Gerente de cuenta dedicado",
		],
		cta: "Contactar Ventas",
		popular: false,
	  },
	];
  </script>
  
  <!-- Navigation -->
  <nav class="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <a href="/" class="flex items-center space-x-2 cursor-pointer" aria-label="Ir al inicio">
          <div class="w-8 h-8 gradient-gold rounded-lg flex items-center justify-center">
            <Sparkles class="w-5 h-5 text-white" />
          </div>
          <span class="font-serif text-xl font-bold text-gray-900">BellezaApp</span>
        </a>
        <div class="hidden md:flex items-center space-x-8">
          <a href="#features" class="text-gray-600 hover:text-gray-900 transition-colors">Características</a>
          <a href="#testimonios" class="text-gray-600 hover:text-gray-900 transition-colors">Testimonios</a>
          <a href="#precios" class="text-gray-600 hover:text-gray-900 transition-colors">Precios</a>
          <a href="/auth/login" class="inline-block">
            <Button variant="outline" class="cursor-pointer border-[#C9A76F] text-[#C9A76F] hover:bg-[#C9A76F] hover:text-white bg-transparent">Iniciar Sesión</Button>
          </a>
          <a href="/auth/register" class="inline-block">
            <Button class="cursor-pointer gradient-gold text-white hover:opacity-90">Registrarse</Button>
          </a>
        </div>
        <!-- Mobile menu toggle -->
        <button
          class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C9A76F]"
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          on:click={toggleMenu}
        >
          {#if isMenuOpen}
            <X class="h-6 w-6" />
          {:else}
            <Menu class="h-6 w-6" />
          {/if}
        </button>
      </div>
      {#if isMenuOpen}
        <!-- Mobile menu panel -->
        <div id="mobile-menu" class="md:hidden mt-2 border-t border-gray-100">
          <div class="py-3 space-y-1">
            <a href="#features" on:click={closeMenu} class="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded">Características</a>
            <a href="#testimonios" on:click={closeMenu} class="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded">Testimonios</a>
            <a href="#precios" on:click={closeMenu} class="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded">Precios</a>
            <a href="/auth/login" on:click={closeMenu} class="block px-2 py-2">
              <Button variant="outline" class="w-full cursor-pointer border-[#C9A76F] text-[#C9A76F] hover:bg-[#C9A76F] hover:text-white bg-transparent">Iniciar Sesión</Button>
            </a>
            <a href="/auth/register" on:click={closeMenu} class="block px-2 py-2">
              <Button class="w-full cursor-pointer gradient-gold text-white hover:opacity-90">Registrarse</Button>
            </a>
          </div>
        </div>
      {/if}
    </div>
  </nav>

  <!-- Hero -->
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
		 style="background-image: linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url('/modern-beauty-salon.png')">
	</div>
	<div class="relative z-10 max-w-4xl mx-auto text-center p-4">
	  <Badge class="mb-6 bg-[#F9E6E0] text-[#C9A76F] border-[#C9A76F] hover:bg-[#C9A76F] hover:text-white">
		🇻🇪 Hecho para Venezuela • Sin Comisiones
	  </Badge>
	  <h1 class="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
		Haz crecer tu salón con
		<span class="bg-gradient-to-r from-[#C9A76F] to-[#F9E6E0] bg-clip-text text-transparent">
		  reservas sin comisiones
		</span>
	  </h1>
	  <p class="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
		La única plataforma de belleza pensada para Venezuela: reservas sin comisiones, pagos locales y presencia digital profesional en minutos
	  </p>
	  <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/auth/login" class="inline-block" aria-label="Comenzar gratis">
          <Button size="lg" class="cursor-pointer gradient-gold hover:bg-[#B8956A] text-white px-8 py-4 text-lg font-semibold">
            Comenzar Gratis
          </Button>
        </a>
        <a href="/demo" class="inline-block" aria-label="Ver demo">
          <Button size="lg" variant="outline" class="cursor-pointer border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg bg-transparent">
            Ver Demo
          </Button>
        </a>
      </div>
	  <p class="text-white/80 text-sm mt-6">
		✨ Sin tarjeta de crédito • Configuración en 5 minutos • Soporte en español
	  </p>
	</div>
  </section>
  
  <!-- Features -->
  <section id="features" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">7 diferenciadores que te harán líder en Venezuela</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">Características únicas diseñadas para los desafíos reales del mercado venezolano</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each features as { icon: Icon, title, description }}
          <Card.Root class="hover-lift border-0 shadow-lg bg-white rounded-xl">
            <div class="p-8 text-center">
              <div class="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon class="w-8 h-8 text-white" />
              </div>
              <h3 class="font-serif text-xl font-bold text-gray-900 mb-4">{title}</h3>
              <p class="text-gray-600 leading-relaxed">{description}</p>
            </div>
          </Card.Root>
        {/each}
      </div>
    </div>
  </section>

  <!-- Problems/Solutions -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Resolvemos problemas reales del mercado venezolano</h2>
        <p class="text-xl text-gray-600">Soluciones pensadas para los desafíos únicos que enfrentas día a día</p>
      </div>
      <div class="grid md:grid-cols-4 gap-6">
        {#each problems as { icon: Icon, title, description, color }}
          <Card.Root class="hover-lift border-0 shadow-lg bg-white text-center rounded-xl">
            <div class="p-6">
              <div class={`w-16 h-16 ${color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon class="w-8 h-8" />
              </div>
              <h3 class="font-serif text-lg font-bold text-gray-900 mb-3">{title}</h3>
              <p class="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
          </Card.Root>
        {/each}
      </div>
    </div>
  </section>
  
  <!-- Benefits/Results -->
  <section class="py-20 gradient-rose">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="relative">
          <img
            src="/luxury-salon-interior.png"
            alt="Salón moderno"
            class="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
          />
          <div class="absolute -bottom-6 -right-6 bg-[#C9A76F] text-white p-6 rounded-xl shadow-lg">
            <div class="text-2xl font-bold">+40%</div>
            <div class="text-sm">Más reservas</div>
          </div>
        </div>
        <div class="space-y-8">
          <div>
            <h2 class="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Resultados comprobados en Venezuela
            </h2>
            <p class="text-xl text-gray-600 mb-8">
              Únete a cientos de salones que ya están transformando su negocio con nuestra plataforma
            </p>
          </div>
          <div class="space-y-6">
            {#each [
              "+40% en reservas el primer mes",
              "Cero comisiones ocultas",
              "Soporte 24/7 en español",
              "Configuración en menos de 5 minutos",
              "Pagos en bolívares y dólares",
              "Funciona sin internet estable",
            ] as benefit}
              <div class="flex items-center gap-4">
                <div class="w-8 h-8 gradient-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <Check class="w-5 h-5 text-white" />
                </div>
                <span class="text-lg text-gray-700 font-medium">{benefit}</span>
              </div>
            {/each}
          </div>
          <Button size="lg" class="gradient-gold hover:bg-[#B8956A] text-white px-8 py-4 text-lg font-semibold">
            Comenzar Gratis Ahora
          </Button>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section id="testimonios" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
        <p class="text-xl text-gray-600">Historias reales de éxito en toda Venezuela</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        {#each testimonials as t}
          <Card.Root class="p-6 shadow-md rounded-xl bg-white">
            <div class="flex items-center gap-3 mb-4">
              <img src={t.image} alt={t.name} class="w-10 h-10 rounded-full object-cover border" />
              <div>
                <div class="font-semibold">{t.name}</div>
                <div class="text-sm text-gray-500">{t.business}</div>
              </div>
            </div>
            <div class="flex items-center gap-1 text-[#C9A76F] mb-3">
              {#each Array(t.rating) as _, i}
                <Star class="w-4 h-4 fill-current" />
              {/each}
            </div>
            <p class="text-gray-700 italic leading-relaxed">"{t.testimonial}"</p>
          </Card.Root>
        {/each}
      </div>
    </div>
  </section>
  
  <!-- Pricing -->
  <section id="precios" class="py-20 gradient-rose">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Planes escalonados para máxima rentabilidad</h2>
        <p class="text-xl text-gray-600">Comienza gratis y escala según crezcas • Precios en USD y Bs</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {#each plans as plan}
          <Card.Root class={`relative hover-lift ${plan.popular ? 'border-[#C9A76F] border-2 shadow-xl' : 'border-gray-200'} bg-white rounded-xl`}>
            {#if plan.popular}
              <div class="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge class="gradient-gold text-white px-4 py-1">Más Popular</Badge>
              </div>
            {/if}
            <div class="p-8">
              <div class="text-center mb-8">
                <h3 class="font-serif text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p class="text-gray-600 mb-4">{plan.description}</p>
                <div class="mb-4">
                  <span class="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span class="text-gray-600">{plan.period}</span>
                </div>
              </div>
              <ul class="space-y-4 mb-8">
                {#each plan.features as feature}
                  <li class="flex items-center">
                    <Check class="w-5 h-5 text-[#C9A76F] mr-3 flex-shrink-0" />
                    <span class="text-gray-700">{feature}</span>
                  </li>
                {/each}
              </ul>
              <Button class={`w-full ${plan.popular ? 'gradient-gold hover:bg-[#B8956A] text-white' : 'border-[#C9A76F] text-[#C9A76F] hover:bg-[#C9A76F] hover:text-white'}`} variant={plan.popular ? 'default' : 'outline'}>{plan.cta}</Button>
            </div>
          </Card.Root>
        {/each}
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="py-20 relative overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: linear-gradient(rgba(201, 167, 111, 0.9), rgba(201, 167, 111, 0.9)), url('/luxury-beauty-salon.png')"
    ></div>
    <div class="relative z-10 max-w-4xl mx-auto text-center px-4">
      <div class="flex justify-center mb-6">
        <div class="flex space-x-4">
          <Heart class="w-8 h-8 text-white" />
          <Scissors class="w-8 h-8 text-white" />
          <Sparkles class="w-8 h-8 text-white" />
        </div>
      </div>
      <h2 class="font-serif text-3xl md:text-5xl font-bold text-white mb-6">Tu negocio de belleza, digital y en crecimiento</h2>
      <p class="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
        Únete a la revolución digital de la belleza en Venezuela. La única plataforma que combina reservas online,
        marketing, pagos locales y presencia digital en una sola herramienta, sin comisiones.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/auth/login" class="inline-block" aria-label="Comenzar gratis ahora">
          <Button size="lg" class="cursor-pointer bg-white text-[#C9A76F] hover:bg-gray-100 px-8 py-4 text-lg font-semibold">Comenzar Gratis Ahora</Button>
        </a>
        <a href="/demo" class="inline-block" aria-label="Agendar demo personalizada">
          <Button size="lg" variant="outline" class="cursor-pointer border-white text-white hover:bg-white hover:text-[#C9A76F] px-8 py-4 text-lg bg-transparent">Agendar Demo Personalizada</Button>
        </a>
        <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" class="inline-block">
          <Button size="lg" class="bg-[#25D366] hover:bg-[#1ebe57] text-white px-8 py-4 text-lg font-semibold">Compartir por WhatsApp</Button>
        </a>
      </div>
      <p class="text-white/80 text-sm mt-6">🇻🇪 Sin tarjeta de crédito • Configuración en 5 minutos • Soporte en español • Pagos en Bs y USD</p>
    </div>
  </section>
  
  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 gradient-gold rounded-lg flex items-center justify-center">
              <Sparkles class="w-5 h-5 text-white" />
            </div>
            <span class="font-serif text-xl font-bold">BellezaApp</span>
          </div>
          <p class="text-gray-400 mb-4 max-w-md">
            La plataforma líder para salones de belleza, spas y barberías en Venezuela. Tu negocio de belleza, digital y en crecimiento.
          </p>
          <div class="text-sm text-gray-500">&copy; {new Date().getFullYear()} BellezaApp. Todos los derechos reservados.</div>
        </div>

        <div>
          <h4 class="font-semibold mb-4">Producto</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#features" class="hover:text-white transition-colors">Características</a></li>
            <li><a href="/marketplace" class="hover:text-white transition-colors">Marketplace Venezuela</a></li>
            <li><a href="#precios" class="hover:text-white transition-colors">Precios</a></li>
            <li><a href="/demo" class="hover:text-white transition-colors">Demo</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-4">Soporte</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="/help" class="hover:text-white transition-colors">Centro de Ayuda</a></li>
            <li><a href="https://wa.me/message/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">WhatsApp Soporte</a></li>
            <li><a href="mailto:hola@belleza.app" class="hover:text-white transition-colors">Contacto</a></li>
            <li><a href="/terms" class="hover:text-white transition-colors">Términos</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>