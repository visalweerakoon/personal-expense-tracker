import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {/* Input label */}
      <label className='text-[13px] text-state-800'>{label}</label>

      <div className='input-box'>
        {/* Input field */}
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-name"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {/* Password visibility toggle */}
        {type === "password" && (
          <FaRegEye
            size={22}
            className="text-primary cursor-pointer"
            onClick={toggleShowPassword}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
