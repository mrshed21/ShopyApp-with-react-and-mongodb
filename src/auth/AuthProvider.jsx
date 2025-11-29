import { useEffect, useState } from "react";
import { AuthContext } from "./context";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkAuthStatus(token);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const checkAuthStatus = async (tokenfromstorage) => {
    try {
      const response = await fetch("http://103.177.249.170:3000/api/users/verify", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenfromstorage}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch("http://103.177.249.170:3000/api/users/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setUser(data.user);
        return { success: true, data };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message };
      }
    } catch (error) {
      return { success: false, error: "Login failed", errorMessage: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch("http://103.177.249.170:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem("token", data.token);
        return { success: true, data };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message };
      }
    } catch {
      return { success: false, error: "Register failed" };
    }
  };

  const logout = async () => {
    try {
      await fetch("http://103.177.249.170:3000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error(e);
    } finally {
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    refreshAuth: checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
