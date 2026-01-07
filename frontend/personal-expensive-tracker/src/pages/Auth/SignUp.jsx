import React, { useContext, useState } from "react";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Input/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../../context/userContext";
import uploadImage from "../../utils/uploadImage";

import bgImage from "../../assets/images/login-bg.jpg";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(null);

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center
                 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Blur card */}
      <div
        className="relative z-10 w-full max-w-lg p-6
                   bg-white/30 backdrop-blur-md
                   border border-white/30
                   rounded-xl shadow-xl"
      >
        <h3 className="text-xl font-semibold text-black">
          Create an Account
        </h3>
        <p className="text-xs text-gray-700 mt-1 mb-6">
          Join with Personal Expense Tracker
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Michel Andrew"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="username@example.com"
              type="text"
            />

            <div className="md:col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="********"
                type="password"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs pb-2.5">{error}</p>
          )}

          <button type="submit" className="btn-primary w-full mt-2">
            SIGN UP
          </button>

          <p className="text-[13px] text-black-800 mt-3 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium underline text-green-600"
            >
              LOGIN
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
