import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black transition-colors">
      <div className="w-full max-w-sm space-y-4">

        {/* Card */}
        <div className="bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-700 p-8 text-center">

          <h1 className="text-3xl font-semibold mb-6 tracking-wide">
            BharatGram
          </h1>

          {error && (
            <p className="text-sm text-red-500 mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm border rounded bg-gray-50 dark:bg-[#1e1e1e] dark:border-gray-600 outline-none"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm border rounded bg-gray-50 dark:bg-[#1e1e1e] dark:border-gray-600 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 transition"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>

        {/* Bottom link */}
        <div className="bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-700 p-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 font-semibold">
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;