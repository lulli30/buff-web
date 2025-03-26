import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { hashPassword, verifyPassword } from "../utils/authUtils";

interface User {
  uid: string;
  email: string;
  fullName: string;
  photoURL: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on initial load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        if (!userId) {
          setIsLoading(false);
          return;
        }

        const userDoc = await getDoc(doc(db, "members", userId));
        if (userDoc.exists()) {
          setUser({
            uid: userDoc.id,
            ...userDoc.data(),
          } as User);
        }
      } catch (err) {
        console.error("Session check failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        // Query Firestore for user by email
        const querySnapshot = await getDocs(
          query(collection(db, "members"), where("email", "==", email))
        );

        if (querySnapshot.empty) {
          throw new Error("User not found");
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        if (!userData.passwordHash) {
          throw new Error("Authentication error: No password found for user.");
        }

        // Verify password
        const isValid = await verifyPassword(password, userData.passwordHash);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Set user session
        const userObject: User = {
          uid: userDoc.id,
          email: userData.email,
          fullName: userData.fullName,
          photoURL: userData.photoURL || "",
        };

        setUser(userObject);
        sessionStorage.setItem("userId", userDoc.id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Login failed");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const signUpWithEmail = useCallback(
    async (email: string, password: string, fullName: string) => {
      setIsLoading(true);
      setError(null);
      try {
        // Check if email already exists
        const querySnapshot = await getDocs(
          query(collection(db, "members"), where("email", "==", email))
        );

        if (!querySnapshot.empty) {
          throw new Error("Email already in use");
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Create user document
        const userId = `user_${Date.now()}`;
        const userDoc = {
          email,
          fullName,
          passwordHash,
          photoURL: "",
          createdAt: Timestamp.now(),
          lastUpdated: Timestamp.now(),
          membership: {
            plan: "No Plan",
            status: "Expired",
            startDate: "Not started",
            nextPayment: "Not applicable",
            memberSince: new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
          },
          sessions: [],
          payments: [],
          assignedTrainer: null,
        };

        await setDoc(doc(db, "members", userId), userDoc);

        // Set user session
        setUser({
          uid: userId,
          ...userDoc,
        } as User);
        sessionStorage.setItem("userId", userId);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Registration failed");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("userId");
  }, []);

  if (isLoading) {
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
        isLoading,
        error,
        signInWithEmail,
        signUpWithEmail,
        logout,
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
