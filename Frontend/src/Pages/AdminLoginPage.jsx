import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {useDispatch, useSelector} from 'react-redux'
import { login } from "../store/features/auth/authSlice.js";

export default function AdminLoginPage() {
  const [inputValues, setinputValues] = useState({});
  // const status = useSelector((state) => state.auth.status);
  const {status} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setinputValues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(inputValues))
      .unwrap()
      .then((response) => {
        if (response?.success === true) {
          if (response?.user?.role === "admin") {
            toast.success(response?.message, { autoClose: 1000 });
            setTimeout(() => {
              navigate("/admin"); // Redirect to the admin dashboard
            }, 1000);
          } else {
            toast.error("Access Denied: Only admins can log in here.", {
              autoClose: 1500,
            });
          }
        } else {
          toast.error(response?.message, { autoClose: 1000 });
        }
      })
      .catch((error) => {
        toast.error(error?.message || "Login failed", { autoClose: 1000 });
      });
  };
  return (
    <div className="h-screen flex justify-center items-center ">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Login For Admin</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name="email"
                value={inputValues.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="******"
                type="password"
                required
                name="password"
                value={inputValues.password || ""}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled = {status == "loading" ? true: false}>
              {status == "loading" ? "Signing in...." : "Sign in"}
              </Button>
          </CardFooter>
        </form>
        {/* <div className="mb-5 mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/register" className="underline">
            Sign in
          </Link>
        </div> */}
      </Card>
    </div>
  );
}
