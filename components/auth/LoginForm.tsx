"use client";

import { loginSchema, LoginSchema } from "@/lib/schemas/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    // TODO: integrar com react-query para enviar os dados de login para o backend
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4 border border-card-border rounded-2xl p-6 bg-card"
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="identifier"
          className="text-xs font-semibold text-gray-300"
        >
          Username or Email
        </label>
        <input
          {...register}
          placeholder="yourusername"
          className="w-full border border-card-border rounded-xl p-3 bg-[#0D0D0D] focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.identifier && (
          <span className="text-red-500 text-xs">
            {errors.identifier.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="password"
          className="text-xs font-semibold text-gray-300"
        >
          Password
        </label>
        <input
          {...register}
          type="password"
          className="w-full justify-center border border-card-border rounded-xl p-3 bg-[#0D0D0D] focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}

        <div className="flex justify-end mt-2">
          <Link
            href="/forgot-password"
            className="text-xs text-primary font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary p-3 rounded-lg text-white font-semibold hover:bg-primary-hover active:bg-primary-active transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Login
      </button>

      <div className="flex justify-center mt-2">
        <span className="text-xs text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-primary font-medium hover:underline"
          >
            Sign Up
          </Link>
        </span>
      </div>
    </form>
  );
};
