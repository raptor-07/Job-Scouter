"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schemas/signupSchema";
import { Label } from "@/components/ui/auth/label";
import { Input } from "@/components/ui/auth/input";
import { cn } from "@/utils/cn";
import { createUser } from "@/actions/createUser";
import zod from "zod";

type FormData = zod.infer<typeof signupSchema>;

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("onSubmit called", data);
    try {
      const result: any = await createUser(data);

      if (result.error) {
        console.error("Error creating user", result.error);
        alert("Error creating user");
        return;
      }

      alert("User created successfully");

      reset();

      return;
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center ">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 dark:shadow-[0px_0px_2px_2px_#bb9bf2] bg-white dark:bg-black min-h-[50vh]">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
          Create your account on Job Scouter
        </h2>
        <form
          className="my-8"
          onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
        >
          <LabelInputContainer className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              type="text"
              {...register("username")}
            />
            {errors.username && (
              <p
                style={{
                  color: "#fc382d",
                  fontWeight: "bold",
                  textShadow: "10px 10px 20px rgba(0,0,0,0.5)",
                  fontSize: "0.8rem",
                }}
              >
                {errors.username.message}
              </p>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="NrnMurthy@infy.com"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p
                style={{
                  color: "#fc382d",
                  fontWeight: "bold",
                  textShadow: "10px 10px 20px rgba(0,0,0,0.5)",
                  fontSize: "0.8rem",
                }}
              >
                {errors.email.message}
              </p>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p
                style={{
                  color: "#fc382d",
                  fontWeight: "bold",
                  textShadow: "10px 10px 20px rgba(0,0,0,0.5)",
                  fontSize: "0.8rem",
                }}
              >
                {errors.password.message}
              </p>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="confirm-password">Confirm password</Label>
            <Input
              id="confirm-password"
              placeholder="••••••••"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p
                style={{
                  color: "#fc382d",
                  fontWeight: "bold",
                  textShadow: "10px 10px 20px rgba(0,0,0,0.5)",
                  fontSize: "0.8rem",
                }}
              >
                {errors.confirmPassword.message}
              </p>
            )}
          </LabelInputContainer>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium "
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-purple-600 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
