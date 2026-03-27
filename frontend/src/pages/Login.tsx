import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);

    // after login
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-8 shadow-lg">

          <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">
            BharatGram
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full px-4 py-2 rounded-md
                bg-[#1a1a1a]
                border border-gray-700
                focus:outline-none focus:border-blue-500
                placeholder-gray-400
              "
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full px-4 py-2 rounded-md
                bg-[#1a1a1a]
                border border-gray-700
                focus:outline-none focus:border-blue-500
                placeholder-gray-400
              "
            />

            {/* Login Button */}
            <button
              type="submit"
              className="
                w-full py-2 rounded-md
                bg-blue-600 hover:bg-blue-700
                font-semibold transition
              "
            >
              Log in
            </button>

          </form>

        </div>

        {/* Signup Card */}
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-4 mt-4 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-500 cursor-pointer font-semibold"
            >
              Sign up
            </span>
          </p>
        </div>

      </div>

    </div>
  );
};

export default LoginPage;