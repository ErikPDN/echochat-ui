import { LoginSchema, SignupSchema } from "../schemas/auth";
import { AuthResponse } from "../types/auth-response";
import { PublicUserResponse } from "../types/public-user.response";
import { httpClient, refreshAccessToken } from "./http-client";

export { refreshAccessToken };

export const login = async (data: LoginSchema) => {
  const response = await httpClient.post<AuthResponse>("/auth/login", data);
  return response.data;
};

export const signup = async (data: SignupSchema) => {
  const { confirmPassword, ...payload } = data;
  const response = await httpClient.post<AuthResponse>("/auth/signup", payload);
  return response.data;
};

export const getMe = async (): Promise<AuthResponse["user"]> => {
  const response = await httpClient.get<AuthResponse["user"]>("/auth/me");
  return response.data;
};

export const logout = async () => {
  await httpClient.post("/auth/logout");
};

export const findByUsername = async (
  username: string,
): Promise<PublicUserResponse> => {
  const response = await httpClient.get(`/auth/users/username/${username}`);
  return response.data;
};
