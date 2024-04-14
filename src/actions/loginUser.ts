"use server";

import { z } from "zod";
import { db } from "@/libs/db";
import { signinSchema } from "@/schemas/signinSchema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const loginUser = async (data: z.infer<typeof signinSchema>) => {
    const result = signinSchema.safeParse(data);
    if (!result.success) {
        return { error: "Invalid data" };

    }

    console.log("result in server action", result.data);

    const { email, password } = result.data;
    const user = await db.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        return {
            error: "User not found",
        };
    }

    const result1 = await signIn("credentials", {
        email,
        password,
        redirectTo: "/",
    });
};
