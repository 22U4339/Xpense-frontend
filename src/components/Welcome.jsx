import React from 'react'
import Navbar from './NavBar'

function Welcome() {
  return (
    <>
      
     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 text-center px-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-3">
        Welcome 👋
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Manage your expenses effortlessly and stay on top of your finances.
      </p>
      <div className="flex gap-4">
        <a
          href="/login"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-transform active:scale-95"
        >
          Login
        </a>
        <a
          href="/signup"
          className="px-5 py-2.5 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-transform active:scale-95"
        >
          Sign Up
        </a>
      </div>
    </div>
    </>
  )
}

export default Welcome