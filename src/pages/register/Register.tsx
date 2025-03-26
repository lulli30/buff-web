import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { hashPassword } from "../../utils/authUtils";
import RegisterForm from "./RegisterForm";

interface FirestoreUser {
  email: string;
  fullName: string;
  passwordHash: string;
  photoURL: string;
  createdAt: Timestamp;
  lastUpdated: Timestamp;
  membership: {
    plan: string;
    status: "Active" | "Expired" | "Paused";
    startDate: string;
    nextPayment: string;
    memberSince: string;
  };
  sessions: any[];
  payments: any[];
  assignedTrainer: null;
}

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const createUserDocument = async (
    email: string,
    fullName: string,
    password: string
  ) => {
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      // Generate a user ID
      const userId = `user_${Date.now()}`;

      // Hash the password before storing
      const passwordHash = await hashPassword(password);

      const userDoc: FirestoreUser = {
        email,
        fullName,
        passwordHash,
        photoURL: "",
        createdAt: Timestamp.now(),
        lastUpdated: Timestamp.now(),
        membership: {
          plan: "No Plan",
          status: "Expired",
          startDate: "Not started",
          nextPayment: "Not applicable",
          memberSince: formattedDate,
        },
        sessions: [],
        payments: [],
        assignedTrainer: null,
      };

      await setDoc(doc(db, "members", userId), userDoc);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating user:", error);
      setError(
        (error as any).message || "Failed to create account. Please try again."
      );
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

        <RegisterForm handleRegister={createUserDocument} />

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
