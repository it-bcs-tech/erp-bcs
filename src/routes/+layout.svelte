<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';
	
	let { children } = $props();
</script>

{#if !$page.url.pathname.startsWith('/login')}
	<Header />
{/if}

{@render children()}

{#if !$page.url.pathname.startsWith('/login')}
	<Footer />
{/if}
