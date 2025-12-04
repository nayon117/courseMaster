import { createContext, useState, useEffect } from "react";
import axiosPublic from "../api/axiosPublic";
import { loginUser, registerUser,logoutUser } from "../api/authService";
import axiosPrivate from "../api/axiosPrivate";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  // Sync axios header with stored token
  useEffect(() => {
    if (token) {
      axiosPublic.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axiosPublic.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // LOGIN
  const login = async (email, password, adminKey = "") => {
    const res = await loginUser(email, password, adminKey);

    setUser(res.user);
    setToken(res.token);

    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("token", res.token);
  };

  // REGISTER
  const register = async (name, email, password) => {
    const res = await registerUser(name, email, password);

    setUser(res.user);
    setToken(res.token);

    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("token", res.token);
  };

  // LOGOUT
 const logout = async () => {
  await logoutUser(); 
  setUser(null);
  setToken(null);

  localStorage.removeItem("user");
  localStorage.removeItem("token");

  // Clear axiosPrivate default header
  delete axiosPrivate.defaults.headers.common["Authorization"];
};


  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
