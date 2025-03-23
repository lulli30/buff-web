import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">My Dashboard</h1>
          </div>
          {user && (
            <div className="flex items-center space-x-4">
              <span className="hidden md:block text-sm font-medium text-white">
                Hello, {user.displayName?.split(" ")[0] || "Member"}
              </span>
              <div className="relative">
                <img
                  src={user.photoURL || "/api/placeholder/100/100"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-teal-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
