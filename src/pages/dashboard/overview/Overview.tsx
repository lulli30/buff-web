import { useAuth } from "../../../context/AuthContext";
import Layout from "../../../components/Layout";
import MembershipSummary from "./MembershipSummary";
import ActiveWorkoutSchedule from "./ActiveWorkoutSchedule";
import PaymentHistory from "./PaymentHistory";
import AssignedTrainer from "./AssignedTrainer";
import { useEffect, useState } from "react";
import { db } from "../../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

interface FirestoreUser {
  fullName?: string;
  displayName?: string;
  email?: string | null;
  photoURL?: string | null;
}

interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

const Dashboard = () => {
  const { user } = useAuth() as { user: AuthUser | null };
  const [firestoreUser, setFirestoreUser] = useState<FirestoreUser | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Fetch additional user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
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

  // Safely get image source URL
  const getImageSrc = (url?: string | null): string | undefined => {
    return url || undefined;
  };

  // Get the best available name with proper fallbacks
  const getUserName = (): string => {
    if (!user) return "Member";
    return (
      firestoreUser?.fullName ||
      firestoreUser?.displayName ||
      user.displayName ||
      "Member"
    );
  };

  // Get first name for greeting
  const getFirstName = (): string => {
    return getUserName().split(" ")[0];
  };

  // Safely get email address
  const getUserEmail = (): string => {
    return firestoreUser?.email || user?.email || "";
  };

  // Mock data remains unchanged
  const membershipData = {
    plan: "Premium Fitness",
    status: "Active" as const,
    startDate: "January 19, 2025",
    nextPayment: "March 20, 2025",
    memberSince: "2 months ago",
  };

  const sessions = [
    {
      id: 1,
      trainer: "John Doe",
      date: "March 20",
      time: "6:00 PM",
      status: "Upcoming" as const,
    },
    {
      id: 2,
      trainer: "Lisa Chen",
      date: "March 21",
      time: "7:00 AM",
      status: "Completed" as const,
    },
    {
      id: 3,
      trainer: "Mark Johnson",
      date: "March 22",
      time: "5:30 PM",
      status: "Canceled" as const,
    },
  ];

  const payments = [
    {
      id: 1,
      amount: 49.99,
      status: "Completed" as const,
      method: "Credit Card" as const,
      date: "March 10, 2025",
    },
    {
      id: 2,
      amount: 19.99,
      status: "Pending" as const,
      method: "PayPal" as const,
      date: "March 12, 2025",
    },
    {
      id: 3,
      amount: 29.99,
      status: "Failed" as const,
      method: "Bank Transfer" as const,
      date: "March 14, 2025",
    },
  ];

  const assignedTrainer = {
    name: "Mark Johnson",
    specialization: "Strength Training",
  };

  return (
    <Layout>
      <div className="bg-gray-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-600 mt-4">Loading your dashboard...</p>
            </div>
          ) : user ? (
            <>
              <div className="relative bg-gradient-to-r from-[#0f172a] to-[#134e4a] rounded-xl shadow-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-teal-950/30 bg-opacity-30 rounded-xl"></div>
                <div className="relative p-6 text-white">
                  <div className="flex items-center">
                    {(user.photoURL || firestoreUser?.photoURL) && (
                      <img
                        src={getImageSrc(
                          firestoreUser?.photoURL || user.photoURL
                        )}
                        alt="Profile"
                        className="w-12 h-12 rounded-full mr-4"
                      />
                    )}
                    <div>
                      <h2 className="text-2xl font-bold drop-shadow-lg">
                        Welcome back, {getFirstName()}!
                      </h2>
                      {getUserEmail() && (
                        <p className="text-sm text-gray-300">
                          {getUserEmail()}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-300">
                    Your{" "}
                    <span className="font-semibold">{membershipData.plan}</span>{" "}
                    plan is{" "}
                    <span
                      className={`font-semibold ${
                        membershipData.status === "Active"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {membershipData.status.toLowerCase()}.
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MembershipSummary membershipData={membershipData} />
                <ActiveWorkoutSchedule sessions={sessions} />
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <PaymentHistory payments={payments} />
              </div>

              <AssignedTrainer trainer={assignedTrainer} />
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600 mt-4">
                Please sign in to view your dashboard.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
