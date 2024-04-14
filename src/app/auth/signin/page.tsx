"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "@/schemas/signinSchema";
import { Label } from "@/components/ui/auth/label";
import { Input } from "@/components/ui/auth/input";
import { cn } from "@/utils/cn";
import { loginUser } from "@/actions/loginUser";
import zod from "zod";

type FormData = zod.infer<typeof signinSchema>;

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("onSubmit called", data);
    try {
      console.log("onSubmit called", data);
      const result: any = await loginUser(data);

      console.log("result in signin", result);

      if (result?.error) {
        console.error("Error logging in", result.error);
        alert("Error logging in");
        reset();
        return;
      }

      alert("Logged in successfully");

      reset();

      return;
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center ">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 dark:shadow-[0px_0px_2px_2px_#bb9bf2] bg-white dark:bg-black min-h-[50vh]">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
          Log in to Job Scouter
        </h2>
        <form
          className="my-8"
          onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
        >
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

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium "
            type="submit"
          >
            Log in &rarr;
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
