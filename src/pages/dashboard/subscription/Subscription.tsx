import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { useAuth } from "../../../context/AuthContext";
import Layout from "../../../components/Layout";
import SubscriptionPlan from "./SubscriptionPlan";
import PaymentDetails from "./PaymentDetails";
import UpgradePlan from "./UpgradePlan";

interface SubscriptionData {
  plan: string;
  status: "Active" | "Expired" | "Canceled";
  startDate: string;
  nextPayment: string;
  memberSince: string;
}

interface Payment {
  id: number;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  method: "Credit Card" | "PayPal" | "Bank Transfer";
  date: string;
}

interface AvailablePlan {
  id: number;
  name: string;
  price: number;
  features: string[];
}

interface FirestoreUser {
  fullName?: string;
  displayName?: string;
  email?: string | null;
  photoURL?: string | null;
  membership?: SubscriptionData;
  payments?: Payment[];
}

const Subscription = () => {
  const { user } = useAuth();
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionData | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [firestoreUser, setFirestoreUser] = useState<FirestoreUser | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [availablePlans, setAvailablePlans] = useState<AvailablePlan[]>([]); // state to store fetched plans
  const [currentPlanId, setCurrentPlanId] = useState<number | null>(null); // state to store current plan id

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, "members", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data() as FirestoreUser;
          setFirestoreUser(data);

          if (data.membership) {
            setSubscriptionData(data.membership);
          }
          setPayments(data.payments || []);
        } else {
          console.warn("No membership document found.");
        }
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [user]);

  // Fetch available plans from Firestore
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plansCollectionRef = collection(db, "plans");
        const querySnapshot = await getDocs(plansCollectionRef);
        const fetchedPlans: AvailablePlan[] = [];

        querySnapshot.forEach((doc) => {
          const planData = doc.data();
          fetchedPlans.push({
            id: planData.id,
            name: planData.name,
            price: planData.price,
            features: planData.features,
          });
        });

        setAvailablePlans(fetchedPlans); // Set the fetched plans in state
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  // Check if the current plan is in the available plans
  useEffect(() => {
    if (subscriptionData && availablePlans.length > 0) {
      const currentPlan = availablePlans.find(
        (plan) => plan.name === subscriptionData.plan
      );
      if (currentPlan) {
        setCurrentPlanId(currentPlan.id); // Set current plan id after plans are fetched
      }
    }
  }, [availablePlans, subscriptionData]); // Dependency on availablePlans and subscriptionData

  const getUserName = () =>
    firestoreUser?.fullName || firestoreUser?.displayName || "Member";
  const getFirstName = () => getUserName().split(" ")[0];

  const handleUpgrade = (planId: number) => {
    alert(`Upgraded to plan ID: ${planId}`);
  };

  return (
    <Layout>
      <div className="bg-gray-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-600 mt-4">
                Loading subscription details...
              </p>
            </div>
          ) : user ? (
            <>
              {/* Welcome Message */}
              <div className="relative bg-gradient-to-r from-[#0f172a] to-[#134e4a] rounded-xl shadow-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-teal-950/30 bg-opacity-30 rounded-xl"></div>
                <div className="relative p-6 text-white">
                  <h2 className="text-2xl font-bold drop-shadow-lg">
                    Manage Your Subscription, {getFirstName()}!
                  </h2>
                  <p className="mt-2 text-gray-300">
                    You are currently on the{" "}
                    <span className="font-semibold">
                      {subscriptionData?.plan || "No Plan"}
                    </span>{" "}
                    plan.
                  </p>
                </div>
              </div>

              {/* Subscription Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subscriptionData && (
                  <SubscriptionPlan subscriptionData={subscriptionData} />
                )}
                <PaymentDetails payments={payments} />
              </div>

              {/* Upgrade Plan Section */}
              <div className="mt-6">
                <UpgradePlan
                  availablePlans={availablePlans}
                  currentPlanId={currentPlanId || 1} // Ensure currentPlanId is set correctly
                  onUpgrade={handleUpgrade}
                />
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600 mt-4">
                No user data found. Please log in.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Subscription;
