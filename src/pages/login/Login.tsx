import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "./LoginForm";

interface AuthContextType {
  user: any; // Replace with your actual user type
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
}

const Login = () => {
  const { user, signInWithGoogle, signInWithEmail } =
    useAuth() as AuthContextType;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await signInWithEmail(email, password);
    } catch (error) {
      console.error("Email login failed:", error);
      throw error; // Rethrow to be caught by LoginForm
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-teal-900/30 text-white flex flex-col items-center justify-center px-4 py-12">
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
                d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">BUFF</h1>
          <p className="text-gray-400 mt-1">
            Your personal gym management solution
          </p>
        </div>

        <LoginForm
          handleGoogleLogin={handleGoogleLogin}
          handleEmailLogin={handleEmailLogin}
          isLoading={isLoading}
        />

        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-400 hover:text-teal-400 transition-colors font-medium"
            aria-label="Back to home page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      <footer className="mt-16 text-sm text-gray-500 text-center">
        <p>© 2025 FitTrack Pro. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link
            to="/privacy"
            className="text-gray-500 hover:text-teal-400 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-gray-500 hover:text-teal-400 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to="/help"
            className="text-gray-500 hover:text-teal-400 transition-colors"
          >
            Help
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Login;
