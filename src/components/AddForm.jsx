import React, { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from "@headlessui/react";
import { Check, ChevronDown, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import client from "../api/axiosClient";

function AppForm() {
  const transactionTypes = [
    { id: 1, name: "CREDIT" },
    { id: 2, name: "DEBIT" },
  ];

  const [selectedType, setSelectedType] = useState(transactionTypes[0]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // popup state
  const [toast, setToast] = useState({
    show: false,
    type: "success", // success | error
    message: "",
  });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type, message: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount)) {
      showToast("error", "Please enter a valid amount");
      return;
    }

    if (!description.trim()) {
      showToast("error", "Description is required");
      return;
    }

    try {
      setLoading(true);

      const formData = {
        type: selectedType.name,
        amount: parseFloat(amount),
        description: description.trim(),
      };

      const res = await client.post("/transaction", formData);

      if (res.status === 201) {
        showToast("success", "Transaction added successfully");
        setAmount("");
        setDescription("");
        setSelectedType(transactionTypes[0]);
      }
    } catch (err) {
      showToast(
        "error",
        err.response?.data?.message || "Submission failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔔 Toast */}
      {toast.show && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium
              ${
                toast.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            {toast.message}
          </div>
        </div>
      )}

      <div className="bg-white p-8 w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link
            to="/home"
            className="p-2 mr-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h2 className="text-xl font-extrabold text-gray-800">
            New Transaction
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Transaction Type
            </label>
            <Listbox value={selectedType} onChange={setSelectedType}>
              {({ open }) => (
                <div className="relative">
                  <ListboxButton className="w-full rounded-lg border px-3 py-2 text-left shadow-sm">
                    {selectedType.name}
                    <ChevronDown
                      className={`absolute right-3 top-2.5 w-5 h-5 transition ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </ListboxButton>

                  <Transition
                    show={open}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions className="absolute mt-1 w-full bg-white rounded-lg shadow-lg border z-10">
                      {transactionTypes.map((type) => (
                        <ListboxOption
                          key={type.id}
                          value={type}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        >
                          {type.name}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </div>
              )}
            </Listbox>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="0.00"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-xl bg-slate-950 text-white font-semibold
              hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}

export default AppForm;
