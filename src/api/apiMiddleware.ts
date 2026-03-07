import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// 1. Request Interceptor: Attach Token automatically
api.interceptors.request.use(async (config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  const session = await getSession();
  if (session && (session as any).accessToken) {
    config.headers.Authorization = `Bearer ${(session as any).accessToken}`;
  }
  return config;
}, (error) => Promise.reject(error));

// 2. Response Interceptor: Handle Session Expiry (401 Redirect)
api.interceptors.response.use(
  (response) => response.data, // Return data directly
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid -> Logout user
      await signOut({ redirect: true, callbackUrl: '/login' });
    }
    return Promise.reject(error);
  }
);

export default api;
