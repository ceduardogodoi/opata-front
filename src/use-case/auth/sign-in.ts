import { z } from "zod";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { type InitiateAuthCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { env } from "@/env";

type Credentials = Record<"email" | "password", string>;

const SignInResponseSchema = z.custom<InitiateAuthCommandOutput>();

export class SignInUseCase {
  static async execute(
    credentials: Credentials
  ): Promise<InitiateAuthCommandOutput | null> {
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
    const result = SignInResponseSchema.safeParse(data);
    if (result.error != null) return null;

    if (result.data.AuthenticationResult?.AccessToken == null) return null;

    const verifier = CognitoJwtVerifier.create({
      userPoolId: env.AWS_COGNITO_USER_POOL_ID,
      tokenUse: "access",
      clientId: env.AWS_COGNITO_CLIENT_ID,
    });

    try {
      await verifier.verify(result.data.AuthenticationResult.AccessToken);

      return result.data;
    } catch {
      console.error("Token not valid!");

      return null;
    }
  }
}
