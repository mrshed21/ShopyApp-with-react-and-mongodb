import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context";
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { success, data, error } = await login(formData);
      if (!success) {
        setError(error || "Login failed");
        return;
      }
      const role = data?.user?.role || "user";
      const redirect = role === "admin" ? "/admin" : "/";
      navigate(redirect, { replace: true });
    } catch (err) {
      setError(err?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen mt-4">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full p-2 bg-[#F86D72] text-white rounded-md hover:bg-[#F86D72]/90"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#F86D72] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
