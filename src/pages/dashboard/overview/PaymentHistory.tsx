import React, { useState } from "react";
import {
  CreditCard,
  Calendar,
  Filter,
  ArrowUpDown,
  Search,
} from "lucide-react";

interface Payment {
  id: number;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  method: "Credit Card" | "PayPal" | "Bank Transfer";
  date: string;
}

interface Props {
  payments: Payment[];
}

const PaymentHistory = ({ payments }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof Payment>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Status styling with more distinct colors for dark mode
  const statusStyles: Record<
    Payment["status"],
    { badge: string; icon: string }
  > = {
    Completed: {
      badge: "bg-green-950 text-green-400 border border-green-700",
      icon: "bg-green-500",
    },
    Pending: {
      badge: "bg-yellow-950 text-yellow-400 border border-yellow-700",
      icon: "bg-yellow-500",
    },
    Failed: {
      badge: "bg-red-950 text-red-400 border border-red-700",
      icon: "bg-red-500",
    },
  };

  // Method icons
  const methodIcons: Record<Payment["method"], React.ReactNode> = {
    "Credit Card": <CreditCard className="h-4 w-4" />,
    PayPal: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.554 9.488c.121.563.106 1.246-.04 2.051-.582 2.978-2.477 4.466-5.683 4.466h-.442a.666.666 0 0 0-.444.166.72.72 0 0 0-.239.427l-.371 2.223-.234 1.48c-.022.14.062.272.222.272h1.557c.121 0 .243-.072.282-.188l.04-.115.222-1.354.014-.076a.258.258 0 0 1 .254-.188h.166c1.983 0 3.532-1.055 4.056-3.462.193-.985.08-1.884-.461-2.465H19.554v-.237z" />
        <path d="M18.71 9.076c-.23-.06-.5-.115-.809-.157-1.092-.151-2.607-.19-3.725.065a4.522 4.522 0 0 0-.47-.711c-.543-.678-1.5-1.055-2.911-1.055H8.318a.65.65 0 0 0-.447.172.693.693 0 0 0-.241.43L6.13 14.469c-.046.272.108.43.313.43h1.899l.138-.82a.649.649 0 0 1 .682-.602h.67c2.156 0 3.686-.743 4.295-3.249a3.132 3.132 0 0 0 .063-1.764" />
        <path d="M9.715 9.2a.693.693 0 0 1 .685-.594h2.094c.258 0 .5.019.723.06.622.11 1.074.384 1.316.829l-.042.018c-.321-.128-.708-.181-1.126-.188-1.34-.02-2.677.26-2.815.276L9.715 9.2z" />
      </svg>
    ),
    "Bank Transfer": (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 10h3V8H4v2zm0-5h3V3H4v2zm0 10h3v-2H4v2zm5-5h12V8H9v2zm0-5h12V3H9v2zm0 10h12v-2H9v2z" />
      </svg>
    ),
  };

  // Sort and filter payments
  const filteredPayments = payments
    .filter(
      (payment) =>
        payment.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.amount.toString().includes(searchTerm)
    )
    .sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });

  const handleSort = (column: keyof Payment) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-950 to-teal-950/30 rounded-lg shadow-lg border border-gray-800/50 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-teal-400" />
            Payment History
          </h3>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800/60 text-gray-200 pl-9 pr-4 py-2 text-sm rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
                <th
                  className="py-3 px-6 cursor-pointer hover:text-teal-400 transition-colors"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Date
                    {sortBy === "date" && (
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    )}
                  </div>
                </th>
                <th
                  className="py-3 px-6 cursor-pointer hover:text-teal-400 transition-colors"
                  onClick={() => handleSort("amount")}
                >
                  <div className="flex items-center">
                    Amount
                    {sortBy === "amount" && (
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    )}
                  </div>
                </th>
                <th
                  className="py-3 px-6 cursor-pointer hover:text-teal-400 transition-colors"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {sortBy === "status" && (
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    )}
                  </div>
                </th>
                <th
                  className="py-3 px-6 cursor-pointer hover:text-teal-400 transition-colors"
                  onClick={() => handleSort("method")}
                >
                  <div className="flex items-center">
                    Method
                    {sortBy === "method" && (
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-4 px-6 text-gray-300 text-sm">
                      {payment.date}
                    </td>
                    <td className="py-4 px-6 font-medium text-white text-sm">
                      ${payment.amount.toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div
                          className={`h-2 w-2 rounded-full mr-2 ${
                            statusStyles[payment.status].icon
                          }`}
                        ></div>
                        <span
                          className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                            statusStyles[payment.status].badge
                          }`}
                        >
                          {payment.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-300 text-sm">
                      <div className="flex items-center">
                        <span className="mr-2 text-gray-400">
                          {methodIcons[payment.method]}
                        </span>
                        {payment.method}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">
                    <Filter className="h-5 w-5 mx-auto mb-2" />
                    No payments match your search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-right">
          Total: {filteredPayments.length} payment
          {filteredPayments.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
