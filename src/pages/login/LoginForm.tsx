import React, { useState, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

interface LoginFormProps {
  handleEmailLogin: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleEmailLogin,
  isLoading,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await handleEmailLogin(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-950 to-teal-950/30 rounded-xl shadow-xl border border-gray-800/50 p-8 max-w-md mx-auto">
      <div className="flex flex-col items-center mb-6">
        <div className="h-12 w-12 bg-teal-500 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
        <p className="text-gray-400 text-center mt-2">
          Sign in to access your gym management dashboard
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 text-red-300 rounded-md text-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors text-white"
            placeholder="your@email.com"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors text-white pr-10"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-teal-500 focus:ring-teal-500 border-gray-600 rounded bg-gray-700"
              disabled={isLoading}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-400"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-teal-400 hover:text-teal-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-500 text-white px-4 py-3 rounded-lg hover:bg-teal-600 transition-colors font-medium focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-teal-400 hover:text-teal-300 transition-colors"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
