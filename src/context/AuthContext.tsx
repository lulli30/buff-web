import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "firebase/auth";
import {
  authStateListener,
  signInWithGoogle as signInFn,
  signUpWithEmail as signUpFn, // Import the function
  logout as logoutFn,
} from "../services/auth";

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<User | null>; // Add sign-up function
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authStateListener((authUser) => {
      console.log("👤 Firebase Auth State Changed:", authUser);
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-white">Loading please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle: async () => {
          const loggedInUser = await signInFn();
          if (loggedInUser) setUser(loggedInUser);
        },
        signUpWithEmail: async (email, password) => {
          const registeredUser = await signUpFn(email, password);
          if (registeredUser) setUser(registeredUser);
          return registeredUser;
        },
        logout: async () => {
          await logoutFn();
          setUser(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
