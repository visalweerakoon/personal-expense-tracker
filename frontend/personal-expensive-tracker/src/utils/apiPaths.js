// Base URL for API requests
export const BASE_URL = "http://localhost:8000";

// All API endpoints organized by module
export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",               // Endpoint for user login
        REGISTER: "/api/v1/auth/register",         // Endpoint for user registration
        GET_USER_INFO: "/api/v1/auth/getUser",     // Endpoint to get current user info
        UPLOAD_IMAGE: "/api/v1/auth/upload-image"  // Endpoint to upload user profile image
    },
    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard"              // Endpoint to fetch dashboard data
    },
    INCOME: {
        ADD_INCOME: "/api/v1/income/add",         // Endpoint to add new income
        GET_ALL_INCOME: "/api/v1/income/get",     // Endpoint to fetch all income records
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,  // Endpoint to delete a specific income by ID
        DOWNLOAD_INCOME: "/api/v1/income/downloadexcel"             // Endpoint to download all income records as Excel
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/add",       // Endpoint to add new expense
        GET_ALL_EXPENSE: "/api/v1/expense/get",   // Endpoint to fetch all expense records
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`, // Endpoint to delete a specific expense by ID
        DOWNLOAD_EXPENSE: "/api/v1/expense/downloadexcel"           // Endpoint to download all expense records as Excel
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/v1/auth/upload-image", // Another reference for image upload
    }
};
