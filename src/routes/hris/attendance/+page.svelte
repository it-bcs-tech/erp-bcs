<script lang="ts">
	// Sample Attendance Data
	const attendanceRecords = [
		{ id: 'AT-1001', name: 'Sarah Jenkins', avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=ffd7f1&color=57344f', date: 'Oct 14, 2023', checkIn: '08:45 AM', checkOut: '05:15 PM', hours: '8h 30m', status: 'On Time', color: 'tertiary' },
		{ id: 'AT-1002', name: 'Robert Chen', avatar: 'https://ui-avatars.com/api/?name=Robert+Chen&background=f5dbea&color=57344f', date: 'Oct 14, 2023', checkIn: '09:15 AM', checkOut: '06:00 PM', hours: '8h 45m', status: 'Late', color: 'error' },
		{ id: 'AT-1003', name: 'Alice Murray', avatar: 'https://ui-avatars.com/api/?name=Alice+Murray&background=c0d5a0&color=112000', date: 'Oct 14, 2023', checkIn: '08:55 AM', checkOut: '05:00 PM', hours: '8h 05m', status: 'On Time', color: 'tertiary' },
		{ id: 'AT-1004', name: 'Kevin Durant', avatar: 'https://ui-avatars.com/api/?name=Kevin+Durant&background=ffdad6&color=93000a', date: 'Oct 14, 2023', checkIn: '-', checkOut: '-', hours: '0h', status: 'Absent', color: 'secondary' },
		{ id: 'AT-1005', name: 'Marcus Thorne', avatar: 'https://ui-avatars.com/api/?name=Marcus+Thorne&background=e9b8d9&color=2f1029', date: 'Oct 14, 2023', checkIn: '08:30 AM', checkOut: '05:45 PM', hours: '9h 15m', status: 'On Time', color: 'tertiary' },
		{ id: 'AT-1006', name: 'Elena Gilbert', avatar: 'https://ui-avatars.com/api/?name=Elena+Gilbert&background=d8c0ce&color=251721', date: 'Oct 14, 2023', checkIn: '10:00 AM', checkOut: '04:00 PM', hours: '6h 00m', status: 'Half Day', color: 'primary' },
	];
</script>

<svelte:head>
	<title>Attendance Tracking | HRIS Dashboard</title>
</svelte:head>

<div class="flex flex-col h-full">
	<!-- Header & Actions -->
	<header class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
		<div>
			<h1 class="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Attendance & Time Tracking</h1>
			<p class="text-on-surface-variant font-medium text-sm">Monitor daily employee presence and working hours</p>
		</div>
		<div class="flex gap-3">
			<div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl flex items-center px-4 py-2 shadow-sm">
				<span class="material-symbols-outlined text-on-surface-variant mr-2">calendar_month</span>
				<span class="text-sm font-bold text-on-surface">Today, Oct 14, 2023</span>
				<span class="material-symbols-outlined text-on-surface-variant ml-2 text-sm">arrow_drop_down</span>
			</div>
			<button class="bg-primary text-on-primary px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm flex items-center gap-2 hover:bg-primary/90 transition-colors">
				<span class="material-symbols-outlined text-lg">download</span>
				Export
			</button>
		</div>
	</header>

	<!-- Quick Stats -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
		<div class="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border-l-4 border-tertiary">
			<p class="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-2">Present On Time</p>
			<h3 class="text-3xl font-black text-on-surface">854</h3>
		</div>
		<div class="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border-l-4 border-error">
			<p class="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-2">Late Arrivals</p>
			<h3 class="text-3xl font-black text-on-surface">42</h3>
		</div>
		<div class="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border-l-4 border-primary">
			<p class="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-2">Half Day / Remote</p>
			<h3 class="text-3xl font-black text-on-surface">18</h3>
		</div>
		<div class="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border-l-4 border-secondary">
			<p class="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-2">Absent / Leave</p>
			<h3 class="text-3xl font-black text-on-surface">28</h3>
		</div>
	</div>

	<!-- Search & Filters -->
	<div class="relative w-full lg:w-96 mb-6">
		<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
		<input 
			type="text" 
			placeholder="Search employee attendance..." 
			class="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium shadow-sm"
		/>
	</div>

	<!-- Attendance Table -->
	<div class="bg-surface-container-lowest rounded-[24px] shadow-sm flex-1 overflow-hidden flex flex-col">
		<div class="overflow-x-auto flex-1">
			<table class="w-full text-left border-collapse">
				<thead>
					<tr class="border-b border-surface-container sticky top-0 bg-surface-container-lowest z-10">
						<th class="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Employee</th>
						<th class="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Check In</th>
						<th class="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Check Out</th>
						<th class="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Total Hours</th>
						<th class="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Status</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-surface-container">
					{#each attendanceRecords as record}
						<tr class="group hover:bg-surface-container-low transition-colors">
							<td class="py-4 px-6">
								<div class="flex items-center gap-4">
									<div class="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-container-high group-hover:border-primary-container transition-colors">
										<img src={record.avatar} alt={record.name} class="w-full h-full object-cover" />
									</div>
									<div>
										<p class="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{record.name}</p>
										<p class="text-xs text-on-surface-variant font-medium mt-0.5">{record.id}</p>
									</div>
								</div>
							</td>
							<td class="py-4 px-6">
								<p class="text-sm font-bold text-on-surface {record.checkIn === '-' ? 'text-on-surface-variant opacity-50' : ''}">{record.checkIn}</p>
							</td>
							<td class="py-4 px-6">
								<p class="text-sm font-bold text-on-surface {record.checkOut === '-' ? 'text-on-surface-variant opacity-50' : ''}">{record.checkOut}</p>
							</td>
							<td class="py-4 px-6">
								<p class="text-sm font-bold text-on-surface">{record.hours}</p>
							</td>
							<td class="py-4 px-6">
								<span class="inline-flex items-center gap-1.5 bg-{record.color}-container/30 text-{record.color} text-xs font-bold px-3 py-1.5 rounded-full border border-{record.color}/20">
									<span class="w-1.5 h-1.5 rounded-full bg-{record.color}"></span> {record.status}
								</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
