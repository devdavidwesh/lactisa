"use server"

import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import { sendVerificationCode } from "@/libs/mailing"
import { generateVerificationCode } from "@/libs/tokens"
import { getUserByEmail } from "@/libs/users"
import { LoginSchema } from "@/schemas/login"
import bcrypt from "bcryptjs"
import { z } from "zod"

type LoginData = z.infer<typeof LoginSchema>

export const Login = async (LoginDetails: LoginData) => {
    const validatedData = LoginSchema.safeParse(LoginDetails);

    if (!validatedData.success) {
        const errorMessages = validatedData.error.errors.map((err) => err.message).join(", ");
        return {error: `Validation failed: ${errorMessages}`}
    }

    const { email, password, code } = validatedData.data;
    const normalizedEmail = email.toLowerCase();
    const existingUser = await getUserByEmail(normalizedEmail);

    if (!existingUser) {
        return{ error: `Invalid Credentials` }
    }

    if (existingUser.role === "USER") return;

    const passwordMatch = await bcrypt.compare(password, existingUser.password)
    if (!passwordMatch) {
        return { error: `Invalid Credentials` }
    }

     if (!code) {
            
            const verificationCode = await generateVerificationCode(existingUser.email);
            await sendVerificationCode(existingUser.email, verificationCode.token);
            return { showTwoFactor: true }
          }

          // Verify the 2FA code
          const twoFactorToken = await getTwoFactorTokenByEmail(normalizedEmail);
          
          if (!twoFactorToken) {
            return {error: `Code not found`}
          }

          if (twoFactorToken.token !== code) {
            return { error: `Invalid Code` }
          }

          const hasExpired = new Date(twoFactorToken.expires) < new Date();
          if (hasExpired) {
            return { error: `Code expired` }
          }
}