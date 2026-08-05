export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    username: string;
    name: string;
    email: string;
  };
}
