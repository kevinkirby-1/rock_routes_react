import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Response Interceptor (Optional: for global error handling, e.g., token expiry)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Example: If 401 Unauthorized and not a login attempt, redirect to login
//     if (error.response && error.response.status === 401 && !error.config.url.includes('/auth/login')) {
//       console.error('Authentication expired or invalid. Redirecting to login...');
//       // You'd typically clear token and redirect the user here
//       localStorage.removeItem('userToken');
//       // window.location.href = '/login'; // Or use React Router's history.push
//     }
//     return Promise.reject(error);
//   }
// );

export default api;