import React, { createContext, useState } from "react";

// Create a context for user data
export const UserContext = createContext();

// Provider component to wrap the app and provide user state
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store logged-in user data

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clear user data (e.g., on logout)
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
