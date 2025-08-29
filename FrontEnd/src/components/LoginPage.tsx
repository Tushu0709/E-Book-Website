import { GoogleLogin, googleLogout } from "@react-oauth/google";
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [googleUser, setGoogleUser] = useState(null);

  // Clear Google session on component mount to ensure fresh login
  React.useEffect(() => {
    googleLogout(); // This will clear the Google One Tap session
  }, []);

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please enter both email and password.", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("tempUserEmail", email);

      try {
        const response = await fetch("http://localhost:5000/api/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (data.success) {
          toast.success("OTP sent to your email!", {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
          });
          setShowOtpInput(true);
        } else {
          toast.error("Failed to send OTP. Try again.", {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
          });
        }
      } catch (error) {
        toast.error("Server error while sending OTP.", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });
      }
    } else {
      toast.error("Invalid credentials or unregistered user.", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  const handleVerifyOtp = async () => {
    const email = localStorage.getItem("tempUserEmail");

    if (!otp) {
      toast.error("Please enter OTP", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("OTP Verified. Login Successful!", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.email === email);

        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.removeItem("tempUserEmail");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error("Invalid OTP", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Failed to verify OTP", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  // Function to handle Google login success
  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setGoogleUser(decoded);

    // Clear any existing user data
    localStorage.removeItem("currentUser");
    localStorage.removeItem("tempUserEmail");

    // Store Google user data
    localStorage.setItem("googleUser", JSON.stringify(decoded));

    toast.success("Google login successful!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });

    setTimeout(() => navigate("/"), 1000);
  };

  // Function to handle Google login error
  const handleGoogleLoginError = () => {
    toast.error("Google login failed", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2D1B0E] px-4 py-10">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-amber-600">Login</h2>

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
        {!showOtpInput && (
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-300"
          >
            Login
          </button>
        )}

        {/* OTP Input Section */}
        {showOtpInput && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full pl-4 pr-4 py-3 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-300"
            >
              Verify OTP
            </button>
          </div>
        )}

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            useOneTap
            auto_select={false} // Disable auto-select to ensure fresh login each time
          />
        </div>

        {/* Signup Redirect */}
        <p className="text-sm text-center text-amber-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-amber-800 font-semibold hover:underline"
          >
            Register now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
