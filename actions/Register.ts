"use server"

import { getUserByEmail, getUserByPhone } from '@/libs/users';
import { db } from '@/prisma';
import { registerSchema } from '@/schemas/register';
import bcrypt from 'bcryptjs';
import z from 'zod';

type registerUserData = z.infer<typeof registerSchema>

export default async function RegisterUser(registerData: registerUserData) {
    const validatedData = registerSchema.safeParse(registerData);

    if (!validatedData.success){
        const errorMessages = validatedData.error.errors.map((err) => err.message).join(", ");
        return { error: `Validation failed: ${errorMessages}` }
    }

    const { firstName, secondName, phone, email, school, course, password, schoolType, constituency, registrationNumber, year } = validatedData.data;
    const fullName = firstName + " " + secondName;
    const normalizedEmail = email.toLowerCase();

    const existingEmail = await getUserByEmail(normalizedEmail);
    if (existingEmail) {
        return { error: "Email is already registered" }
    }

    const existingPhone = await getUserByPhone(phone);
    if (existingPhone) {
        return { error: "Phone number is already registered" }
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const newUser = await db.user.create({
        data: {
            name: fullName,
            phone,
            email: normalizedEmail,
            schoolType,
            constituency,
            registrationNumber,
            year,
            password: hashedPassword,
            school,
            course,
        },
    });

    if (!newUser) {
        return { error: "Something went wrong. Please try again" }
    }

    return { success: "Your account has been created, One of our representatives will contact you to activate the account." }
   
}