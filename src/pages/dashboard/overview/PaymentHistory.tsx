import React, { useState, useMemo, useCallback } from "react";
import { CreditCard, Filter, ArrowUpDown, Search } from "lucide-react";

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

  const statusStyles: Record<Payment["status"], string> = {
    Completed: "bg-green-500 text-green-100 border-green-700",
    Pending: "bg-yellow-500 text-yellow-100 border-yellow-700",
    Failed: "bg-red-500 text-red-100 border-red-700",
  };

  const methodIcons: Record<Payment["method"], React.ReactNode> = {
    "Credit Card": <CreditCard className="h-4 w-4 text-gray-400" />,
    PayPal: <span className="text-blue-400">💰</span>,
    "Bank Transfer": <span className="text-gray-400">🏦</span>,
  };

  const filteredPayments = useMemo(() => {
    return payments
      .filter(
        (payment) =>
          payment.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.date.includes(searchTerm) ||
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
  }, [payments, searchTerm, sortBy, sortDirection]);

  const handleSort = useCallback(
    (column: keyof Payment) => {
      setSortBy(column);
      setSortDirection(
        sortBy === column ? (sortDirection === "asc" ? "desc" : "asc") : "asc"
      );
    },
    [sortBy, sortDirection]
  );

  return (
    <div className="bg-gradient-to-b from-gray-950 to-teal-950/30 p-6 rounded-lg shadow-lg border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <CreditCard className="mr-2 text-teal-400" />
          Payment History
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 text-gray-200 pl-10 pr-4 py-2 text-sm rounded-md border border-gray-700 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm text-gray-300">
          <thead className="uppercase text-xs text-gray-400 border-b border-gray-700">
            <tr>
              {["date", "amount", "status", "method"].map((col) => (
                <th
                  key={col}
                  className="py-3 px-6 cursor-pointer hover:text-teal-400"
                  onClick={() => handleSort(col as keyof Payment)}
                  aria-label={`Sort by ${col}`}
                >
                  <div className="flex items-center justify-between">
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                    {sortBy === col && <ArrowUpDown className="h-3 w-3 ml-1" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-gray-700 hover:bg-gray-800"
                >
                  <td className="py-4 px-6">{payment.date}</td>
                  <td className="py-4 px-6">${payment.amount.toFixed(2)}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full border ${
                        statusStyles[payment.status]
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 flex items-center">
                    {methodIcons[payment.method]}{" "}
                    <span className="ml-2">{payment.method}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  <Filter className="h-5 w-5 mx-auto mb-2" />
                  No matching payments
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-right">
        Total: {filteredPayments.length} payment
        {filteredPayments.length !== 1 && "s"}
      </div>
    </div>
  );
};

export default PaymentHistory;
