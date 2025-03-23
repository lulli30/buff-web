import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface RegisterFormProps {
  handleEmailRegister: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<void>;
  handleGoogleRegister: () => Promise<void>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  handleEmailRegister,
  handleGoogleRegister,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    await handleEmailRegister(email, password, fullName);
  };

  return (
    <div className="bg-gradient-to-b from-gray-950 to-teal-950/30 rounded-xl shadow-xl border border-gray-800/50 p-8 max-w-md mx-auto">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors text-white"
            placeholder="Your Full Name"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors text-white"
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors text-white pr-10"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-300">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors text-white pr-10"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 text-white px-4 py-3 rounded-lg hover:bg-teal-600 transition-colors font-medium focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500 mt-2"
        >
          Sign Up
        </button>
      </form>

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-700"></div>
        <span className="px-3 text-gray-400 text-sm">or</span>
        <div className="flex-grow border-t border-gray-700"></div>
      </div>

      <button
        onClick={handleGoogleRegister}
        className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors border border-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-600"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google Logo"
          className="h-6 w-6"
        />
        <span>Sign Up with Google</span>
      </button>
    </div>
  );
};

export default RegisterForm;
