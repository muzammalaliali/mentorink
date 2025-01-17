import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { logout } from "@/store/features/auth/authSlice";
import { Home, LogOut, Users2 } from "lucide-react";
import React, { useState } from "react";
import {
  FaChartPie,
  FaBook,
  FaCalendarAlt,
  FaBox,
  FaCogs,
  FaRobot,
  FaChartLine,
  FaPlug,
  FaPalette,
  FaSun,
  FaMoon,
  FaRegCalendarCheck
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DashboardLayout (){
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
    .unwrap()
    .then((response) => {
      if (response?.success == true){
        toast.success(response?.message, {autoClose: 1000});
        setTimeout(() => {
          navigate("/adminLogin")
        }, 1000);
      }else{
        toast.error(response?.message, {autoClose: 1000})
      }
      
    })
    .catch((error) => {
      toast.error(error, {autoClose: 1000})
      // console.log(error)
    });
    
  }


  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
      } min-h-screen flex flex-col`}
    >
      {/* Header */}
      <header className="p-4 shadow-md bg-gray-200 dark:bg-gray-800 flex justify-between items-center">
        <h1 className="text-2xl font-bold font-poppins">Mentor<span className="text-orange-500">link</span></h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full focus:outline-none"
        >
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
  {/* Sidebar */}
  <aside className="w-16 md:w-44 bg-gray-800 text-white flex flex-col items-center py-4 space-y-2">
    <div>
    <Link
      to="/admin"
      className="flex items-center md:items-start gap-2 font-medium font-poppins text-gray-100 hover:bg-gray-700 p-2 rounded-lg transition"
    >
      <FaChartPie className="h-5 w-5" />
      <h1 className="hidden md:block text-sm">Dashboard</h1>
    </Link>
    <Link
      to="/admin/adminEvents"
      className="flex items-center md:items-start gap-2 font-medium font-poppins text-gray-100 hover:bg-gray-700 p-2 rounded-lg transition"
    >
      <FaCalendarAlt className="h-5 w-5" />
      <h1 className="hidden md:block text-sm">Sessions</h1>
    </Link>
    
    <Link
      to="/"
      className="flex items-center md:items-start gap-2 font-medium font-poppins text-gray-100 hover:bg-gray-700 p-2 rounded-lg transition"
    >
      <FaPalette className="h-5 w-5" />
      <h1 className="hidden md:block text-sm">Appearance</h1>
    </Link>
      <Link
                      to="/admin/users"
                      className="flex items-center md:items-start gap-2 font-medium font-poppins text-gray-100 hover:bg-gray-700 p-2 rounded-lg transition"
                    >
                      <Users2 className="h-5 w-5" />
                      <h1 className="hidden md:block text-sm">Users</h1>
                    </Link>
                    
                    <Button className='bg-gray-800 hover:bg-white hover:bg-opacity-20' onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                    <h1 className="hidden md:block text-sm">Log Out</h1>
                    </Button>
                    
                  
                  {/* <DropdownMenuItem>
                    <Link
                      to="/admin/categories"
                      className="flex items-center gap-3 rounded-lg  px-3 py-2 font-poppins text-muted-foreground transition-all hover:text-primary"
                    >
                      <PackageCheck className="h-4 w-4" />
                      Categories{" "}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      to="/admin/brands"
                      className="flex items-center gap-3 rounded-lg  px-3 py-2 font-poppins text-muted-foreground transition-all hover:text-primary"
                    >
                      <Shield className="h-4 w-4" />
                      Brand{" "}
                    </Link>
                  </DropdownMenuItem> */}

    </div>
  </aside>
  {/* Right-side content: Render child routes */}
  <main className="flex-1 p-6">
          <Outlet />
        </main>
</div>


      {/* Footer */}
      <footer className="p-4 text-center bg-gray-700 text-white">
        &copy; 2025 Dashboard Inc. All Rights Reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;
