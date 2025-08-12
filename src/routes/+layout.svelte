<script lang="ts">
    import '../app.css';
    import { PUBLIC_SITE_URL } from '$env/static/public';

    let { children } = $props();

    const siteUrl = (PUBLIC_SITE_URL || 'http://localhost:5173').replace(/\/$/, '');
    const title = 'Estética Pro - Impulsa tu salón al siguiente nivel';
    const description = 'Gestión, reservas y marketing en una sola plataforma para salones de belleza, spas y barberías en Venezuela';
    const ogImagePath = '/luxury-salon-interior.png';
    const ogImage = `${siteUrl}${ogImagePath}`;
</script>

<div class="app">


    <main>
        {@render children()}
    </main>
</div>


<svelte:head>
    <!-- Canonical -->
    <link rel="canonical" href={siteUrl + '/'} />

    <!-- Open Graph (Facebook/WhatsApp) -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Estética Pro" />
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
