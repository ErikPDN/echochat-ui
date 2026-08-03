"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { signupSchema, SignupSchema } from "@/lib/schemas/auth";
import Link from "next/link";
import { getPasswordStrength } from "@/lib/utils/password-strength";
import { useEffect, useState } from "react";
import { useSignupMutation } from "@/lib/hooks/useSignupMutation";

const strengthConfig = [
  { label: "Very Weak", color: "bg-red-500" },
  { label: "Weak", color: "bg-orange-500" },
  { label: "Moderate", color: "bg-yellow-500" },
  { label: "Strong", color: "bg-green-500" },
  { label: "Very Strong", color: "bg-blue-500" },
];

export const SignupForm = () => {
  const { mutate: signupUser, isPending, error } = useSignupMutation();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const watchPassword = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  const strength = getPasswordStrength(watchPassword);
  const { label, color } = strengthConfig[strength];

  const onSubmit = (data: SignupSchema) => {
    signupUser(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-3 xl:gap-4 border border-card-border rounded-2xl p-4 xl:p-6 bg-card"
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
        {errors.username && (
          <span className="text-red-500 text-xs">
            {errors.username.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs font-semibold text-zinc-300">
          Name
        </label>
        <input
          {...register("name")}
          className="w-full border border-card-border rounded-xl p-3 bg-input-background focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.name && (
          <span className="text-red-500 text-xs">{errors.name.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs font-semibold text-zinc-300">
          Email
        </label>
        <input
          {...register("email")}
          className="w-full border border-card-border rounded-xl p-3 bg-input-background focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
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

        <div className={`flex gap-1 ${watchPassword ? "mt-2" : "mt-0"}`}>
          {watchPassword &&
            [0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={`h-1 w-full rounded-full transition-colors duration-200 ${
                  index <= strength ? color : "bg-card-border"
                }`}
              />
            ))}
        </div>
        {watchPassword && (
          <span className="text-xs text-zinc-400 mt-1">{label}</span>
        )}

        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}
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
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
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
