import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import loginPic from "../assets/Login2.jpg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiLogIn } from "react-icons/fi";
import { login } from "@/store/features/auth/authSlice";
import { toast } from "react-toastify";
import axios from "axios";

export function MentorLoginPage() {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });
  const [isMentor, setIsMentor] = useState(false); // Check if the user is a mentor
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Perform login by dispatching the input values including the role
    dispatch(login(inputValues))
      .unwrap()
      .then((response) => {
        if (response?.success === true) {
          if (response?.user?.role === "mentor") {
            toast.success(response?.message, { autoClose: 1000 });
            setTimeout(() => {
              navigate("/mentor"); // Redirect to the mentee dashboard
            }, 1000);
          } else {
            toast.error("You are not authorized to access this page", { autoClose: 1000 });
          }
        } else {
          toast.error(response?.message || "Login failed", { autoClose: 1000 });
        }
      })
      .catch((error) => {
        toast.error(error?.message || "Login failed", { autoClose: 1000 });
      });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Background */}
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${loginPic})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
        <div className="absolute bottom-10 left-10 text-white space-y-4">
          <h1 className="text-4xl font-semibold leading-tight font-poppins">
            Welcome Back!
          </h1>
          <p className="text-lg text-gray-300 font-poppins">
            Join the best platform to manage your sales and grow your business efficiently.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-1 justify-center items-center p-5">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-700 font-poppins">
                Log in to <span className="text-green-400">Mentor Link</span>
              </h2>
              <p className="text-gray-500 mt-2 font-poppins">
                Enter your email and password below to access your account.
              </p>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium text-gray-600 font-poppins">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full border-gray-300 focus:ring-green-500"
                value={inputValues.email || ""}
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="font-medium text-gray-600 font-poppins">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full border-gray-300 focus:ring-green-500"
                value={inputValues.password || ""}
                onChange={handleChange}
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full py-2 bg-green-500 text-white font-bold hover:bg-green-600 transition font-poppins"
            >
              <FiLogIn className="inline mr-2" />
              Log in
            </Button>
          </form>

          {/* Sign-Up Link */}
          <p className="text-center text-sm text-gray-600 font-poppins mt-4">
            Don’t have an account?{" "}
            <Link to="/registerMentor" className="font-medium text-green-500 hover:underline font-poppins">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
