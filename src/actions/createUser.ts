"use server";

import { z } from "zod";
import { db } from "@/libs/db";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/schemas/signupSchema";

export const createUser = async (data: z.infer<typeof signupSchema>) => {
    try {
        //validate with zod
        const result = signupSchema.safeParse(data);
        if (!result.success) {
            return { error: result.error.message };
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await db.user.create({
            data: {
                name: data.username,
                email: data.email,
                password: hashedPassword,
                resumeWords: [],
                isOAuth: false,
            },
        });
        return { success: user };
    } catch (error: any) {
        return { error: error.message };
    }
};