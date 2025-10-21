import { useState } from "react";
import axios from "axios";
import { KeyRound, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import client from "../api/axiosClient";
import Navbar from "./NavBar";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to change password");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      const res = await client.put("/auth/profile/reset",
        { oldPassword : oldPassword,
          newPassword : newPassword }
      );

      if (res.status === 200) {
        setSuccess("Password changed successfully!");
        setTimeout(() => navigate("/home"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
   
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <KeyRound className="w-10 h-10 text-blue-600 mb-2" />
          <h1 className="text-2xl font-semibold text-gray-800">
            Change Password
          </h1>
          <p className="text-gray-500 text-sm">
            Update your account password securely
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter current password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          {/* Error or Success */}
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm text-center mt-2">{success}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-medium text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } flex justify-center items-center gap-2`}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
