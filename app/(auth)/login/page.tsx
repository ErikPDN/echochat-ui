import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      <h2 className="text-sm font-normal mb-4 text-zinc-500">Welcome back</h2>

      <LoginForm />
    </div>
  );
}
