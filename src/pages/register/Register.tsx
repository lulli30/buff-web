import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const { user, signInWithGoogle, signUpWithEmail } = useAuth() as any;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  /**
   * Handles Google Sign-In and stores user in Firestore.
   */
  const handleGoogleRegister = async () => {
    try {
      setIsLoading(true);
      const signedInUser = await signInWithGoogle();
      if (!signedInUser || !signedInUser.uid)
        throw new Error("Google sign-in failed.");

      await storeUserInFirestore(signedInUser);
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Google Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles Email/Password Sign-Up and stores user in Firestore.
   */
  const handleEmailRegister = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    try {
      setIsLoading(true);
      const registeredUser = await signUpWithEmail(email, password, fullName); // Pass fullName
      if (!registeredUser || !registeredUser.uid)
        throw new Error("Email sign-up failed.");

      await storeUserInFirestore({ ...registeredUser, fullName });
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Email Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Stores user data in Firestore if they don’t exist.
   */
  const storeUserInFirestore = async (user: any) => {
    const { uid, displayName, email, photoURL } = user;
    const memberRef = doc(db, "members", uid);
    const memberSnapshot = await getDoc(memberRef);

    if (!memberSnapshot.exists()) {
      await setDoc(memberRef, {
        uid,
        fullName: displayName || "Anonymous",
        email,
        photoURL: photoURL || "",
        createdAt: new Date(),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-teal-950/30 text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block bg-teal-500/10 p-3 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-teal-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12A4 4 0 118 12a4 4 0 018 0zM12 14v6m-6 0h12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Join BUFF</h1>
          <p className="text-gray-400 mt-1">
            Create your account and start your fitness journey
          </p>
        </div>

        <RegisterForm
          handleGoogleRegister={handleGoogleRegister}
          handleEmailRegister={handleEmailRegister}
        />

        <div className="text-center mt-8">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-teal-400 hover:text-teal-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <footer className="mt-16 text-sm text-gray-500 text-center">
        <p>© 2025 FitTrack Pro. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a
            href="#"
            className="text-gray-500 hover:text-teal-400 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-teal-400 transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-teal-400 transition-colors"
          >
            Help
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Register;
