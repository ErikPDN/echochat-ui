"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema, SignupSchema } from "@/lib/schemas/auth";
import Link from "next/link";

export const SignupForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupSchema) => {
    // TODO: integrar com react-query para enviar os dados de cadastro para o backend
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4 border border-card-border rounded-2xl p-6 bg-card"
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="username"
          className="text-xs font-semibold text-zinc-300"
        >
          Username
        </label>
        <input
          {...register("username")}
          className="w-full border border-card-border rounded-xl p-3 bg-input-background focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs font-semibold text-zinc-300">
          Name
        </label>
        <input
          {...register("name")}
          className="w-full border border-card-border rounded-xl p-3 bg-input-background focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs font-semibold text-zinc-300">
          Email
        </label>
        <input
          {...register("email")}
          className="w-full border border-card-border rounded-xl p-3 bg-input-background focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="password"
          className="text-xs font-semibold text-zinc-300"
        >
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          className="w-full border border-card-border rounded-xl p-3 bg-input-background focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="confirmPassword"
          className="text-xs font-semibold text-zinc-300"
        >
          Confirm Password
        </label>
        <input
          {...register("confirmPassword")}
          type="password"
          className="w-full border border-card-border rounded-xl p-3 bg-input-background focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary p-3 rounded-lg text-white font-semibold hover:bg-primary-hover active:bg-primary-active transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Sign Up
      </button>

      <div className="flex justify-center mt-2">
        <span className="text-xs text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </span>
      </div>
    </form>
  );
};
