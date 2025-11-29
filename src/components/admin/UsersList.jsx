import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context";

function UsersList() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://103.177.249.170:3000/api/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load users");
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : data?.users || []);
      } catch (e) {
        setMsg(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const deleteUser = async (id) => {
    try {
      const res = await fetch(
        `http://103.177.249.170:3000/api/admin/users/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (e) {
      setMsg(e.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h4 className="my-4 text-lg font-bold px-2 rounded-md bg-blue-200"><span className=" py-1">Total Users:</span> {users.length}</h4>
        <h4 className="my-4 text-lg font-bold px-2 rounded-md bg-blue-200"><span className="py-1"> Regular Users:</span> {users.filter((u) => u.role !== "admin").length}</h4>
        <h3>{user.username}</h3>
      </div>

      <h3 className="my-6">Users</h3>
      {msg && <div className="text-red-500 mb-4">{msg}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Username</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              u.role !== "admin" &&
              <tr key={u._id} className="border-t">
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.username}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 cursor-pointer"
                      onClick={() => navigate(`/admin/update-user/${u._id}`)}
                    >
                      edit user
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 cursor-pointer"
                      onClick={() => deleteUser(u._id)}
                    >
                      delete user{" "}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;
