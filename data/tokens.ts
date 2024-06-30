import { v4 as uuid } from "uuid";
import { getVerificationTokenByEmail } from "./verification-token";
import db from "@/lib/db";
import { getResetPasswordTokenByEmail } from "./reset-password-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({ where: { id: existingToken.id } });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generateResetPasswordToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getResetPasswordTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({ where: { id: existingToken.id } });
  }

  const resetPasswordToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return resetPasswordToken;
};
