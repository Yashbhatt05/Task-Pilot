import React, { useState } from 'react';
import { Eye, LogIn } from 'lucide-react';

export default function Login() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center relative overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-purple-200 opacity-70"></div>
        <div className="absolute bottom-0 left-24 w-64 h-64 rounded-full bg-purple-200 opacity-70"></div>
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-purple-200 opacity-70"></div>
        <div className="absolute bottom-20 right-0 w-80 h-80 rounded-full bg-purple-200 opacity-70"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-purple-200 opacity-70"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-200 opacity-70"></div>
      </div>
      
      {/* Logo */}
      <div className="absolute top-8 left-8 z-10">
        <div className="text-orange-500 font-bold text-2xl flex items-center">
          Seshaasai
          <div className="inline-flex ml-1 mt-1">
            <span className="h-2 w-2 bg-orange-400 rounded-full"></span>
            <span className="h-2 w-2 bg-orange-300 rounded-full ml-0.5"></span>
            <span className="h-2 w-2 bg-orange-200 rounded-full ml-0.5"></span>
          </div>
        </div>
      </div>
      
      {/* Login Card */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">Task Management</h1>
          <p className="text-purple-600">Welcome back !</p>
        </div>
        
        {/* Login Illustration */}
        <div className="flex justify-center mb-8">
          <div className="relative w-32">
            <div className="w-20 h-24 relative">
              {/* Person sitting */}
              <div className="absolute bottom-0 left-0">
                <div className="bg-red-500 w-10 h-16 rounded"></div>
              </div>
              
              {/* Phone */}
              <div className="absolute right-0 top-2">
                <div className="bg-purple-600 w-12 h-20 rounded-lg flex items-center justify-center">
                  <div className="bg-purple-400 w-10 h-16 rounded-lg flex flex-col items-center justify-center">
                    <div className="bg-red-500 w-4 h-4 rounded-full mb-1"></div>
                    <div className="bg-gray-200 w-6 h-1 mb-1 rounded-full"></div>
                    <div className="bg-gray-200 w-6 h-1 mb-1 rounded-full"></div>
                    <div className="bg-gray-200 w-6 h-1 mb-1 rounded-full"></div>
                    <div className="bg-cyan-400 w-6 h-2 text-white text-xs flex items-center justify-center rounded-sm">LOGIN</div>
                  </div>
                </div>
                <div className="absolute -right-2 bottom-0">
                  <div className="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center">
                    <div className="text-white text-xs">✓</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Login Form */}
        <form>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">User ID</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Enter User ID"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div className="mb-1">
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex justify-end mb-6">
            <a href="#" className="text-sm text-purple-600 hover:underline">Forgot Password ?</a>
          </div>
          
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}