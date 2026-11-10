import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", placeholder: "type your email..." },
        password: { label: "password", placeholder: "type your password" },
      },
      //fire with login
      authorize: async (credentials) => {
        try {
          const res = await fetch(`${process.env.NEXT_BASE_URL}/auth/signin`, {
            method: "post",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "content-type": "application/json",
            },
          });

          const payload = await res.json();
          const userToken = jwtDecode<{ id: string }>(payload.token);

          if (!res.ok)
            throw new Error("incorrect email or password", payload.message);

          // user
          return {
            id: userToken.id,
            email: payload.user.email,
            name: payload.user.name,
            token: payload.token,
          };
        } catch (error) {
          throw (error as Error).message;
        }
      },
    }),
  
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }
      return token;
    },

    session: ({ session, token }) => {
      if (token) {
        session.user.name = token.name as string;
      }
      return session;
    },
  },

  pages: {
    error: "/api/auth/signin",
    signIn: "/login",
  },
};

// access token

//next token
