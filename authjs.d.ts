import { type DefaultSession } from "next-auth";

type UserRole = "ADMIN" | "USER"

// ✅ Custom user session type
export type ExtendedUser = DefaultSession["user"] & {
    id: string;
    role: UserRole;
};

// ✅ Extend Session interface
declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}

// ✅ Extend JWT interface
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}






// import { type DefaultSession } from "next-auth";
// import { UserRole } from "@prisma/client";

// export type ExtendedUser = DefaultSession["user"] & {
//     id: string;
//     role: UserRole,
// };

// declare module "next-auth" {
//     interface Session {
//         user: ExtendedUser,
//     }
// }
