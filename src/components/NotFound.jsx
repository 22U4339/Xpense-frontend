import { Link } from "react-router-dom";
import { Ghost, ArrowLeft } from "lucide-react";
import Navbar from "./NavBar";

export default function NotFound() {
  return (
    <>
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      <Ghost className="w-20 h-20 text-gray-400 mb-4 animate-bounce" />
      <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-gray-500 text-lg mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Go Home
      </Link>
    </div>
    </>
  );
}
