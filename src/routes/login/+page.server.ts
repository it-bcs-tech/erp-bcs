import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import { env } from '$env/dynamic/private';

// Menggunakan koneksi database postgres dari environment variable (lokal vs docker)
const sql = postgres(env.DATABASE_URL || 'postgres://bcs_admin:sangatrahasia@103.31.205.199:5433/mybcs_db');

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (!email || !password) {
			return fail(400, { email, error: 'Email and password are required' });
		}

		try {
			// Mencari pengguna di skema master, tabel m_presensi
			const users = await sql`
				SELECT id, name, email, password 
				FROM master.m_presensi 
				WHERE email = ${email}
				LIMIT 1
			`;

			if (users.length === 0) {
				return fail(400, { email, error: 'Invalid email or password' });
			}

			const user = users[0];

			// Memeriksa kecocokan password menggunakan bcrypt (karena Laravel umumnya menggunakan bcrypt)
			// Catatan: Jika Laravel menggunakan Argon2, kita perlu menyesuaikan ini.
			const isValidPassword = await bcrypt.compare(password, user.password);

			if (!isValidPassword) {
				return fail(400, { email, error: 'Invalid email or password' });
			}

			// Jika berhasil, setel cookie auth_token dengan ID pengguna untuk simulasi
			cookies.set('auth_token', `user_token_${user.id}`, {
				path: '/',
				httpOnly: false, // Diset false agar bisa diakses jika diperlukan dari sisi klien (hanya untuk simulasi)
				maxAge: 60 * 60 * 24 // 1 hari
			});

			return { success: true, userName: user.name };
		} catch (error) {
			console.error('Database connection error:', error);
			return fail(500, { email, error: 'Internal server error: ' + (error as Error).message });
		}
	}
} satisfies Actions;
