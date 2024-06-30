"use server";

import { generateResetPasswordToken } from "@/data/tokens";
import { getUserByEmail } from "@/data/user";
import { sendResetPasswordEmail } from "@/lib/mail";
import { ResetSchema } from "@/schemas";
import * as z from "zod";

export const reset = async (data: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email } = validatedFields.data;
  const user = await getUserByEmail(email);
  if (!user) {
    return { error: "Email does not exist!" };
  }

  const resetPasswordToken = await generateResetPasswordToken(email);
  await sendResetPasswordEmail(
    resetPasswordToken.email,
    resetPasswordToken.token
  );

  return { success: "Email Sent" };
};
