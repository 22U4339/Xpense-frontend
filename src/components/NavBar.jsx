import { useState, useEffect } from "react";
import { User, LogOut, KeyRound, Trash2 } from "lucide-react";
import client from "../api/axiosClient";
import { useNavigate } from "react-router-dom";



function Navbar({children}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDeleteAccount = async() => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      
      await client.delete("/auth/profile");
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  return (<>
    <div className="h-[20vh] flex flex-col justify-center items-center text-center">
      <nav className="relative w-11/12 bg-white py-3 px-4 rounded-xl shadow-md flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-gray-800">Xpense</h1>

        {/* Show profile icon only if logged in */}
        {isLoggedIn && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <User className="w-7 h-7 text-gray-800" />
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-10">
                <button
                  onClick={handleChangePassword}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                >
                  <KeyRound className="w-4 h-4 text-gray-500" /> Change Password
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                >
                  <LogOut className="w-4 h-4 text-gray-500" /> Logout
                </button>

                <button
                  onClick={handleDeleteAccount}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                >
                  <Trash2 className="w-4 h-4 text-red-500" /> Delete Account
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
    { children }
    </>
  );
}

export default Navbar;
