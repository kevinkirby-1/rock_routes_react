import axios from "axios";
import api from "../api/axiosConfig";
import type { AppUser } from "../types/User";

export const registerUser = async (userData: AppUser) => {
  try {
    // Try to register user via api
    const response = await api.post("/auth/register", userData);
    const { token, user } = response.data;
    // Store JWT and User
    if (token && user) {
      localStorage.setItem("userToken", token);
      localStorage.setItem("currentUser", JSON.stringify(user));
    }
    return response.data;
  } catch (error) {
    // Registration failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    // Try to log user in
    const response = await api.post("/auth/login", credentials);
    const { token, user } = response.data;
    // Store JWT and User
    if (token && user) {
      localStorage.setItem("userToken", token);
      localStorage.setItem("currentUser", JSON.stringify(user));
    }
    return response.data;
  } catch (error) {
    // Log in failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};

export const loginWithGoogle = async (googleIdToken: string) => {
  try {
    // Send google id to backend for verification
    const response = await api.post("/auth/google", { token: googleIdToken });
    const { user, token } = response.data;

    if (token && user) {
      localStorage.setItem("userToken", response.data.token); // Store your backend's JWT
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      console.log("No User Data Received.");
    }
    return response.data;
  } catch (error) {
    // Log in failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};

export const logoutUser = () => {
  localStorage.removeItem("userToken"); // Clear the JWT
  localStorage.removeItem("currentUser"); // Clear user data
};

export const getCurrentUser = () => {
  const userJson = localStorage.getItem("currentUser");
  if (userJson) {
    return JSON.parse(userJson) as AppUser;
  }
};
