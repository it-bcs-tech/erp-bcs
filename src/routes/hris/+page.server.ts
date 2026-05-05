import postgres from 'postgres';
import type { PageServerLoad } from './$types';

const sql = postgres('postgres://bcs_admin:sangatrahasia@103.31.205.199:5433/mybcs_db');

export const load: PageServerLoad = async () => {
    try {
        // Menjalankan semua query secara bersamaan (parallel) untuk performa
        const [totalEmployeesData, presentTodayData, leaveRequestsData] = await Promise.all([
            sql`SELECT COUNT(*) FROM master.m_presensi WHERE is_active = true`,
            sql`SELECT COUNT(*) FROM presensi.presences WHERE date = CURRENT_DATE AND clock_in IS NOT NULL`,
            sql`SELECT COUNT(*) as total_requests, SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_requests FROM presensi.leaves`
        ]);

        const totalEmployees = parseInt(totalEmployeesData[0].count, 10) || 0;
        const presentToday = parseInt(presentTodayData[0].count, 10) || 0;
        
        const leaveRequestsRow = leaveRequestsData[0];
        const totalLeaveRequests = parseInt(leaveRequestsRow.total_requests, 10) || 0;
        const pendingLeaveRequests = parseInt(leaveRequestsRow.pending_requests, 10) || 0;

        // Menghitung persentase kehadiran (kapasitas)
        const attendanceCapacity = totalEmployees > 0 
            ? Math.round((presentToday / totalEmployees) * 100) 
            : 0;

        return {
            metrics: {
                totalEmployees,
                presentToday,
                attendanceCapacity,
                totalLeaveRequests,
                pendingLeaveRequests,
                openPositions: 15, // Sisa data mock
                highPriorityPositions: 4 // Sisa data mock
            }
        };
    } catch (error) {
        console.error('Gagal mengambil data metrik HRIS:', error);
        return {
            metrics: {
                totalEmployees: 0,
                presentToday: 0,
                attendanceCapacity: 0,
                totalLeaveRequests: 0,
                pendingLeaveRequests: 0,
                openPositions: 0,
                highPriorityPositions: 0
            }
        };
    }
};
