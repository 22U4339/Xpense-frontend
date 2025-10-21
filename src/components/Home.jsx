import React, { useState, useEffect } from "react";
import Record from "./Record";
import { Link } from "react-router-dom";

import axios from "axios";
import client from "../api/axiosClient";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  // Fetch transactions from backend
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const token = localStorage.getItem("token");
        const res = await client.get("/");

        setTransactions(res.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  // Filter logic

  const filtered = (t) => {
    if (filter === "ALL") return transactions;
    else if(t.type === filter)
      return t;
  };

  // Loading Spinner
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="max-w-md mx-auto">
      {/* Add Button */}
      <div className="h-[20vh] flex justify-center items-center text-center">
        <Link
          to="/add"
          className="bg-blue-600 hover:bg-blue-700 rounded-xl cursor-pointer w-11/12 py-2 font-bold text-2xl text-white text-center transition"
        >
          + Add
        </Link>
      </div>

      {/* Filters */}
      <div className="flex text-sm font-medium text-center">
        {["ALL", "CREDIT", "DEBIT"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 border-b-2 transition ${
              filter === f
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Transactions List */ console.log(filtered)}
      <div className="mt-0 divide-y divide-neutral-200">
        {
        transactions.length > 0 ? (
          transactions.map((record, index) => (
            <Record
              key={record.id || index}
              id={record.id}
              amount={record.amount}
              dateTime={record.dateTime}
              type={record.type}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">No transactions found.</p>
        )}
      </div>
    </div>
  );
}
