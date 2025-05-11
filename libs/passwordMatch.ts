import bcrypt from "bcryptjs";

export const passswordMatch = async (currentPassword: string, storedPassword: string) => {
    const mach = await bcrypt.compare(currentPassword, storedPassword);
    return mach;
}