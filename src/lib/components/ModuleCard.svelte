<script lang="ts">
	let { icon, title, subtitle, colorClass, textClass, href } = $props<{
		icon: string;
		title: string;
		subtitle: string;
		colorClass: string;
		textClass: string;
		href?: string;
	}>();
</script>

{#if href}
	<a {href} class="group flex flex-col items-center p-6 bg-surface-container-lowest rounded-full hover:bg-surface-container transition-all duration-300 transform active:scale-95 shadow-sm hover:shadow-md cursor-pointer">
		<div class="w-20 h-20 mb-4 rounded-full {colorClass} flex items-center justify-center {textClass} group-hover:scale-110 transition-transform duration-300">
			<span class="material-symbols-outlined text-4xl">{icon}</span>
		</div>
		<span class="text-on-surface font-semibold group-hover:text-primary transition-colors">{title}</span>
		<span class="text-[10px] text-on-surface-variant mt-1 uppercase tracking-widest font-bold">{subtitle}</span>
	</a>
{:else}
	<button class="group flex flex-col items-center p-6 bg-surface-container-lowest rounded-full hover:bg-surface-container transition-all duration-300 transform active:scale-95 shadow-sm hover:shadow-md">
		<div class="w-20 h-20 mb-4 rounded-full {colorClass} flex items-center justify-center {textClass} group-hover:scale-110 transition-transform duration-300">
			<span class="material-symbols-outlined text-4xl">{icon}</span>
		</div>
		<span class="text-on-surface font-semibold group-hover:text-primary transition-colors">{title}</span>
		<span class="text-[10px] text-on-surface-variant mt-1 uppercase tracking-widest font-bold">{subtitle}</span>
	</button>
{/if}
