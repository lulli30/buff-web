import * as bcrypt from "bcryptjs";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

// Higher cost factor = more secure but slower
const SALT_ROUNDS = 12;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const checkSession = async (userId: string): Promise<boolean> => {
  const userDoc = await getDoc(doc(db, "members", userId));
  return userDoc.exists();
};

export const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
