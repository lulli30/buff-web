import { useAuth } from "../../../context/AuthContext";
import Layout from "../../../components/Layout";
import SubscriptionPlan from "./SubscriptionPlan";
import PaymentDetails from "./PaymentDetails";
import UpgradePlan from "./UpgradePlan";

const Subscription = () => {
  const { user } = useAuth();

  // Mock data for user's subscription
  const subscriptionData = {
    plan: "Premium Fitness",
    status: "Active" as "Active" | "Expired" | "Canceled",
    startDate: "January 19, 2025",
    nextPayment: "March 20, 2025",
    amount: 49.99,
    method: "Credit Card" as "Credit Card" | "PayPal" | "Bank Transfer",
    memberSince: "January 1, 2020",
  };

  // Mock payment history
  const payments = [
    {
      id: 1,
      amount: 49.99,
      status: "Completed" as "Completed",
      method: "Credit Card" as "Credit Card",
      date: "March 10, 2025",
    },
    {
      id: 2,
      amount: 19.99,
      status: "Pending" as "Pending",
      method: "PayPal" as "PayPal",
      date: "March 12, 2025",
    },
    {
      id: 3,
      amount: 29.99,
      status: "Failed" as "Failed",
      method: "Bank Transfer" as "Bank Transfer",
      date: "March 14, 2025",
    },
    {
      id: 4,
      amount: 29.99,
      status: "Failed" as "Failed",
      method: "Bank Transfer" as "Bank Transfer",
      date: "March 15, 2025",
    },
  ];

  // Mock data for available plans
  const availablePlans = [
    {
      id: 1,
      name: "Basic",
      price: 19.99,
      features: ["Access to gym", "Standard equipment"],
    },
    {
      id: 2,
      name: "Premium Fitness",
      price: 49.99,
      features: ["Gym access", "Premium equipment", "Group classes"],
    },
    {
      id: 3,
      name: "Elite Training",
      price: 79.99,
      features: ["Full gym access", "Personal trainer", "VIP lounge"],
    },
  ];

  // Find the current plan ID
  const currentPlan = availablePlans.find(
    (plan) => plan.name === subscriptionData.plan
  );
  const currentPlanId = currentPlan ? currentPlan.id : 1;

  // Mock function for upgrading plan
  const handleUpgrade = (planId: number) => {
    alert(`Upgraded to plan ID: ${planId}`);
  };

  return (
    <Layout>
      <div className="bg-gray-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {user ? (
            <>
              {/* Welcome Message */}
              <div className="relative bg-gradient-to-r from-[#0f172a] to-[#134e4a] rounded-xl shadow-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-teal-950/30 bg-opacity-30 rounded-xl"></div>
                <div className="relative p-6 text-white">
                  <h2 className="text-2xl font-bold drop-shadow-lg">
                    Manage Your Subscription,{" "}
                    {user.displayName?.split(" ")[0] || "Member"}!
                  </h2>
                  <p className="mt-2 text-gray-300">
                    You are currently on the{" "}
                    <span className="font-semibold">
                      {subscriptionData.plan}
                    </span>{" "}
                    plan.
                  </p>
                </div>
              </div>

              {/* Subscription Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SubscriptionPlan subscriptionData={subscriptionData} />
                <PaymentDetails payments={payments} />
              </div>

              {/* Upgrade Plan Section */}
              <div className="mt-6">
                <UpgradePlan
                  availablePlans={availablePlans}
                  currentPlanId={currentPlanId}
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
