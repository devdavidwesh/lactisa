import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authconfig from "./auth.config";
import { db } from "./prisma";
import { getUserById } from "./libs/users";
import { encode, decode } from "next-auth/jwt";

type UserRole = "ADMIN" | "USER"

export const { auth, handlers, signIn, signOut }  = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async signIn({user}) {
      const existingUser = await getUserById(user.id!);
      if(existingUser?.status === "INACTIVE") return false;

      return true;
    },


    async jwt ({token}) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role

      return token;
    },

    async session ({token, session}) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      return session
    },
  },

  jwt: {
    encode: async (params) => encode(params),
    decode: async (params) => decode(params),
},

  ...authconfig,
});

export const runtime = "nodejs";

