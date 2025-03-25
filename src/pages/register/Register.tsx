import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import RegisterForm from "./RegisterForm";

// Enhanced UserData interface
interface UserData {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  fullName?: string;
}

const Register = () => {
  const { user, signInWithGoogle, signUpWithEmail } = useAuth() as any;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleGoogleRegister = async () => {
    try {
      setIsLoading(true);
      const signedInUser = await signInWithGoogle();
      if (!signedInUser || !signedInUser.uid)
        throw new Error("Google sign-in failed.");

      await storeUserInFirestore({
        ...signedInUser,
        fullName: signedInUser.displayName || "Google User",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Google Registration failed:", error);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailRegister = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    try {
      if (!fullName.trim()) {
        throw new Error("Full name is required");
      }

      setIsLoading(true);
      setError(null);

      const registeredUser = await signUpWithEmail(email, password, fullName);
      if (!registeredUser || !registeredUser.uid) {
        throw new Error("Email sign-up failed.");
      }

      // Explicitly create user data object
      const userData = {
        uid: registeredUser.uid,
        email: registeredUser.email || email,
        fullName: fullName, // Directly use the provided fullName
        photoURL: registeredUser.photoURL || "",
        displayName: fullName, // Also set displayName for consistency
      };

      await storeUserInFirestore(userData);
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Email Registration failed:", error);
      setError(
        (error as any).message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const storeUserInFirestore = async (user: UserData) => {
    try {
      const { uid, fullName, email, photoURL } = user;

      if (!uid) {
        throw new Error("User ID is missing");
      }

      const memberRef = doc(db, "members", uid);
      const memberSnapshot = await getDoc(memberRef);
      console.log("Before Firestore:", { fullName, email, uid });

      if (!memberSnapshot.exists()) {
        await setDoc(
          memberRef,
          {
            uid,
            fullName: fullName || "Anonymous", // Only fallback if fullName is missing
            email: email || "",
            photoURL: photoURL || "",
            createdAt: new Date(),
            lastUpdated: new Date(),
          },
          { merge: true }
        );
      } else {
        // Update existing user if needed
        await setDoc(
          memberRef,
          {
            fullName:
              fullName || memberSnapshot.data()?.fullName || "Anonymous",
            lastUpdated: new Date(),
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.error("Error storing user in Firestore:", error);
      throw error;
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

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 text-red-300 rounded-md text-sm">
            {error}
          </div>
        )}

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
