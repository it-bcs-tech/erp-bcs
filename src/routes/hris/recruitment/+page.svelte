<script lang="ts">
	// Sample Recruitment Pipeline Data
	const pipeline = [
		{
			id: 'col-1',
			title: 'Applied',
			count: 24,
			color: 'surface-variant',
			candidates: [
				{ id: 'C-001', name: 'Michael Chang', role: 'Senior UX Designer', experience: '5 Yrs', status: 'New', avatar: 'https://ui-avatars.com/api/?name=Michael+Chang&background=e9ecef&color=495057' },
				{ id: 'C-002', name: 'Jessica Parker', role: 'Product Manager', experience: '8 Yrs', status: 'Reviewed', avatar: 'https://ui-avatars.com/api/?name=Jessica+Parker&background=e9ecef&color=495057' },
				{ id: 'C-003', name: 'David Kim', role: 'Frontend Developer', experience: '3 Yrs', status: 'New', avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=e9ecef&color=495057' }
			]
		},
		{
			id: 'col-2',
			title: 'Screening',
			count: 12,
			color: 'secondary',
			candidates: [
				{ id: 'C-004', name: 'Emma Wilson', role: 'Senior UX Designer', experience: '6 Yrs', status: 'Task Sent', avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=f5dbea&color=57344f' },
				{ id: 'C-005', name: 'Thomas Wright', role: 'Backend Engineer', experience: '4 Yrs', status: 'Reviewing', avatar: 'https://ui-avatars.com/api/?name=Thomas+Wright&background=f5dbea&color=57344f' }
			]
		},
		{
			id: 'col-3',
			title: 'Interview',
			count: 5,
			color: 'tertiary',
			candidates: [
				{ id: 'C-006', name: 'Olivia Martinez', role: 'Product Manager', experience: '7 Yrs', status: 'Round 2', avatar: 'https://ui-avatars.com/api/?name=Olivia+Martinez&background=c0d5a0&color=112000' },
				{ id: 'C-007', name: 'James Taylor', role: 'Frontend Developer', experience: '5 Yrs', status: 'Round 1', avatar: 'https://ui-avatars.com/api/?name=James+Taylor&background=c0d5a0&color=112000' }
			]
		},
		{
			id: 'col-4',
			title: 'Offered',
			count: 2,
			color: 'primary',
			candidates: [
				{ id: 'C-008', name: 'Sophia Anderson', role: 'Backend Engineer', experience: '6 Yrs', status: 'Pending Reply', avatar: 'https://ui-avatars.com/api/?name=Sophia+Anderson&background=ffd7f1&color=57344f' }
			]
		}
	];
</script>

<svelte:head>
	<title>Recruitment Pipeline | HRIS Dashboard</title>
</svelte:head>

<div class="flex flex-col h-[calc(100vh-120px)]">
	<!-- Header & Actions -->
	<header class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 flex-shrink-0">
		<div>
			<h1 class="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Recruitment Pipeline</h1>
			<p class="text-on-surface-variant font-medium text-sm">Manage job postings and track applicant progress</p>
		</div>
		<div class="flex gap-3">
			<button class="bg-surface-container-lowest border border-outline-variant/30 text-on-surface px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-low transition-colors shadow-sm">
				<span class="material-symbols-outlined text-lg">work</span>
				Active Jobs (5)
			</button>
			<button class="bg-primary text-on-primary px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm flex items-center gap-2 hover:bg-primary/90 transition-colors">
				<span class="material-symbols-outlined text-lg">post_add</span>
				Post New Job
			</button>
		</div>
	</header>

	<!-- Kanban Board -->
	<div class="flex-1 overflow-x-auto overflow-y-hidden pb-4 hide-scrollbar">
		<div class="flex h-full gap-6 min-w-max px-1">
			{#each pipeline as column}
				<!-- Column -->
				<div class="w-80 flex flex-col h-full bg-surface-container-lowest/50 rounded-[24px] border border-surface-container">
					<!-- Column Header -->
					<div class="p-5 border-b border-surface-container flex items-center justify-between sticky top-0 bg-surface-container-lowest rounded-t-[24px] z-10">
						<div class="flex items-center gap-3">
							<div class="w-3 h-3 rounded-full bg-{column.color} shadow-[0_0_8px_var(--color-{column.color})]"></div>
							<h3 class="font-bold text-on-surface text-sm uppercase tracking-wider">{column.title}</h3>
						</div>
						<span class="px-2.5 py-1 rounded-lg bg-surface-container-high text-xs font-bold text-on-surface-variant">{column.count}</span>
					</div>

					<!-- Cards Container -->
					<div class="p-4 flex-1 overflow-y-auto space-y-4">
						{#each column.candidates as candidate}
							<!-- Candidate Card -->
							<div class="bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-grab border border-transparent hover:border-{column.color}/30 group">
								<div class="flex justify-between items-start mb-4">
									<div class="flex items-center gap-3">
										<div class="w-10 h-10 rounded-full overflow-hidden border border-surface-container-high">
											<img src={candidate.avatar} alt={candidate.name} class="w-full h-full object-cover" />
										</div>
										<div>
											<p class="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{candidate.name}</p>
											<p class="text-[10px] text-on-surface-variant font-medium mt-0.5">{candidate.id}</p>
										</div>
									</div>
									<button class="text-on-surface-variant hover:bg-surface-container-high p-1 rounded transition-colors">
										<span class="material-symbols-outlined text-[18px]">more_horiz</span>
									</button>
								</div>
								
								<div class="space-y-2 mb-4">
									<p class="text-xs font-bold text-on-surface flex items-center gap-2">
										<span class="material-symbols-outlined text-[16px] text-on-surface-variant">work_outline</span>
										{candidate.role}
									</p>
									<p class="text-xs font-medium text-on-surface-variant flex items-center gap-2">
										<span class="material-symbols-outlined text-[16px] opacity-70">school</span>
										{candidate.experience} Exp.
									</p>
								</div>

								<div class="pt-4 border-t border-surface-container flex items-center justify-between">
									<span class="text-[10px] font-bold px-2 py-1 bg-surface-container-high text-on-surface-variant rounded-md uppercase tracking-wide">
										{candidate.status}
									</span>
									<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
										<button class="w-7 h-7 rounded-lg hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant tooltip" title="Message">
											<span class="material-symbols-outlined text-[16px]">chat</span>
										</button>
										<button class="w-7 h-7 rounded-lg hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant tooltip" title="Schedule">
											<span class="material-symbols-outlined text-[16px]">event</span>
										</button>
									</div>
								</div>
							</div>
						{/each}

						{#if column.candidates.length === 0}
							<div class="h-32 border-2 border-dashed border-surface-container rounded-2xl flex items-center justify-center text-on-surface-variant/50 text-sm font-medium">
								Drop candidate here
							</div>
						{/if}
					</div>
				</div>
			{/each}
			
			<!-- Add New Stage -->
			<div class="w-80 h-full flex items-center justify-center flex-shrink-0">
				<button class="flex flex-col items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group">
					<div class="w-12 h-12 rounded-2xl bg-surface-container-lowest border-2 border-dashed border-surface-container group-hover:border-primary/50 flex items-center justify-center transition-colors">
						<span class="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">add</span>
					</div>
					<span class="text-sm font-bold">Add Pipeline Stage</span>
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	/* Hide scrollbar for kanban board */
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.hide-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
