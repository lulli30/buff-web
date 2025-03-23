import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import {
  Home,
  CreditCard,
  Dumbbell,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Overview", icon: <Home size={24} /> },
    {
      path: "/dashboard/subscription",
      label: "Subscription",
      icon: <CreditCard size={24} />,
    },
    {
      path: "/dashboard/workout",
      label: "Workouts",
      icon: <Dumbbell size={24} />,
    },
    { path: "/billing", label: "Billing", icon: <CreditCard size={24} /> },
    { path: "/trainers", label: "Trainers", icon: <Users size={24} /> },
    { path: "/settings", label: "Settings", icon: <Settings size={24} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-900 text-white flex flex-col p-5 transition-all duration-300 shadow-xl ${
        isCollapsed ? "w-24" : "w-80"
      }`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="text-gray-400 hover:text-white self-end mb-4"
      >
        {isCollapsed ? "→" : "←"}
      </button>

      {user && (
        <div
          className={`flex ${
            isCollapsed ? "justify-center" : "flex-col"
          } items-center mb-8 pb-6 border-b border-gray-700`}
        >
          <div className="relative">
            <img
              src={user.photoURL || "/default-profile.png"}
              alt="Profile"
              className="w-14 h-14 rounded-full border-2 border-teal-600"
            />
            <div className="w-3.5 h-3.5 bg-green-500 rounded-full absolute bottom-0 right-0 border border-gray-900"></div>
          </div>

          {!isCollapsed && (
            <div className="mt-3 text-center">
              <h2 className="text-xl font-semibold">{user.displayName}</h2>
              <p className="text-gray-400 text-sm truncate max-w-full">
                {user.email}
              </p>
            </div>
          )}
        </div>
      )}

      <nav className="flex-1">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <a
                href={item.path}
                className={`flex items-center px-5 py-4 rounded-lg text-lg font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-gradient-to-b from-gray-950 to-teal-950/30 text-white"
                    : "text-gray-300 hover:bg-gradient-to-b from-gray-950 to-teal-950/30 hover:text-gray-100"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <span>{item.icon}</span>
                {!isCollapsed && <span className="ml-4">{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center w-full px-5 py-4 text-gray-300 hover:text-white hover:bg-red-600/20 rounded-lg transition-colors"
        >
          <LogOut size={24} className={isCollapsed ? "" : "mr-4"} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
