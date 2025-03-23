import { ArrowUpRight } from "lucide-react";

const HeroSection = () => {
  return (
    <header className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-teal-950/40 rounded-xl shadow-2xl border border-gray-800/60 overflow-hidden text-center py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Animated Glow Effect */}
        <div className="absolute inset-0 bg-teal-400/10 blur-3xl opacity-30"></div>

        {/* Title Section */}
        <h1 className="text-6xl font-extrabold text-white tracking-tight leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-teal-400 to-white bg-clip-text text-transparent">
            BUFF
          </span>
        </h1>
        <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Manage memberships, track progress, and streamline your gym operations
          effortlessly. BUFF is designed to optimize your fitness business.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-teal-500 hover:to-teal-400 transition-all transform hover:scale-105 shadow-md">
            Get Started
          </button>
          <button className="w-full sm:w-auto bg-gray-800 text-gray-200 border border-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-md">
            Learn More
            <ArrowUpRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
