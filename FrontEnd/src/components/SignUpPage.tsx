import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSignup = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      toast.error("All fields are required.", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const isAlreadyRegistered = existingUsers.find(
      (user) => user.email === email
    );

    if (isAlreadyRegistered) {
      toast.error("User already registered with this email.", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    // Store new user in localStorage
    const updatedUsers = [...existingUsers, { username, email, password }];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    toast.success("Signup Successful!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2D1B0E] px-4 py-10">
      <form
        onSubmit={handleSignup}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-amber-600">
          Create Account
        </h2>

        {/* Username Field */}
        <div className="relative">
          <FaUser className="absolute left-3 top-4 text-amber-400" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>

        {/* Email Field */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-4 text-amber-400" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <FaLock className="absolute left-3 top-4 text-amber-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-amber-500 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-300"
        >
          Sign Up
        </button>

        {/* Login Redirect */}
        <p className="text-sm text-center text-amber-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-amber-800 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
