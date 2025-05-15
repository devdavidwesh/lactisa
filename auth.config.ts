import { CredentialsSignin, type NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas/login";
import { getUserByEmail } from "./libs/users";
import bcrypt from "bcryptjs";
import { getTwoFactorTokenByEmail } from "./data/two-factor-token";

export default { 
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedData = LoginSchema.safeParse(credentials);

                if (!validatedData.success) {
                    throw new CredentialsSignin("Invalid Credentials");
                }
                    const { email, password, code } = validatedData.data;
                    const normalizedEmail = email.toLowerCase()

                    const user = await getUserByEmail(normalizedEmail);
                    if (!user) {
                        throw new CredentialsSignin("Invalid Credentials");
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {
                        throw new CredentialsSignin("Invalid Credentials");
                    }

                    const twoFactorToken = await getTwoFactorTokenByEmail(normalizedEmail);
                    if (twoFactorToken?.token !== code) {
                        throw new CredentialsSignin("Invalid Credentials");
                    }
                    
                    return user
                }
            })               
    ] 

} satisfies NextAuthConfig