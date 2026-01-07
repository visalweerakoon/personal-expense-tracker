import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Input/Input';
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../../context/userContext';
import loginBg from "../../assets/images/login-bg.jpg";

const Login = () => {
  // State to hold email, password, error message, and loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Context to update user info globally
  const { updateUser } = useContext(UserContext);

  // Hook to programmatically navigate between pages
  const navigate = useNavigate();

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Trim inputs to remove accidental whitespace
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Validate email format
    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Check if password is empty
    if (!trimmedPassword) {
      setError("Please enter the password.");
      return;
    }

    // Reset error and set loading state
    setError(null);
    setLoading(true);

    try {
      // Make API call to login endpoint
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      const { token, user } = response.data;

      // If login successful, store token and update user context
      if (token) {
        localStorage.setItem("token", token); // Persist token
        updateUser(user); // Update user in global context
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (err) {
      // Show error message from API or fallback message
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
  <div
    className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
    style={{ backgroundImage: `url(${loginBg})` }}
  >
    <div className="absolute inset-0 bg-black/40"></div>

<div className="relative z-10 w-full max-w-md p-6 rounded-xl 
                bg-white/30 backdrop-blur-md 
                border border-white/30 shadow-xl">
      <h3 className="text-xl font-semibold">Welcome Back!</h3>
      <p className="text-xs mt-1 mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="username@example.com"
          type="text"
          autoFocus
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="********"
          type="password"
        />

        {error && (
          <p className="text-red-500 text-xs pb-2.5">{error}</p>
        )}

        <button
          type="submit"
          className="btn-primary mt-2 w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>

        <p className="text-[13px] text-black-700 mt-3 text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium underline text-green-600 hover:text-green-700"
          >
            SIGN UP
          </Link>
        </p>
      </form>
    </div>
  </div>
);


};

export default Login;
