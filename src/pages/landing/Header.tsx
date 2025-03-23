import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Dumbbell } from "lucide-react";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 lg:px-8 max-w-7xl mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center">
          <div className="h-10 w-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
            <Dumbbell className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-teal-400 to-white bg-clip-text text-transparent tracking-wide">
            BUFF
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 text-gray-300 hover:text-white transition bg-gray-800/50 border border-gray-700 rounded-lg font-medium text-sm shadow-md hover:bg-gray-700/50"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg hover:from-teal-500 hover:to-teal-400 transition font-medium text-sm shadow-md"
          >
            Register
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-0 m-0 border-none outline-none bg-transparent focus:outline-none focus:ring-0"
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            background: "none",
            padding: 0,
            margin: 0,
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center justify-center">
            {isOpen ? (
              <X className="text-white" size={26} />
            ) : (
              <Menu className="text-white" size={26} />
            )}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-sm border-t border-gray-800/50 py-4 px-6 flex flex-col items-center space-y-4 mt-2 animate-fadeIn">
          <button
            onClick={() => {
              navigate("/login");
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg font-medium hover:bg-gray-700 transition text-center"
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/register");
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg hover:from-teal-500 hover:to-teal-400 transition font-medium shadow-md text-center"
          >
            Register
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
