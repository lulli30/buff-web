import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { firebaseApp } from "../../firebaseConfig";
import { db } from "../../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export const authStateListener = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    console.log("🔥 Firebase auth state changed:", user);
    callback(user);
  });
};

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    provider.setCustomParameters({ prompt: "select_account" });
    const result = await signInWithPopup(auth, provider);
    console.log("✅ Signed in with Google:", result.user);
    await storeUserInFirestore(result.user);
    return result.user;
  } catch (error) {
    console.error("❌ Google Sign-In Error:", error);
    throw error;
  }
};

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ Signed in with Email:", result.user);
    return result.user;
  } catch (error) {
    console.error("❌ Email Sign-In Error:", error);
    throw error;
  }
};

export const signUpWithEmail = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log("✅ Account created:", result.user);
    await storeUserInFirestore(result.user);
    return result.user;
  } catch (error) {
    console.error("❌ Sign-Up Error:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("🚪 Signed out");
  } catch (error) {
    console.error("❌ Logout Error:", error);
    throw error;
  }
};

const storeUserInFirestore = async (user: User): Promise<void> => {
  if (!user?.uid) return;

  const userRef = doc(db, "members", user.uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      fullName: user.displayName || "Anonymous",
      email: user.email,
      photoURL: user.photoURL || "",
      createdAt: new Date(),
    });
    console.log("📄 User stored in Firestore:", user.uid);
  }
};
