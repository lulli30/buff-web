import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-16 bg-gradient-to-b from-gray-950 via-gray-900 to-teal-950/40 border-t border-gray-800/50 backdrop-blur-lg">
      <div className="w-full px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10 text-center md:text-left">
          {/* Branding Section */}
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-white bg-clip-text text-transparent">
              GymMS
            </h3>
            <p className="mt-4 text-gray-400 leading-relaxed">
              A powerful gym management solution for fitness businesses of all
              sizes.
            </p>
          </div>

          {/* Features Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
            <ul className="text-gray-400 space-y-3">
              <li className="hover:text-teal-400 transition">
                Membership Management
              </li>
              <li className="hover:text-teal-400 transition">
                Class Scheduling
              </li>
              <li className="hover:text-teal-400 transition">
                Payment Processing
              </li>
              <li className="hover:text-teal-400 transition">
                Reporting & Analytics
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="text-gray-400 space-y-3">
              <li className="hover:text-teal-400 transition">Documentation</li>
              <li className="hover:text-teal-400 transition">Blog</li>
              <li className="hover:text-teal-400 transition">Support</li>
              <li className="hover:text-teal-400 transition">Contact Us</li>
            </ul>
          </div>

          {/* Legal & Social Media Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="text-gray-400 space-y-3">
              <li className="hover:text-teal-400 transition">
                Terms of Service
              </li>
              <li className="hover:text-teal-400 transition">Privacy Policy</li>
              <li className="hover:text-teal-400 transition">Cookie Policy</li>
            </ul>

            {/* Social Media Links */}
            <div className="flex justify-center md:justify-start space-x-6 mt-6">
              <a
                href="#"
                className="group text-gray-400 hover:text-teal-400 transition"
              >
                <FaFacebookF
                  size={20}
                  className="group-hover:scale-110 transition duration-200"
                />
              </a>
              <a
                href="#"
                className="group text-gray-400 hover:text-teal-400 transition"
              >
                <FaTwitter
                  size={20}
                  className="group-hover:scale-110 transition duration-200"
                />
              </a>
              <a
                href="#"
                className="group text-gray-400 hover:text-teal-400 transition"
              >
                <FaInstagram
                  size={20}
                  className="group-hover:scale-110 transition duration-200"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Gym Management System. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
