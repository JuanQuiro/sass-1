<script lang="ts">
    import '../app.css';
    import Toaster from '$lib/components/Toaster.svelte';
    import { navigating } from '$app/stores';

    let { children } = $props();

    // Usa el dominio provisto para generar URLs absolutas en los meta OG/Twitter
    const siteUrl = 'https://sass-1-bellezas.vercel.app'.replace(/\/$/, '');
    const title = 'BellezaApp - Impulsa tu salón al siguiente nivel';
    const description = 'Gestión, reservas y marketing en una sola plataforma para salones de belleza, spas y barberías en Venezuela';
    const ogImagePath = '/luxury-salon-interior.png?v=20250812-1';
    const ogImage = `${siteUrl}${ogImagePath}`;
</script>

<div class="app">
    <!-- Top progress bar on navigation -->
    {#if $navigating}
        <div class="fixed top-0 left-0 right-0 h-0.5 bg-gray-200 z-[1000]">
            <div class="h-full bg-gray-900 animate-[progress_1.2s_ease_infinite]" style="width:60%"></div>
        </div>
    {/if}


    <main>
        {@render children()}
    </main>
    <Toaster />
</div>


<svelte:head>
    <!-- Canonical -->
    <link rel="canonical" href={siteUrl + '/'} />

    <!-- Open Graph (Facebook/WhatsApp) -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="BellezaApp" />
    <meta property="og:locale" content="es_VE" />
    <meta property="og:url" content={siteUrl + '/'} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:secure_url" content={ogImage.replace('http://', 'https://')} />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:alt" content="Software para salones de belleza: tablero y reservas" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />
    <meta name="twitter:image:alt" content="Software para salones de belleza: tablero y reservas" />

    <!-- Icons -->
    <link rel="apple-touch-icon" href="/luxury-salon-interior.png" />
</svelte:head>

<style>
  @keyframes progress {
    0% { transform: translateX(-60%); }
    50% { transform: translateX(-10%); }
    100% { transform: translateX(40%); }
  }
</style>
