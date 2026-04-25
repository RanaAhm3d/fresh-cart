import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import { API_BASE_URL } from "@/services/api";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        try {
          const response = await fetch(`${API_BASE_URL}/auth/signin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          const data = await response.json();

          if (!response.ok)
            throw new Error(data.message || "Invalid email or password");

          const decoded = jwtDecode<DecodedToken>(data.token);

          return {
            id: decoded.id,
            email: data.user.email,
            name: data.user.name,
            role: data.role,
            accessToken: data.token,
          };
        } catch (error) {
          throw new Error((error as Error).message);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },

  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = user.accessToken;

        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }

      if (trigger === "update" && session) {
        token.user = {
          ...token.user,
          ...session,
        };
      }

      return token;
    },

    session({ session, token }) {
      if (token) {
        session.user = token.user;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
