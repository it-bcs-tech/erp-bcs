export interface Employee {
	id: string;
	name: string;
	role: string;
	department: string;
	email: string;
	status: 'Active' | 'On Leave';
	avatar: string;
	color: string;
}

// Tambahkan interface lain di sini nantinya jika diperlukan, misalnya LeaveRequest, AttendanceLog, dll.
