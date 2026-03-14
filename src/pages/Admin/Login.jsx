import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminName", data.admin.name);
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-black to-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/90 backdrop-blur-md text-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-yellow-400">Admin Login</h2>

        {error && <p className="bg-red-600/80 p-2 rounded mb-4 text-center font-medium animate-pulse">{error}</p>}

        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-xl bg-gray-700/80 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-xl bg-gray-700/80 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 hover:scale-105 transition-transform duration-200 shadow-md"
        >
          Login
        </button>

        <p className="mt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} SUPREXON Technologies
        </p>
      </form>
    </div>
  );
}