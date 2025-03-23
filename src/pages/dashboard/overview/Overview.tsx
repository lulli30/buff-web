import { useAuth } from "../../../context/AuthContext";
import Layout from "../../../components/Layout";
import MembershipSummary from "./MembershipSummary";
import ActiveWorkoutSchedule from "./ActiveWorkoutSchedule";
import PaymentHistory from "./PaymentHistory";
import AssignedTrainer from "./AssignedTrainer";

const Dashboard = () => {
  const { user } = useAuth();
  // Mock data for user's membership
  const membershipData = {
    plan: "Premium Fitness",
    status: "Active" as "Active" | "Expired" | "Canceled",
    startDate: "January 19, 2025",
    nextPayment: "March 20, 2025",
    memberSince: "2 months ago",
  };

  // Mock data for user's active workout schedule
  const sessions = [
    {
      id: 1,
      trainer: "John Doe",
      date: "March 20",
      time: "6:00 PM",
      status: "Upcoming" as "Upcoming",
    },
    {
      id: 2,
      trainer: "Lisa Chen",
      date: "March 21",
      time: "7:00 AM",
      status: "Completed" as "Completed",
    },
    {
      id: 3,
      trainer: "Mark Johnson",
      date: "March 22",
      time: "5:30 PM",
      status: "Canceled" as "Canceled",
    },
  ];

  // Mock data for user's payment history
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
  ];

  // Mock data for user's assigned trainer
  const assignedTrainer = {
    name: "Mark Johnson",
    specialization: "Strength Training",
  };

  return (
    <Layout>
      <div className="bg-gray-950 min-h-screen">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {user ? (
            <>
              {/* Welcome Card */}
              <div className="relative bg-gradient-to-r from-[#0f172a] to-[#134e4a] rounded-xl shadow-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-teal-950/30 bg-opacity-30 rounded-xl"></div>
                <div className="relative p-6 text-white">
                  <h2 className="text-2xl font-bold drop-shadow-lg">
                    Welcome back, {user.displayName?.split(" ")[0] || "Member"}!
                  </h2>
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

              {/* Overview Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Use MembershipSummary here */}
                <MembershipSummary membershipData={membershipData} />
                {/* Next Class Card */}
                <ActiveWorkoutSchedule sessions={sessions} />
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Payment History and Assigned Trainer */}
                <PaymentHistory payments={payments} />
              </div>

              <AssignedTrainer trainer={assignedTrainer} />
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

export default Dashboard;
