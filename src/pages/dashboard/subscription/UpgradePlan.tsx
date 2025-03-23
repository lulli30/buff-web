import React from "react";
import { ArrowUpRight, CheckCircle, AlertTriangle } from "lucide-react";

interface Plan {
  id: number;
  name: string;
  price: number;
  features: string[];
}

interface UpgradePlanProps {
  availablePlans: Plan[];
  currentPlanId: number;
  onUpgrade: (planId: number) => void;
}

const UpgradePlan: React.FC<UpgradePlanProps> = ({
  availablePlans,
  currentPlanId,
  onUpgrade,
}) => {
  return (
    <div className="bg-gradient-to-b from-gray-950 to-teal-950/30 rounded-lg shadow-lg border border-gray-800/50 p-6">
      <h2 className="text-lg font-semibold text-white flex items-center">
        <ArrowUpRight className="h-5 w-5 mr-2 text-teal-400" /> Upgrade Your
        Plan
      </h2>

      {availablePlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {availablePlans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-lg border shadow-md transition-transform transform hover:scale-105 ${
                plan.id === currentPlanId
                  ? "bg-gray-800/60 border-teal-400"
                  : "bg-gray-800/40 border-gray-700/50"
              }`}
            >
              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              <p className="text-gray-300 text-sm mb-3">${plan.price}/month</p>
              <ul className="text-gray-400 text-sm mb-4 space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-teal-400" />{" "}
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.id === currentPlanId ? (
                <button
                  className="w-full bg-gray-700 text-white py-2 rounded-lg cursor-not-allowed opacity-75"
                  disabled
                >
                  Current Plan
                </button>
              ) : (
                <button
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg transition-all flex items-center justify-center"
                  onClick={() => onUpgrade(plan.id)}
                >
                  Upgrade <ArrowUpRight className="h-4 w-4 ml-2" />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400 text-sm mt-6">
          <AlertTriangle className="h-6 w-6 text-gray-500 mb-2" />
          No upgrade plans available.
        </div>
      )}
    </div>
  );
};

export default UpgradePlan;
