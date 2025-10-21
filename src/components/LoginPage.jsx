import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { LogIn } from "lucide-react";

export default function LoginPage() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const handleLogin = async (e) => {
e.preventDefault();
setLoading(true);


try {
  const res = await axios.post(
    "http://localhost:8080/auth/login",
    { email:email, password:password },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // allow cookies or JWT if needed
    }
  );

  //Expecting backend to return { token: "..." }
  const token = res.data.token;
  
  if (token) {
    localStorage.setItem("token", token);
    navigate("/home");
  } else {
    alert("No token returned from server");
  }
} catch (err) {
  console.error("Login failed:", err);
  alert(err.response?.data?.message || "Login failed. Check your credentials.");
} finally {
  setLoading(false);
}


};

return ( <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4"> <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm"> <div className="flex flex-col items-center mb-6"> <LogIn className="w-10 h-10 text-blue-600 mb-2" /> <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1> <p className="text-gray-500 text-sm">Log in to continue</p> </div>


    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-lg font-medium text-white transition ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>

    <p className="text-center text-sm text-gray-500 mt-6">
      Don’t have an account?{" "}
      <Link to="/signup" className="text-blue-600 hover:underline font-medium">
        Sign up
      </Link>
    </p>
  </div>
</div>

);
}
