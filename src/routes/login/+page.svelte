<script lang="ts">
	import { enhance } from '$app/forms';
	
	let { form } = $props();

	// Login state
	let email = form?.email ?? '';
	let password = '';
	let showPassword = false;
	let isLoading = false;
	let showSuccess = false;
</script>

<svelte:head>
	<title>Login | Nexus ERP</title>
</svelte:head>

<div class="flex-1 flex flex-col items-center justify-center selection:bg-primary-fixed selection:text-on-primary-fixed w-full relative min-h-screen">
	<!-- Subtle Architectural Background Element -->
	<div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
		<div class="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] opacity-20 transform -rotate-12">
			<img class="w-full h-full object-cover" alt="Architectural blueprint" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK3sQXI4SU1QBqm_EnhbtPj6y9F59UML03a6BRzMF4Vlhcp2HImWuFDS4hsquqFfvnYhlkRp_MMAqKW5FKyVA6lFqxQb6Zlj5V7XUPpVWKayhME8seeP7MrIuesAs6zCRIk00o5bnpdLN3k9omV6FJBSdAQcJl_zZ28G4bsKLJsXFWXnF0gzFDFLbD33hTM1QPlmzjSiHvhDSHx-9_BA9vg5AMXv9yaUn_NKAvgs7zr3DgxAwg6-WSppPVagmlZXGeY9OVmzVq7Do"/>
		</div>
		<div class="absolute bottom-[-5%] right-[-5%] w-[30%] h-[50%] opacity-10 transform rotate-12">
			<img class="w-full h-full object-cover" alt="Skyscraper facade" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFxDNLUOfpHURYBKXSNEwbO-Wkxzxt9T2axqyKyVgfir8MJFGfTjn57Q3RKYBptKNnqlxRhAMiaA-IXGq8N3VXq9PHLiaT-hLXMPP7cjR6lTbQgmnDOFfGrgELHfkMuFHN5yXvvfnXhCHkTMQVKKD6bsA0ldyHsO4Co9fPUeqnPU5IwG0ACieAygkFIZHmmKBQfEN_uTgzn6JcitRo8SJZhHPGGUJ4F2Ez8dcdOXB8BPCfOeH_HeACoDo_PwWPyd4Zm1PvpdLk7HY"/>
		</div>
	</div>

	<main class="relative z-10 w-full max-w-md px-6 py-12">
		<!-- Login Card -->
		<div class="bg-surface-container-lowest rounded-[24px] p-10 ambient-shadow flex flex-col items-center space-y-8">
			<!-- Brand Identity -->
			<div class="text-center space-y-4">
				<div class="flex flex-col items-center gap-3">
					<div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-sm">
						<span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">architecture</span>
					</div>
					<span class="text-2xl font-manrope font-extrabold tracking-tight text-primary">Nexus ERP</span>
				</div>
				<h1 class="text-2xl font-manrope font-bold text-on-surface">Welcome to Nexus ERP</h1>
				<p class="text-on-surface-variant text-sm">Please enter your credentials to access the workspace</p>
			</div>

			<!-- Form -->
			<form class="w-full space-y-5" method="POST" use:enhance={() => {
				isLoading = true;
				return async ({ result, update }) => {
					isLoading = false;
					if (result.type === 'success') {
						showSuccess = true;
						setTimeout(() => {
							window.location.href = '/';
						}, 1500);
					} else {
						await update();
					}
				};
			}}>
				<!-- Error Message -->
				{#if form?.error}
					<div class="p-3 bg-error-container text-on-error-container rounded-lg text-sm font-semibold flex items-center gap-2">
						<span class="material-symbols-outlined text-sm">error</span>
						{form.error}
					</div>
				{/if}

				<div class="space-y-1.5 text-left w-full">
					<label class="block text-xs font-bold text-on-surface-variant uppercase tracking-wider pl-1" for="email">Work Email</label>
					<input 
						class="w-full px-4 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary-container text-on-surface placeholder:text-outline/50 transition-all text-sm" 
						id="email" 
						name="email"
						placeholder="name@company.com" 
						type="email"
						value={form?.email ?? ''}
						required
					/>
				</div>
				<div class="space-y-1.5 text-left w-full">
					<div class="flex justify-between items-center px-1">
						<label class="block text-xs font-bold text-on-surface-variant uppercase tracking-wider" for="password">Password</label>
						<a class="text-xs font-semibold text-primary hover:underline transition-all" href="#">Forgot Password?</a>
					</div>
					<div class="relative">
						<input 
							class="w-full px-4 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary-container text-on-surface placeholder:text-outline/50 transition-all text-sm" 
							id="password" 
							name="password"
							placeholder="••••••••" 
							type={showPassword ? "text" : "password"}
							required
						/>
						<button 
							class="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary p-1 rounded-md transition-colors" 
							type="button"
							onclick={() => showPassword = !showPassword}
						>
							<span class="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
						</button>
					</div>
				</div>
				<button 
					class="w-full py-4 px-6 bg-gradient-to-br from-primary to-primary-container text-white font-manrope font-bold rounded-full ambient-shadow hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed" 
					type="submit"
					disabled={isLoading}
				>
					{#if isLoading}
						<span class="material-symbols-outlined text-lg animate-spin">progress_activity</span>
						Authenticating...
					{:else}
						Sign In
						<span class="material-symbols-outlined text-lg">arrow_forward</span>
					{/if}
				</button>
			</form>

			<!-- Divider -->
			<div class="w-full flex items-center gap-4 py-2">
				<div class="h-[1px] flex-1 bg-outline-variant/20"></div>
				<span class="text-[10px] font-bold text-outline uppercase tracking-widest">or continue with</span>
				<div class="h-[1px] flex-1 bg-outline-variant/20"></div>
			</div>

			<!-- Social Logins -->
			<div class="w-full grid grid-cols-2 gap-4">
				<button class="flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-highest text-on-surface font-semibold rounded-xl hover:bg-surface-container transition-colors shadow-sm">
					<img class="w-5 h-5 grayscale opacity-80" alt="Google" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsmTstDcuKobq_VIiQ0z4bF64KcvNJCE3ns3YTW_EMKXKDH4lw0fNz2VfhM8JcDck3h5h2Z9AfQgKFYWixUWwjhj-H_AysJykk80l_ZCAB6OwuxwVf-0sL6S6QDjYn5i7YjuCDo45u1pKLjIZOiQ9d_TOtW0o1sfQv4jhIHN6evQG7ZCu9q8kqSE_VgaGomdyijlkvmUkwSjdvOIKE-hFbUnksdx0dAKTW9Sx8KhLhjTuIDVPtt1ays7ppMxV8XoCfM0twl1BU67I"/>
					<span class="text-sm">Google</span>
				</button>
				<button class="flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-highest text-on-surface font-semibold rounded-xl hover:bg-surface-container transition-colors shadow-sm">
					<svg class="w-5 h-5 text-on-surface-variant opacity-80" fill="currentColor" viewBox="0 0 23 23"><path d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z"></path></svg>
					<span class="text-sm">Microsoft</span>
				</button>
			</div>
		</div>

		<!-- Secondary Navigation (Footer) -->
		<footer class="mt-8 flex flex-col items-center space-y-4">
			<div class="flex items-center gap-6">
				<a class="text-sm font-medium text-on-surface-variant hover:text-primary flex items-center gap-2 transition-colors" href="#">
					<span class="material-symbols-outlined text-base">verified_user</span>
					Security Architecture
				</a>
				<div class="w-1 h-1 rounded-full bg-outline-variant"></div>
				<a class="text-sm font-medium text-on-surface-variant hover:text-primary flex items-center gap-2 transition-colors" href="#">
					<span class="material-symbols-outlined text-base">support_agent</span>
					Contact Support
				</a>
			</div>
			<p class="text-xs text-outline font-medium">© 2024 Nexus Digital Architect ERP. All rights reserved.</p>
		</footer>
	</main>

	<!-- Success Feedback Overlay -->
	{#if showSuccess}
	<div class="fixed inset-0 z-50 glass-effect flex items-center justify-center transition-all duration-300">
		<div class="bg-surface-container-lowest p-12 rounded-[32px] ambient-shadow text-center max-w-sm transform scale-100 animate-in zoom-in duration-300">
			<div class="w-20 h-20 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
				<span class="material-symbols-outlined text-5xl">check_circle</span>
			</div>
			<h2 class="text-2xl font-manrope font-extrabold text-on-surface mb-2">Access Granted</h2>
			<p class="text-on-surface-variant font-medium">Synchronizing your architectural workspace...</p>
		</div>
	</div>
	{/if}
</div>

<style>
	.font-manrope { font-family: 'Manrope', sans-serif; }
	.ambient-shadow { box-shadow: 0 12px 32px -4px rgba(25, 28, 30, 0.06); }
	.glass-effect {
		background-color: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(20px);
	}
</style>
