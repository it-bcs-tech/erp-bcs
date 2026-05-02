<script lang="ts">
	import type { PageData } from './$types';
	
	let { data }: { data: PageData } = $props();
	
	// Data berasal dari +page.server.ts (yang nantinya menggunakan apiFetch ke API Laravel)
	const employees = data.employees;

	let searchQuery = '';
	let activeFilter = 'All';
	const filters = ['All', 'Engineering', 'Design', 'Management', 'Marketing', 'Product'];
</script>

<svelte:head>
	<title>Employee Directory | HRIS Dashboard</title>
</svelte:head>

<div class="flex flex-col h-full">
	<!-- Header & Actions -->
	<header class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
		<div>
			<h1 class="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Employee Directory</h1>
			<p class="text-on-surface-variant font-medium text-sm">Manage, view, and organize company personnel</p>
		</div>
		<div class="flex gap-3">
			<button class="bg-surface-container-lowest border border-outline-variant/30 text-on-surface px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-low transition-colors">
				<span class="material-symbols-outlined text-lg">filter_list</span>
				Filter
			</button>
			<button class="bg-primary text-on-primary px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm flex items-center gap-2 hover:bg-primary/90 transition-colors">
				<span class="material-symbols-outlined text-lg">person_add</span>
				New Employee
			</button>
		</div>
	</header>

	<!-- Search and Tabs -->
	<div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
		<!-- Tabs -->
		<div class="flex gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar max-w-full">
			{#each filters as filter}
				<button 
					class="px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors {activeFilter === filter ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container'}"
					onclick={() => activeFilter = filter}
				>
					{filter}
				</button>
			{/each}
		</div>

		<!-- Search -->
		<div class="relative w-full lg:w-72 flex-shrink-0">
			<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
			<input 
				type="text" 
				bind:value={searchQuery}
				placeholder="Search by name, role, or ID..." 
				class="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium"
			/>
		</div>
	</div>

	<!-- Directory Table -->
	<div class="bg-surface-container-lowest rounded-[24px] shadow-sm flex-1 overflow-hidden flex flex-col">
		<div class="overflow-x-auto flex-1">
			<table class="w-full text-left border-collapse">
				<thead>
					<tr class="border-b border-surface-container sticky top-0 bg-surface-container-lowest z-10">
						<th class="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Employee</th>
						<th class="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Role & Dept</th>
						<th class="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Status</th>
						<th class="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Contact</th>
						<th class="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-surface-container">
					{#each employees as emp}
						<tr class="group hover:bg-surface-container-low transition-colors">
							<td class="py-4 px-6">
								<a href={`/hris/employees/${emp.id}`} class="flex items-center gap-4 cursor-pointer">
									<div class="w-12 h-12 rounded-xl overflow-hidden border-2 border-surface-container-high group-hover:border-{emp.color}-container transition-colors shadow-sm">
										<img src={emp.avatar} alt={emp.name} class="w-full h-full object-cover" />
									</div>
									<div>
										<p class="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{emp.name}</p>
										<p class="text-xs text-on-surface-variant font-medium mt-0.5">{emp.id}</p>
									</div>
								</a>
							</td>
							<td class="py-4 px-6">
								<p class="text-sm font-bold text-on-surface">{emp.role}</p>
								<div class="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">
									{emp.department}
								</div>
							</td>
							<td class="py-4 px-6">
								{#if emp.status === 'Active'}
									<span class="inline-flex items-center gap-2 text-tertiary font-bold text-xs bg-tertiary-container/30 px-3 py-1.5 rounded-full">
										<span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Active
									</span>
								{:else}
									<span class="inline-flex items-center gap-2 text-error font-bold text-xs bg-error-container/30 px-3 py-1.5 rounded-full">
										<span class="w-1.5 h-1.5 rounded-full bg-error"></span> On Leave
									</span>
								{/if}
							</td>
							<td class="py-4 px-6">
								<p class="text-sm font-medium text-on-surface flex items-center gap-2">
									<span class="material-symbols-outlined text-base text-on-surface-variant">mail</span>
									{emp.email}
								</p>
							</td>
							<td class="py-4 px-6 text-right">
								<div class="flex items-center justify-end gap-2">
									<a href={`/hris/employees/${emp.id}`} class="p-2 rounded-lg text-primary hover:bg-primary-container/20 transition-colors tooltip" title="View Profile">
										<span class="material-symbols-outlined text-[20px]">visibility</span>
									</a>
									<button class="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors tooltip" title="More Options">
										<span class="material-symbols-outlined text-[20px]">more_vert</span>
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		
		<!-- Pagination Footer -->
		<div class="px-6 py-4 border-t border-surface-container flex items-center justify-between bg-surface-container-lowest">
			<p class="text-xs text-on-surface-variant font-medium">Showing 1 to 6 of 1,284 entries</p>
			<div class="flex gap-1">
				<button class="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high disabled:opacity-50 transition-colors" disabled>
					<span class="material-symbols-outlined text-lg">chevron_left</span>
				</button>
				<button class="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-on-primary font-bold text-sm shadow-sm transition-colors">1</button>
				<button class="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface font-bold text-sm hover:bg-surface-container-high transition-colors">2</button>
				<button class="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface font-bold text-sm hover:bg-surface-container-high transition-colors">3</button>
				<button class="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors">
					<span class="material-symbols-outlined text-lg">chevron_right</span>
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	/* Hide scrollbar for tabs */
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.hide-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
