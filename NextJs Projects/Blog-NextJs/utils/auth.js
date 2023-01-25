import { compare, hash } from "bcryptjs";

export const encryptString = async (string) => {
  const hashedString = await hash(string, 12);
  return hashedString;
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
