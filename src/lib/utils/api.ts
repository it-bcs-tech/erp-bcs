// Base URL untuk backend Laravel nantinya
// Saat ini kita mock dulu, atau Anda bisa gunakan environment variable $env/static/public
const API_BASE_URL = 'http://localhost:8000/api/v1';

export interface ApiResponse<T> {
	status: 'success' | 'error';
	message?: string;
	data: T;
	meta?: any;
}

/**
 * Standard HTTP Fetch Wrapper
 * Digunakan agar semua request memiliki headers standar (termasuk Auth Token nantinya).
 * @param customFetch - pass the `fetch` function from SvelteKit's LoadEvent
 */
export async function apiFetch<T>(
	endpoint: string,
	options: RequestInit = {},
	customFetch: typeof fetch = fetch
): Promise<ApiResponse<T>> {
	const url = `${API_BASE_URL}${endpoint}`;
	
	// Default headers (misalnya untuk menyisipkan Bearer token)
	const headers = new Headers(options.headers || {});
	headers.set('Content-Type', 'application/json');
	headers.set('Accept', 'application/json');
	
	// TODO: Nanti tambahkan logika pengambilan token dari cookies/store di sini
	// headers.set('Authorization', `Bearer ${token}`);

	const response = await customFetch(url, { ...options, headers });
	
	// Untuk saat ini, jika API gagal (karena backend Laravel belum ada),
	// kita bisa handle atau membiarkan fetch SvelteKit menangkap errornya.
	if (!response.ok) {
		// Logika error handling
		console.warn(`API Error on ${url}: ${response.statusText}`);
		throw new Error(response.statusText);
	}

	return await response.json() as ApiResponse<T>;
}
