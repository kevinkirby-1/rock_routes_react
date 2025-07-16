import axios from "axios";
import api from "../api/axiosConfig";
import type { ClimbingGym } from "../types/Gym";

export const createGym = async (gymData: ClimbingGym) => {
  try {
    // Add gym to db
    const response = await api.post("/gyms", gymData);
    return response.data;
  } catch (error) {
    // Adding gym failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};

export const getGyms = async () => {
  try {
    // Get all gyms for current user
    const response = await api.get("/gyms");
    return response.data;
  } catch (error) {
    // Getting gyms failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};

export const deleteGym = async (id: string) => {
  try {
    // Delete gym
    const response = await api.delete(`/gyms/${id}`);
    return response.data; // Often an empty object or success message
  } catch (error) {
    // Deleting the gym failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};

export const getGymById = async (id: string) => {
  try {
    // Get single gym by id
    const response = await api.get(`/gyms/${id}`);
    return response.data;
  } catch (error) {
    // Getting gym failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};

export const updateGym = async (id: string, gymData: ClimbingGym) => {
  try {
    // Update gym
    const response = await api.put(`/gyms/${id}`, gymData);
    return response.data;
  } catch (error) {
    // Updating gym failed
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw String(error);
    }
  }
};
