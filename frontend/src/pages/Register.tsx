import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

type RegisterForm = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};

const initialForm: RegisterForm = {
  fullName: "",
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          fullName: form.fullName.trim(),
          username: form.username.trim(),
          email: form.email.trim(),
          password: form.password,
        },
      );

      localStorage.setItem("token", data.token);
      navigate("/", { replace: true });
    } catch (requestError: unknown) {
      const message = axios.isAxiosError<{ message?: string }>(requestError)
        ? requestError.response?.data?.message
        : undefined;
      setError(message || "Unable to create your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 transition-colors dark:bg-black">
      <div className="w-full max-w-sm space-y-4">
        <section className="border border-gray-300 bg-white p-8 text-center dark:border-gray-700 dark:bg-[#121212]">
          <h1 className="mb-4 text-3xl font-semibold tracking-wide">
            BharatGram
          </h1>

          <p className="mb-6 text-sm text-gray-500">
            Sign up to see photos and videos from your friends.
          </p>

          {error && (
            <p className="mb-4 text-sm text-red-500" role="alert">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block">
              <span className="sr-only">Full name</span>
              <input
                name="fullName"
                placeholder="Full Name"
                autoComplete="name"
                value={form.fullName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-[#1e1e1e]"
              />
            </label>

            <label className="block">
              <span className="sr-only">Username</span>
              <input
                name="username"
                placeholder="Username"
                autoComplete="username"
                value={form.username}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-[#1e1e1e]"
              />
            </label>

            <label className="block">
              <span className="sr-only">Email address</span>
              <input
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-[#1e1e1e]"
              />
            </label>

            <label className="block">
              <span className="sr-only">Password</span>
              <input
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                disabled={isSubmitting}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-[#1e1e1e]"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded bg-blue-500 py-2 font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-[#121212]"
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </section>

        <div className="bg-white dark:bg-[#121212] border border-gray-300 dark:border-gray-700 p-4 text-center text-sm">
          Have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
