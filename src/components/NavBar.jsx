import { useState, useEffect, useRef } from "react";
import { User, LogOut, KeyRound, Trash2 } from "lucide-react";
import client from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

function Navbar({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Check login state
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      await client.delete("/auth/profile");
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl font-bold tracking-tight text-gray-800">
            Xpense
          </h1>

          {/* Profile Menu */}
          {isLoggedIn && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
                aria-label="Profile menu"
              >
                <User className="w-7 h-7 text-gray-700" />
              </button>

              {/* Tooltip Dropdown */}
              {menuOpen && (
                <div className="absolute right-0 mt-4 w-56">
                  {/* Arrow */}
                  <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />

                  {/* Menu */}
                  <div className="relative rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden animate-dropdown">
                    <button
                      onClick={handleChangePassword}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                    >
                      <KeyRound className="w-4 h-4 text-gray-500" />
                      Change Password
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                    >
                      <LogOut className="w-4 h-4 text-gray-500" />
                      Logout
                    </button>

                    <div className="border-t border-gray-100" />

                    <button
                      onClick={handleDeleteAccount}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Page Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
    </>
  );
}

export default Navbar;
