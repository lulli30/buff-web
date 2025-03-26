import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { useAuth } from "../../../context/AuthContext";
import Layout from "../../../components/Layout";
import MembershipSummary from "./MembershipSummary";
import ActiveWorkoutSchedule from "./ActiveWorkoutSchedule";
import PaymentHistory from "./PaymentHistory";
import AssignedTrainer from "./AssignedTrainer";

interface Membership {
  plan: string;
  status: "Active" | "Canceled" | "Expired";
  startDate: string;
  nextPayment: string;
  memberSince: string;
}

interface Session {
  id: number;
  trainer: string;
  date: string;
  time: string;
  status: "Upcoming" | "Completed" | "Canceled";
}

interface Payment {
  id: number;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  method: "Credit Card" | "PayPal" | "Bank Transfer";
  date: string;
}

interface Trainer {
  name: string;
  specialization: string;
}

interface FirestoreUser {
  fullName?: string;
  displayName?: string;
  email?: string | null;
  photoURL?: string | null;
  membership?: Membership;
  sessions?: Session[];
  payments?: Payment[];
  assignedTrainer?: Trainer;
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

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "members", user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data() as FirestoreUser;
          setFirestoreUser(userData);
        } else {
          console.warn("User document does not exist in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Helper functions
  const getImageSrc = (url?: string | null) => url || undefined;
  const getUserName = () =>
    firestoreUser?.fullName ||
    firestoreUser?.displayName ||
    user?.displayName ||
    "Member";
  const getFirstName = () => getUserName().split(" ")[0];
  const getUserEmail = () => firestoreUser?.email || user?.email || "";
  const membershipData = firestoreUser?.membership || {
    plan: "",
    status: "Canceled",
    startDate: "",
    nextPayment: "",
    memberSince: "",
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
              {/* Welcome Banner */}
              <div className="relative bg-gradient-to-r from-[#0f172a] to-[#134e4a] rounded-xl shadow-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-teal-950/30 bg-opacity-30 rounded-xl"></div>
                <div className="relative p-6 text-white flex items-center">
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
                      <p className="text-sm text-gray-300">{getUserEmail()}</p>
                    )}
                    <p className="mt-2 text-gray-300">
                      Your{" "}
                      <span className="font-semibold">
                        {membershipData.plan}
                      </span>{" "}
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
              </div>

              {/* Main Dashboard Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MembershipSummary membershipData={membershipData} />
                <ActiveWorkoutSchedule
                  sessions={firestoreUser?.sessions || []}
                />
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <PaymentHistory payments={firestoreUser?.payments || []} />
              </div>

              {firestoreUser?.assignedTrainer && (
                <AssignedTrainer trainer={firestoreUser.assignedTrainer} />
              )}
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
