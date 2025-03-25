import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import {
  Home,
  CreditCard,
  Dumbbell,
  Users,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NavItem {
  path: string;
  label: string;
  icon: ReactNode;
}

interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface FirestoreUser {
  fullName?: string;
  photoURL?: string;
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const { user, logout } = useAuth() as {
    user: AuthUser | null;
    logout: () => Promise<void>;
  };
  const location = useLocation();
  const [firestoreUser, setFirestoreUser] = useState<FirestoreUser | null>(
    null
  );
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          setLoading(true);
          const userDoc = await getDoc(doc(db, "members", user.uid));
          if (userDoc.exists()) {
            setFirestoreUser(userDoc.data() as FirestoreUser);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const navItems: NavItem[] = [
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

  const isActive = (path: string): boolean => location.pathname === path;

  // Check if user has a profile picture
  const hasProfilePicture = Boolean(firestoreUser?.photoURL || user?.photoURL);

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-900 text-white flex flex-col p-5 transition-all duration-300 shadow-xl ${
        isCollapsed ? "w-24" : "w-80"
      }`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="text-gray-400 hover:text-white self-end mb-4"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
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
            {hasProfilePicture ? (
              <img
                src={firestoreUser?.photoURL || user.photoURL || ""}
                alt="Profile"
                className="w-14 h-14 rounded-full border-2 border-teal-600 object-cover"
                onError={(e) => {
                  // Fallback to user icon if image fails to load
                  (e.target as HTMLImageElement).style.display = "none";
                  const fallback = document.createElement("div");
                  fallback.className =
                    "w-14 h-14 rounded-full border-2 border-teal-600 bg-gray-800 flex items-center justify-center";
                  fallback.innerHTML =
                    '<svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>';
                  (e.target as HTMLImageElement).parentNode?.insertBefore(
                    fallback,
                    (e.target as HTMLImageElement).nextSibling
                  );
                }}
              />
            ) : (
              <div className="w-14 h-14 rounded-full border-2 border-teal-600 bg-gray-800 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-300" />
              </div>
            )}
            <div className="w-3.5 h-3.5 bg-green-500 rounded-full absolute bottom-0 right-0 border border-gray-900"></div>
          </div>

          {!isCollapsed && (
            <div className="mt-3 text-center">
              <h2 className="text-xl font-semibold">
                {firestoreUser?.fullName || user.displayName || "Welcome"}
              </h2>
              {user.email && (
                <p className="text-gray-400 text-sm truncate max-w-full">
                  {user.email}
                </p>
              )}
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
          aria-label="Logout"
        >
          <LogOut size={24} className={isCollapsed ? "" : "mr-4"} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
