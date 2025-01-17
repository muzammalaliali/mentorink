import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { ToastContainer } from 'react-toastify';

import RegisterPage from "./Pages/RegisterPage";
import { LoginPage } from "./Pages/LoginPage";
import DashboardLayout from "./Pages/Admin/DashboardLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import Users from "./Pages/Admin/Users";
import ScheduleMeeting from "./Pages/ScheduleMeeting";
import Mentor from "./Pages/Admin/mentor";
import Mentee from "./Pages/Admin/mentee";
import DashboardLayoutMentor from "./Pages/mentor/DashboardLayoutMentor";
import DashboardLayoutMentee from "./Pages/mentee/DashboardLayoutMentee";
import Events from "./Pages/mentee/Events";
import Community from "./Pages/mentee/Community";
import Learning from "./Pages/mentee/Learning";
import Chat from "./Pages/mentee/Chat";
import AdminEvents from "./Pages/Admin/AdminEvents";
import DashboardMentor from "./Pages/mentor/DashboardMentor";
import RegisterMentee from "./Pages/RegisterMentee";
import AdminLoginPage from "./Pages/AdminLoginPage";
import { MentorLoginPage } from "./Pages/MentorLoginPage";
import Session from "./Pages/mentor/Session";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";

// Main Application Component
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith("/admin")
  const isMentor = location.pathname.startsWith("/mentor")
  const isMentee = location.pathname.startsWith("/mentee")

  // Get user role from localStorage or any global state management
  const userRole = localStorage.getItem("role"); // 'admin', 'mentor', 'mentee'

  useEffect(() => {
    // If there's no role stored in localStorage or global state, and if user is not logged in, redirect to login
    // if (!userRole && location.pathname !== "/login" && location.pathname !== "/register") {
    //   navigate("/login");
    //   return;
    // }

    // Redirect users to appropriate dashboards based on their role
    if (userRole === "admin" && !location.pathname.startsWith("/admin")) {
      navigate("/admin");
    } else if (userRole === "mentor" && !location.pathname.startsWith("/mentor")) {
      navigate("/mentor");
    } 
    else if (userRole === "mentee" && !location.pathname.startsWith("/mentee")) {
      navigate("/mentee");
    }
  }, [userRole, location, navigate]);

  return (
    <>
        {isAdmin && isMentee && isMentor && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element= {<HomePage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminLogin" element={<AdminLoginPage />} />
        <Route path="/mentorLogin" element={<MentorLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/registerMentee" element={<RegisterMentee />} />
        <Route path="/scheduleMeeting" element={<ScheduleMeeting />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="users/mentor" element={<Mentor />} />
          <Route path="users/mentee" element={<Mentee />} />
          <Route path="adminEvents" element={<AdminEvents />} />
        </Route>

        {/* Mentor Routes */}
        <Route path="/mentor" element={<DashboardLayoutMentor />} >
        <Route index element={<DashboardMentor />} />
        <Route path="session" element={<Session />} />
        </Route>

        {/* Mentee Routes */}
        <Route path="/mentee" element={<DashboardLayoutMentee />}>
          <Route index element={<Community />} />
          <Route path="learning" element={<Learning />} />
          <Route path="events" element={<Events />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
