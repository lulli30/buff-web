import React from "react";
import { CreditCard, Banknote, AlertTriangle } from "lucide-react";

interface Payment {
  id: number;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  method: "Credit Card" | "PayPal" | "Bank Transfer";
  date: string;
}

interface PaymentDetailsProps {
  payments: Payment[];
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ payments }) => {
  return (
    <div className="bg-gradient-to-b from-gray-950 to-teal-950/30 rounded-lg shadow-lg border border-gray-800/50 p-6">
      <h2 className="text-lg font-semibold text-white flex items-center">
        <Banknote className="h-5 w-5 mr-2 text-teal-400" /> Payment History
      </h2>

      {payments.length > 0 ? (
        <div className="mt-4">
          <div className="grid grid-cols-4 gap-4 text-gray-400 text-sm border-b border-gray-700 pb-2 mb-2">
            <span>Amount</span>
            <span>Status</span>
            <span>Method</span>
            <span>Date</span>
          </div>
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="grid grid-cols-4 gap-4 p-4 bg-gray-800/40 rounded-md border border-gray-700/50"
            >
              <p className="text-lg font-semibold text-white">
                ${payment.amount}
              </p>
              <p
                className={`font-semibold text-sm ${
                  payment.status === "Completed"
                    ? "text-green-400"
                    : payment.status === "Pending"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {payment.status}
              </p>
              <p className="font-semibold text-white flex items-center">
                <CreditCard className="h-4 w-4 mr-1 text-teal-400" />{" "}
                {payment.method}
              </p>
              <p className="font-semibold text-white">{payment.date}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400 text-sm mt-6">
          <AlertTriangle className="h-6 w-6 text-gray-500 mb-2" />
          No payment history available.
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
