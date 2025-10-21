import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowDownCircle,
  ArrowUpCircle,
  Edit3,
  Check,
  Trash2,
  X,
} from "lucide-react";
import axios from "axios";
import client from "../api/axiosClient";

export default function Transaction() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    id:id,
    amount: "",
    dateTime: "",
    description: "",
    type: "CREDIT",
  });

  // Fetch transaction on load
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const res = await client.get(`/transaction/${id}`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res.data);
        setTransaction(res.data);
        setForm(res.data);
      } catch (err) {
        console.error("Error fetching transaction:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Save updates
  const handleSave = async () => {
    try {
       const token = localStorage.getItem("token");
      const res = await client.put(`/transaction`,form);
      setTransaction(res.data);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating transaction:", err);
      alert("Failed to save changes");
    }
  };

  const handleCancel = () => {
    setForm(transaction);
    setEditMode(false);
  };

  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this transaction?");
    if (!confirmed) return;

    try {
      setDeleting(true);
      
      await client.delete(`/transaction/${id}`);
      navigate("/home"); // ✅ Redirect after delete
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete transaction");
    } finally {
      setDeleting(false);
    }
  };

if (loading)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!transaction) return <p className="text-center mt-8">Transaction not found</p>;

  const isDebit = form.type === "DEBIT";
  const Icon = isDebit ? ArrowDownCircle : ArrowUpCircle;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Back + Edit Buttons */}
      <div className="w-full max-w-md mb-4 flex justify-between items-center">
      {/* Back Button */}
      <Link
        to="/home"
        className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        Back
      </Link>

      {/* Edit + Delete Buttons */}
      {!editMode && (
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Edit3 className="w-4 h-4 mr-1" /> Edit
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`flex items-center text-red-600 hover:text-red-800 transition-colors ${
              deleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>

      {/* Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-sm p-6">
        <div className="flex flex-col items-center">
          <Icon
            className={`w-16 h-16 mb-3 ${
              isDebit ? "text-red-500" : "text-green-500"
            }`}
          />

          {/* Amount */}
          {editMode ? (
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="text-3xl font-bold text-center border-b focus:outline-none focus:ring-2 focus:ring-blue-400 w-32"
            />
          ) : (
            <h1
              className={`text-4xl font-bold ${
                isDebit ? "text-red-500" : "text-green-600"
              }`}
            >
              {isDebit ? `-₦${form.amount}` : `+₦${form.amount}`}
            </h1>
          )}

          {/* Date */}
          {editMode ? (
            <input
              type="text"
              name="dateTime"
              value={form.dateTime}
              onChange={handleChange}
              className="text-sm text-gray-500 mt-1 border-b focus:outline-none focus:ring-1 focus:ring-blue-300 text-center"
            />
          ) : (
            <p className="text-sm text-gray-500 mt-1">{form.dateTime}</p>
          )}
        </div>

        {/* Description */}
        <div className="mt-6 border-t border-gray-100 pt-4">
          <h3 className="font-semibold text-gray-700 mb-1">Description</h3>
          {editMode ? (
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full text-gray-700 text-sm border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          ) : (
            <p className="text-gray-600 text-sm leading-relaxed">{form.description}</p>
          )}
        </div>

        {/* Transaction Type */}
        {editMode && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border rounded-lg px-3 py-1.5 w-full text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="CREDIT">CREDIT</option>
              <option value="DEBIT">DEBIT</option>
            </select>
          </div>
        )}

        {/* Action Buttons */}
        {editMode && (
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleCancel}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <Check className="w-4 h-4" /> Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
