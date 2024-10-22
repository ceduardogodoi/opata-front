import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string(),
  API_URL: z.string().url(),
  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_COGNITO_CLIENT_ID: z.string(),
  AWS_COGNITO_CLIENT_SECRET: z.string(),
  AWS_COGNITO_USER_POOL_ID: z.string(),
});

export const env = EnvSchema.parse(process.env);
