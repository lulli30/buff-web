import {
  Calendar,
  CreditCard,
  Clock,
  TrendingUp,
  ArrowUpRight,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { JSX } from "react";
import { useNavigate } from "react-router-dom";

type MembershipStatus = "Active" | "Expired" | "Canceled";

interface MembershipData {
  plan: string;
  memberSince: string;
  status: MembershipStatus;
  startDate: string;
  nextPayment: string;
}

interface PlanFeatures {
  [key: string]: string[];
}

interface StatusConfig {
  [key: string]: {
    color: string;
    badgeColor: string;
    icon: JSX.Element;
    message?: string;
    progressColor: string;
  };
}

interface Props {
  membershipData: MembershipData;
  onUpgradePlan?: () => void;
  onViewSchedule?: () => void;
  onMakePayment?: () => void;
}

const planFeatures: PlanFeatures = {
  "Basic Plan": [
    "Access to gym equipment",
    "Locker room access",
    "2 group classes per month",
  ],
  "Pro Plan": [
    "Unlimited access to gym equipment",
    "Locker room access",
    "Unlimited group classes",
    "1 personal training session per month",
  ],
  "Elite Plan": [
    "24/7 Gym access",
    "VIP locker room",
    "Unlimited group classes",
    "4 personal training sessions per month",
    "Nutrition consultation",
  ],
};

const statusConfig: StatusConfig = {
  Active: {
    color: "bg-green-900/40 text-green-400 border-green-700/50",
    badgeColor: "bg-green-500",
    icon: <Clock className="h-4 w-4 text-green-400" />,
    progressColor: "bg-green-500",
  },
  Expired: {
    color: "bg-red-900/40 text-red-400 border-red-700/50",
    badgeColor: "bg-red-500",
    icon: <AlertTriangle className="h-4 w-4 text-red-400" />,
    message:
      "Your membership has expired. Please make a payment to continue enjoying our services.",
    progressColor: "bg-red-500",
  },
  Canceled: {
    color: "bg-gray-800/60 text-gray-400 border-gray-700/50",
    badgeColor: "bg-gray-500",
    icon: <FileText className="h-4 w-4 text-gray-400" />,
    message:
      "Your membership has been canceled. Contact support if you need assistance.",
    progressColor: "bg-gray-500",
  },
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const calculateDaysUntilPayment = (nextPaymentDate: string): number => {
  const today = new Date();
  const nextPayment = new Date(nextPaymentDate);
  return Math.ceil(
    (nextPayment.getTime() - today.getTime()) / (1000 * 3600 * 24)
  );
};

const getPaymentProgressPercentage = (daysUntilPayment: number): number => {
  return Math.min(100, Math.max(0, (daysUntilPayment / 30) * 100));
};

const MembershipSummary = ({
  membershipData,
  onUpgradePlan,
  onViewSchedule,
  onMakePayment,
}: Props) => {
  const { status, plan } = membershipData;
  const navigate = useNavigate();

  const formattedNextPayment = formatDate(membershipData.nextPayment);
  const formattedMemberSince = formatDate(membershipData.memberSince);
  const formattedStartDate = formatDate(membershipData.startDate);
  const daysUntilPayment = calculateDaysUntilPayment(
    membershipData.nextPayment
  );
  const progressPercentage = getPaymentProgressPercentage(daysUntilPayment);
  const features = planFeatures[plan] || [];

  return (
    <div className="bg-gradient-to-b from-gray-950 to-teal-950/30 rounded-lg shadow-lg border border-gray-800/50 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800/70 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <CreditCard className="h-5 w-5 mr-2 text-teal-400" />
          Membership Summary
        </h3>
        <div className="flex items-center">
          <div
            className={`h-2 w-2 rounded-full mr-2 ${statusConfig[status].badgeColor}`}
          />
          <div
            className={`px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${statusConfig[status].color}`}
          >
            {statusConfig[status].icon}
            <span>{status}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-xl font-bold text-white">{plan}</h4>
              <p className="text-sm text-gray-400 mt-1 flex items-center">
                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                Member since {formattedMemberSince}
              </p>
            </div>
          </div>

          {/* Plan features */}
          <div className="mt-4 grid gap-2">
            {features.map((feature, index) => (
              <div
                key={`feature-${index}`}
                className="flex items-center text-sm text-gray-300"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-teal-500 mr-2" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Status message */}
        {statusConfig[status].message && (
          <div
            className={`p-4 mb-5 rounded-md ${statusConfig[status].color} text-sm flex items-start`}
          >
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{statusConfig[status].message}</span>
          </div>
        )}

        {/* Membership details */}
        <div className="space-y-4">
          <DetailItem
            icon={<Calendar className="h-5 w-5 text-teal-400" />}
            label="Start Date"
            value={formattedStartDate}
          />

          <div className="flex items-center p-4 bg-gray-800/40 rounded-md border border-gray-700/50">
            <CreditCard className="h-5 w-5 text-teal-400 mr-3" />
            <div className="flex w-full items-center justify-between">
              <span className="text-gray-400 flex-shrink-0">Next Payment</span>
              <div className="text-right">
                <span className="font-medium text-white">
                  {formattedNextPayment}
                </span>
                {status === "Active" && daysUntilPayment > 0 && (
                  <PaymentProgress
                    daysUntilPayment={daysUntilPayment}
                    progressPercentage={progressPercentage}
                    progressColor={statusConfig[status].progressColor}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          {status === "Active" && (
            <ActiveActions
              onUpgradePlan={onUpgradePlan}
              onViewSchedule={onViewSchedule}
              navigate={navigate}
            />
          )}
          {status === "Expired" && (
            <ExpiredAction onMakePayment={onMakePayment} />
          )}
          {status === "Canceled" && <CanceledAction />}
        </div>
      </div>
    </div>
  );
};

// Sub-components for better organization
interface DetailItemProps {
  icon: JSX.Element;
  label: string;
  value: string;
}

const DetailItem = ({ icon, label, value }: DetailItemProps) => (
  <div className="flex items-center p-4 bg-gray-800/40 rounded-md border border-gray-700/50">
    {icon}
    <div className="flex justify-between w-full ml-3">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  </div>
);

interface PaymentProgressProps {
  daysUntilPayment: number;
  progressPercentage: number;
  progressColor: string;
}

const PaymentProgress = ({
  daysUntilPayment,
  progressPercentage,
  progressColor,
}: PaymentProgressProps) => (
  <div className="mt-2">
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs text-gray-400">
        {daysUntilPayment} {daysUntilPayment === 1 ? "day" : "days"} remaining
      </span>
      <span className="text-xs text-gray-400">
        {progressPercentage.toFixed(0)}%
      </span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-1.5">
      <div
        className={`h-1.5 rounded-full ${progressColor}`}
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  </div>
);

interface ActiveActionsProps {
  onUpgradePlan?: () => void;
  onViewSchedule?: () => void;
  navigate: ReturnType<typeof useNavigate>;
}

const ActiveActions = ({
  onUpgradePlan,
  onViewSchedule,
  navigate,
}: ActiveActionsProps) => (
  <>
    <button
      className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-3 rounded-lg font-medium hover:from-teal-500 hover:to-teal-400 transition flex items-center justify-center shadow-md"
      onClick={() => {
        onUpgradePlan?.();
        navigate("/dashboard/subscription");
      }}
    >
      <TrendingUp className="h-5 w-5 mr-2" />
      Upgrade Plan
    </button>
    {onViewSchedule && (
      <button
        className="w-full bg-gray-800 text-gray-200 border border-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-700 transition flex items-center justify-center"
        onClick={onViewSchedule}
      >
        <Calendar className="h-5 w-5 mr-2" />
        View Payment Schedule
      </button>
    )}
  </>
);

interface ExpiredActionProps {
  onMakePayment?: () => void;
}

const ExpiredAction = ({ onMakePayment }: ExpiredActionProps) => (
  <button
    className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-3 rounded-lg font-medium hover:from-red-500 hover:to-red-400 transition flex items-center justify-center shadow-md"
    onClick={onMakePayment}
  >
    <CreditCard className="h-5 w-5 mr-2" />
    Make a Payment
  </button>
);

const CanceledAction = () => (
  <a
    href="#contact-support"
    className="flex items-center justify-center w-full text-center text-teal-400 hover:text-teal-300 hover:underline mt-2 py-2"
  >
    Contact Support
    <ArrowUpRight className="h-4 w-4 ml-1" />
  </a>
);

export default MembershipSummary;
