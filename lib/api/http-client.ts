import axios from "axios";
import { useAuthStore } from "../store/auth-store";
import { AuthResponse } from "../types/auth-response";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

httpClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<AuthResponse> | null = null;

export const refreshAccessToken = async (): Promise<AuthResponse> => {
  const baseUrl = httpClient.defaults.baseURL;
  const response = await axios.post<AuthResponse>(
    `${baseUrl}/auth/refresh`,
    {},
    { withCredentials: true },
  );

  return response.data;
};

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthEndpoint = [
      "/auth/login",
      "/auth/signup",
      "/auth/refresh",
    ].some((path) => originalRequest.url?.includes(path));

    if (
      error.response?.status !== 401 ||
      isAuthEndpoint ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise ??= refreshAccessToken();
      const { accessToken } = await refreshPromise;
      refreshPromise = null;

      useAuthStore.getState().setAccessToken(accessToken);
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return httpClient(originalRequest);
    } catch (refreshError) {
      refreshPromise = null;
      useAuthStore.getState().clearSession();
      return Promise.reject(refreshError);
    }
  },
);
