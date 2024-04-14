import CredentialsProvider from "next-auth/providers/credentials"
import { signinSchema } from "./schemas/signinSchema";
import { db } from "./libs/db";
import bcrypt from "bcryptjs";

const authConfig = {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                console.log("credentials in next auth", credentials);

                const { email, password }: any = credentials;

                const user = await db.user.findUnique({
                    where: {
                        email,
                    },
                });

                console.log(user);

                if (!user) {
                    return null;
                }

                const passwordValid = await bcrypt.compare(password, user.password);


                if (passwordValid) {
                    console.log("passwordValid - returning user", passwordValid);
                    return user;
                }

                return null;
            }
        }),
    ],
}

export default authConfig
