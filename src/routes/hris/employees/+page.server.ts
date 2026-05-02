import type { PageServerLoad } from './$types';
import type { Employee } from '$lib/types/hris';
// Nanti gunakan ini ketika backend Laravel sudah aktif:
// import { apiFetch } from '$lib/utils/api';

export const load: PageServerLoad = async ({ fetch }) => {
	
	// CONTOH KETIKA BACKEND SUDAH AKTIF:
	// try {
	// 	const response = await apiFetch<Employee[]>('/hris/employees', {}, fetch);
	// 	return { employees: response.data };
	// } catch (e) { ... }
	
	// SAAT INI (MOCK DATA)
	// Kita mensimulasikan delay network agar mirip fetching asli
	await new Promise(resolve => setTimeout(resolve, 300));

	const mockEmployees: Employee[] = [
		{ id: 'EMP-001', name: 'Sarah Jenkins', role: 'Head of Operations', department: 'Management', email: 'sarah.j@company.com', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=ffd7f1&color=57344f', color: 'primary' },
		{ id: 'EMP-002', name: 'Robert Chen', role: 'Senior Frontend Engineer', department: 'Engineering', email: 'robert.c@company.com', status: 'On Leave', avatar: 'https://ui-avatars.com/api/?name=Robert+Chen&background=f5dbea&color=57344f', color: 'secondary' },
		{ id: 'EMP-003', name: 'Alice Murray', role: 'UX Designer', department: 'Design', email: 'alice.m@company.com', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Alice+Murray&background=c0d5a0&color=112000', color: 'tertiary' },
		{ id: 'EMP-004', name: 'Kevin Durant', role: 'Backend Engineer', department: 'Engineering', email: 'kevin.d@company.com', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Kevin+Durant&background=ffdad6&color=93000a', color: 'error' },
		{ id: 'EMP-005', name: 'Marcus Thorne', role: 'Marketing Specialist', department: 'Marketing', email: 'marcus.t@company.com', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Marcus+Thorne&background=e9b8d9&color=2f1029', color: 'primary' },
		{ id: 'EMP-006', name: 'Elena Gilbert', role: 'Product Manager', department: 'Product', email: 'elena.g@company.com', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Elena+Gilbert&background=d8c0ce&color=251721', color: 'secondary' },
	];

	return {
		employees: mockEmployees
	};
};
