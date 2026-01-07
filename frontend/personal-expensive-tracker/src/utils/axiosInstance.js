import axios from "axios";
import { BASE_URL } from "./apiPaths";

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: BASE_URL,              // Base URL for all API requests
    timeout: 10000,                 // Timeout for requests in milliseconds (10s)
    headers: {
        "Content-Type": "application/json", // Send JSON data by default
        Accept: "application/json"          // Expect JSON responses
    }
});

// Request interceptor to add authorization token to headers if available
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token"); // Get token from localStorage
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; // Add token to request headers
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Response interceptor to handle common API response errors
axiosInstance.interceptors.response.use(
    (response) => {
        // Simply return the response if successful
        return response;
    },
    (error) => {
        // Handle error responses
        if (error.response) {
            if (error.response.status === 401) {
                // Unauthorized, redirect to login
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                // Internal server error
                console.error("Server error. Please try again later.");
            }
        } else if (error.code === "ECONNABORTED") {
            // Request timeout
            console.error("Request timeout. Please try again.");
        }
        return Promise.reject(error); // Reject the promise so the calling code can handle it
    }
);

export default axiosInstance;
