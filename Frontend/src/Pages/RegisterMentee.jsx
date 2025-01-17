import { Link, useNavigate } from "react-router-dom";
import loginPic from "../assets/Login2.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/store/features/auth/authSlice";
import { FiLogIn } from "react-icons/fi";

export default function RegisterMentee() {
  const [inputValues, setInputValues] = useState({ name: "", email: "", password: "" });
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = { ...inputValues, role: "mentee" }; // Add hidden role

    dispatch(register(dataToSubmit))
      .unwrap()
      .then((response) => {
        if (response?.success === true) {
          toast.success(response?.message, { autoClose: 1000 });
          setTimeout(() => {
            navigate("/login"); // Redirect to login or home page
          }, 1000);
        } else {
          toast.error(response?.message, { autoClose: 1000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 1000 });
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
            Welcome to Mentor Link!
          </h1>
          <p className="text-lg text-gray-300 font-poppins">
            Join the best platform to manage your mentoring journey effectively.
          </p>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex flex-1 justify-center items-center p-5">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-700 font-poppins">
                Register for <span className="text-green-400">Mentor Link</span>
              </h2>
              <p className="text-gray-500 mt-2 font-poppins">
                Enter your details to create an account as a mentee.
              </p>
            </div>

            {/* Hidden Role Field */}
            <input type="hidden" name="role" value="mentee" />

            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name" className="font-medium text-gray-600 font-poppins">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                className="w-full border-gray-300 focus:ring-green-500"
                value={inputValues.name}
                onChange={handleChange}
              />
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
                value={inputValues.email}
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
                value={inputValues.password}
                onChange={handleChange}
              />
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              className="w-full py-2 bg-green-500 text-white font-bold hover:bg-green-600 transition font-poppins"
            >
              <FiLogIn className="inline mr-2" />
              Register
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 font-poppins mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-green-500 hover:underline font-poppins">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
