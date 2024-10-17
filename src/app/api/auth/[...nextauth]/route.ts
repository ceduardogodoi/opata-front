import { env } from "@/env";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  debug: env.NODE_ENV !== "production",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "E-mail",
          type: "email",
          placeholder: "john@gmail.com",
        },
        password: {
          label: "Senha",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        const response = await fetch(`${env.API_URL}/sign-in`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await response.json();

        if (data["AuthenticationResult"]["AccessToken"] != null) {
          return {
            id: "1",
            name: "Carlos Godoi",
            email: "carloseduardoalvesgodoi@gmail.com",
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
