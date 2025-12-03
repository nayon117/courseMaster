import axiosPublic from "./axiosPublic";

// Register
export const registerUser = async (userData) => {
  const { data } = await axiosPublic.post("/auth/register", userData);
  return data;
};

// Login
export const loginUser = async (userData) => {
  const { data } = await axiosPublic.post("/auth/login", userData);
  return data;
};

// Logout
export const logoutUser = async () => {
  const { data } = await axiosPublic.post("/auth/logout");
  return data;
};

// Get current logged-in user
export const getMe = async () => {
  const { data } = await axiosPublic.get("/auth/me");
  return data;
};
