<script lang="ts">
	// Sample Leave Requests Data
	const leaveRequests = [
		{ id: 'LR-2023-089', name: 'Alice Murray', avatar: 'https://ui-avatars.com/api/?name=Alice+Murray&background=c0d5a0&color=112000', type: 'Annual Leave', dates: 'Oct 20 - Oct 25, 2023', duration: '5 Days', reason: 'Family vacation', status: 'Pending', statusColor: 'secondary' },
		{ id: 'LR-2023-090', name: 'Kevin Durant', avatar: 'https://ui-avatars.com/api/?name=Kevin+Durant&background=ffdad6&color=93000a', type: 'Sick Leave', dates: 'Oct 14 - Oct 15, 2023', duration: '2 Days', reason: 'Flu', status: 'Pending', statusColor: 'secondary' },
		{ id: 'LR-2023-085', name: 'Robert Chen', avatar: 'https://ui-avatars.com/api/?name=Robert+Chen&background=f5dbea&color=57344f', type: 'Paternity Leave', dates: 'Oct 01 - Oct 14, 2023', duration: '14 Days', reason: 'Birth of child', status: 'Approved', statusColor: 'tertiary' },
		{ id: 'LR-2023-082', name: 'Elena Gilbert', avatar: 'https://ui-avatars.com/api/?name=Elena+Gilbert&background=d8c0ce&color=251721', type: 'Unpaid Leave', dates: 'Nov 01 - Nov 05, 2023', duration: '5 Days', reason: 'Personal matters', status: 'Rejected', statusColor: 'error' },
	];
</script>

<svelte:head>
	<title>Leave Requests | HRIS Dashboard</title>
</svelte:head>

<div class="flex flex-col h-full">
	<!-- Header & Actions -->
	<header class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
		<div>
			<h1 class="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Leave Requests</h1>
			<p class="text-on-surface-variant font-medium text-sm">Review, approve, and manage employee time-off</p>
		</div>
		<div class="flex gap-3">
			<button class="bg-surface-container-lowest border border-outline-variant/30 text-on-surface px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-low transition-colors">
				<span class="material-symbols-outlined text-lg">filter_list</span>
				Filter
			</button>
		</div>
	</header>

	<!-- Quick Stats -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
		<div class="bg-secondary-container/20 border border-secondary-container p-6 rounded-[24px] shadow-sm relative overflow-hidden">
			<div class="absolute -right-4 -top-4 w-24 h-24 bg-secondary/10 rounded-full blur-xl"></div>
			<div class="flex items-center justify-between mb-2">
				<span class="material-symbols-outlined text-secondary text-3xl">pending_actions</span>
				<span class="text-3xl font-black text-on-surface">12</span>
			</div>
			<p class="text-sm font-bold text-on-surface">Pending Requests</p>
			<p class="text-[10px] text-on-surface-variant font-medium mt-1">Requires your approval</p>
		</div>
		<div class="bg-tertiary-container/20 border border-tertiary-container p-6 rounded-[24px] shadow-sm relative overflow-hidden">
			<div class="absolute -right-4 -top-4 w-24 h-24 bg-tertiary/10 rounded-full blur-xl"></div>
			<div class="flex items-center justify-between mb-2">
				<span class="material-symbols-outlined text-tertiary text-3xl">task_alt</span>
				<span class="text-3xl font-black text-on-surface">45</span>
			</div>
			<p class="text-sm font-bold text-on-surface">Approved This Month</p>
			<p class="text-[10px] text-on-surface-variant font-medium mt-1">Total approved leaves</p>
		</div>
		<div class="bg-error-container/20 border border-error-container p-6 rounded-[24px] shadow-sm relative overflow-hidden">
			<div class="absolute -right-4 -top-4 w-24 h-24 bg-error/10 rounded-full blur-xl"></div>
			<div class="flex items-center justify-between mb-2">
				<span class="material-symbols-outlined text-error text-3xl">cancel</span>
				<span class="text-3xl font-black text-on-surface">3</span>
			</div>
			<p class="text-sm font-bold text-on-surface">Rejected This Month</p>
			<p class="text-[10px] text-on-surface-variant font-medium mt-1">Total denied requests</p>
		</div>
	</div>

	<!-- Leave Requests List -->
	<div class="space-y-4 flex-1 overflow-y-auto pr-2 pb-10">
		{#each leaveRequests as req}
			<div class="bg-surface-container-lowest p-6 rounded-[24px] shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6 group border border-transparent hover:border-{req.statusColor}/20">
				
				<!-- Employee Info -->
				<div class="flex items-center gap-4 min-w-[250px]">
					<div class="w-12 h-12 rounded-full overflow-hidden border-2 border-surface-container-high group-hover:border-{req.statusColor}-container transition-colors shadow-sm">
						<img src={req.avatar} alt={req.name} class="w-full h-full object-cover" />
					</div>
					<div>
						<p class="text-sm font-bold text-on-surface">{req.name}</p>
						<p class="text-xs text-on-surface-variant font-medium mt-0.5">{req.id}</p>
					</div>
				</div>

				<!-- Leave Details -->
				<div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<p class="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">Leave Type</p>
						<div class="flex items-center gap-2">
							<span class="text-sm font-bold text-on-surface">{req.type}</span>
							<span class="text-[10px] font-bold bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-md">{req.duration}</span>
						</div>
					</div>
					<div>
						<p class="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">Dates</p>
						<p class="text-sm font-medium text-on-surface flex items-center gap-1.5">
							<span class="material-symbols-outlined text-[16px] text-on-surface-variant">calendar_today</span>
							{req.dates}
						</p>
					</div>
				</div>

				<!-- Reason -->
				<div class="hidden lg:block w-48">
					<p class="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">Reason</p>
					<p class="text-sm font-medium text-on-surface truncate" title={req.reason}>{req.reason}</p>
				</div>

				<!-- Actions / Status -->
				<div class="flex items-center justify-end gap-3 min-w-[180px]">
					{#if req.status === 'Pending'}
						<button class="w-10 h-10 rounded-xl bg-error-container/50 text-error flex items-center justify-center hover:bg-error-container transition-colors tooltip" title="Reject">
							<span class="material-symbols-outlined text-[20px]">close</span>
						</button>
						<button class="w-10 h-10 rounded-xl bg-tertiary-container/50 text-tertiary-fixed-dim flex items-center justify-center hover:bg-tertiary text-on-tertiary transition-colors tooltip" title="Approve">
							<span class="material-symbols-outlined text-[20px]">check</span>
						</button>
					{:else}
						<span class="inline-flex items-center gap-2 bg-{req.statusColor}-container/30 text-{req.statusColor} font-bold text-xs px-4 py-2 rounded-full border border-{req.statusColor}/20">
							<span class="w-1.5 h-1.5 rounded-full bg-{req.statusColor}"></span> {req.status}
						</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
