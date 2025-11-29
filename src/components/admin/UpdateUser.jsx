import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    email: "",
    username: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `http://103.177.249.170:3000/api/admin/users/${id}`
        );
        if (!res.ok) throw new Error("Failed to load product");
        const data = await res.json();
        console.log(data);
        setForm({
          email: data?.user?.email || "",
          username: data?.user?.username || "",
        });
      } catch (e) {
        setMsg(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = () => {
    setSaving(true);
    fetch(`http://103.177.249.170:3000/api/admin/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    }).then((res) => {
      setSaving(false);
      if (res.ok) {
        setMsg("User updated successfully");
        navigate("/admin/users");
      } else {
        setMsg("Failed to update user");
      }
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-red-500">
        Update User
      </h1>
      <form className="w-full max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
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
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Saving..." : "Update User"}
          </button>
        </div>
      </form>
      {msg && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md">{msg}</div>
      )}
    </div>
  );
};

export default UpdateUser;
