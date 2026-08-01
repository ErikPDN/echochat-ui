import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      <h2 className="text-sm font-normal mb-4 text-zinc-500">
        Create an account
      </h2>
      <SignupForm />
    </div>
  );
}
