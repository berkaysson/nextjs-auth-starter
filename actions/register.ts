"use server";

import { generateVerificationToken } from "@/data/tokens";
import { getUserByEmail } from "@/data/user";
import db from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
const bcrypt = require("bcryptjs");

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Email Sent" };
};
