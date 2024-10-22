import { env } from "@/env";
import { SignInUseCase } from "@/use-case/auth/sign-in";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  debug: env.NODE_ENV !== "production",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        const data = await SignInUseCase.execute(credentials);
        if (data?.AuthenticationResult?.AccessToken != null) {
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
