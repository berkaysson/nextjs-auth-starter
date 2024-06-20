"use server";

import { LoginSchema } from "@/schemas";
import { z } from "zod";

export const login = (data: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Email sent!" };
};
