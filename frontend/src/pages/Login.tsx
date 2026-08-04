import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

const initialForm: LoginForm = { email: "", password: "" };

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email: form.email.trim(),
        password: form.password,
      });

      localStorage.setItem("token", data.token);
      navigate("/", { replace: true });
    } catch (requestError: unknown) {
      const message = axios.isAxiosError<{ message?: string }>(requestError)
        ? requestError.response?.data?.message
        : undefined;
      setError(message || "Unable to log in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md space-y-4">
        <section className="rounded-xl border border-gray-800 bg-[#121212] p-8 shadow-lg">
          <h1 className="mb-2 text-center text-3xl font-bold text-blue-500">
            BharatGram
          </h1>
          <p className="mb-6 text-center text-sm text-gray-400">
            Log in to continue to your account.
          </p>

          {error && (
            <p className="mb-4 rounded-md border border-red-900/60 bg-red-950/30 px-3 py-2 text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="sr-only">Email address</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full rounded-md border border-gray-700 bg-[#1a1a1a] px-4 py-2 text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </label>

            <label className="block">
              <span className="sr-only">Password</span>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                disabled={isSubmitting}
                className="w-full rounded-md border border-gray-700 bg-[#1a1a1a] px-4 py-2 text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-blue-600 py-2 font-semibold transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#121212] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </button>
          </form>
        </section>

        <div className="rounded-xl border border-gray-800 bg-[#121212] p-4 text-center">
          <p className="text-gray-400">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-500 hover:text-blue-400">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
