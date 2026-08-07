export interface AuthErrorBody {
  message: string | string[];
  error?: string;
  statusCode: number;
}
