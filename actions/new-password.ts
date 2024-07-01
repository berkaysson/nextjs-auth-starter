"use server";

import { getResetPasswordTokenByToken } from "@/data/reset-password-token";
import { getUserByEmail } from "@/data/user";
import db from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";
const bcrypt = require("bcryptjs");

export const newPassword = async (
  data: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { message: "Invalid token" };
  }

  const validatedFields = NewPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return { message: "Invalid fields!" };
  }

  const existingToken = await getResetPasswordTokenByToken(token);

  if (!existingToken) {
    return { message: "Token does not exist!" };
  }

  if (new Date() > new Date(existingToken.expires)) {
    return { message: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { message: "User does not exist!" };
  }

  const { password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { message: "Password changed successfully" };
};
