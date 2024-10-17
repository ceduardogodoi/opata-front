import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production"], {
    description: "Node Environment.",
    required_error: "NODE_ENV variable is required.",
  }),
  NEXTAUTH_URL: z
    .string({
      description: "NextAuth URL.",
      required_error: "NEXTAUTH_URL variable is required.",
    })
    .url(),
  NEXTAUTH_SECRET: z.string({
    description: "NextAuth Secret.",
    required_error: "NEXTAUTH_SECRET variable is required.",
  }),
  API_URL: z
    .string({
      description: "Backend base URL.",
      required_error: "API_URL variable is required.",
    })
    .url(),
});

export const env = EnvSchema.parse(process.env);
