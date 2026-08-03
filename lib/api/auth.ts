import { LoginSchema, SignupSchema } from "../schemas/auth";
import { AuthResponse } from "../types/auth-reponse";

async function handleResponse(res: Response): Promise<AuthResponse> {
  const body = await res.json();
  if (!res.ok) {
    const err = body as AuthErrorBody;
    throw new Error(Array.isArray(err.message) ? err.message[0] : err.message);
  }
  return body as AuthResponse;
}

export async function login(data: LoginSchema): Promise<AuthResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

export async function signup(data: SignupSchema): Promise<AuthResponse> {
  const { confirmPassword, ...payload } = data;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}
