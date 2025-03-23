import {
  Calendar,
  CreditCard,
  Clock,
  TrendingUp,
  ArrowUpRight,
  FileText,
  AlertTriangle,
} from "lucide-react";

interface SubscriptionPlanProps {
  subscriptionData: {
    plan: string;
    status: "Active" | "Expired" | "Canceled";
    startDate: string;
    nextPayment: string;
    memberSince: string;
  };
}

const SubscriptionPlan = ({ subscriptionData }: SubscriptionPlanProps) => {
  const { plan, status, startDate, nextPayment, memberSince } =
    subscriptionData;

  const statusConfig = {
    Active: {
      color: "bg-green-900/40 text-green-400 border-green-700/50",
      badgeColor: "bg-green-500",
      icon: <Clock className="h-4 w-4 text-green-400" />,
    },
    Expired: {
      color: "bg-red-900/40 text-red-400 border-red-700/50",
      badgeColor: "bg-red-500",
      icon: <AlertTriangle className="h-4 w-4 text-red-400" />,
      message: "Your subscription has expired. Please renew to continue.",
    },
    Canceled: {
      color: "bg-gray-800/60 text-gray-400 border-gray-700/50",
      badgeColor: "bg-gray-500",
      icon: <FileText className="h-4 w-4 text-gray-400" />,
      message: "Your subscription has been canceled. Contact support.",
    },
  };

  const validStatus = statusConfig[status] ? status : "Active";
  const currentStatus = statusConfig[validStatus];

  return (
    <div className="bg-gradient-to-b from-gray-950 to-teal-950/30 rounded-lg shadow-lg border border-gray-800/50 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800/70 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <CreditCard className="h-5 w-5 mr-2 text-teal-400" /> Subscription
          Plan
        </h3>
        <div className="flex items-center">
          <div
            className={`h-2 w-2 rounded-full mr-2 ${currentStatus.badgeColor}`}
          ></div>
          <div
            className={`px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${currentStatus.color}`}
          >
            {currentStatus.icon}
            <span>{validStatus}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6">
        <h4 className="text-xl font-bold text-white">{plan}</h4>
        <p className="text-sm text-gray-400 mt-1 flex items-center">
          <Clock className="h-4 w-4 mr-1 text-gray-500" /> Member since{" "}
          {memberSince}
        </p>

        {/* Subscription details */}
        <div className="space-y-4 mt-4">
          <div className="flex items-center p-4 bg-gray-800/40 rounded-md border border-gray-700/50">
            <Calendar className="h-5 w-5 text-teal-400 mr-3" />
            <div className="flex justify-between w-full">
              <span className="text-gray-400">Start Date</span>
              <span className="font-medium text-white">{startDate}</span>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-800/40 rounded-md border border-gray-700/50">
            <CreditCard className="h-5 w-5 text-teal-400 mr-3" />
            <div className="flex justify-between w-full">
              <span className="text-gray-400">Next Payment</span>
              <span className="font-medium text-white">{nextPayment}</span>
            </div>
          </div>
        </div>

        {/* Status message */}
        {"message" in currentStatus && (
          <div
            className={`p-4 mt-4 rounded-md ${currentStatus.color} text-sm flex items-start`}
          >
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{currentStatus.message}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          {validStatus === "Active" && (
            <button className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-3 rounded-lg font-medium hover:from-teal-500 hover:to-teal-400 transition flex items-center justify-center shadow-md">
              <TrendingUp className="h-5 w-5 mr-2" /> Upgrade Plan
            </button>
          )}

          {validStatus === "Expired" && (
            <button className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-3 rounded-lg font-medium hover:from-red-500 hover:to-red-400 transition flex items-center justify-center shadow-md">
              <CreditCard className="h-5 w-5 mr-2" /> Make a Payment
            </button>
          )}

          {validStatus === "Canceled" && (
            <a
              href="#contact-support"
              className="flex items-center justify-center w-full text-center text-teal-400 hover:text-teal-300 hover:underline mt-2 py-2"
            >
              Contact Support <ArrowUpRight className="h-4 w-4 ml-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
