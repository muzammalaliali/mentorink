import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RiHome5Line } from "react-icons/ri";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { IoBookOutline } from "react-icons/io5";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { LogOut } from 'lucide-react';
import { logout } from '@/store/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

function DashboardLayoutMentee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleLogout = () => {
      dispatch(logout())
      .unwrap()
      .then((response) => {
        if (response?.success == true){
          toast.success(response?.message, {autoClose: 1000});
          setTimeout(() => {
            navigate("/login")
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
    <div>
        <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-24 bg-gray-100">
        <div className="pl-8 pt-6">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
        </div>
        <nav className="mt-5">
            <div className='flex flex-col'>
            <div className='flex items-center justify-center mt-4'>
            <Link
            to="/mentee"
            className='className="flex font-poppins items-center justify-center px-4 py-2 text-muted-foreground hover:text-primary rounded-md"'
            >
                <div className='flex items-center justify-center'>
                <RiHome5Line className='h-5 w-5 font-medium' />
                </div>
            <span className='text-xs font-poppins'>Community</span>
            </Link>
            </div>
            <div className='flex items-center justify-center'>
            <Link
            to="/mentee/learning"
            className='className="flex font-poppins items-center justify-center px-4 py-2 text-muted-foreground hover:text-primary rounded-md"'
            >
                <div className='flex items-center justify-center'>
                <IoBookOutline className='h-5 w-5 font-medium' />
                </div>
            <span className='text-xs font-poppins'>Learning</span>
            </Link>
            </div>
            <div className='flex items-center justify-center'>
            <Link
            to="/mentee/events"
            className='className="flex font-poppins items-center justify-center px-4 py-2 text-muted-foreground hover:text-primary rounded-md"'
            >
                <div className='flex items-center justify-center'>
                <FaRegCalendarAlt className='h-5 w-5 font-medium' />
                </div>
            <span className='text-xs font-poppins'>Events</span>
            </Link>
            </div>
            <div className='flex items-center justify-center'>
            <Link
            to="/mentee/chat"
            className='className="flex font-poppins items-center justify-center px-4 py-2 text-muted-foreground hover:text-primary rounded-md"'
            >
                <div className='flex items-center justify-center'>
                <IoChatbubblesOutline className='h-5 w-5 font-medium' />
                </div>
            <span className='text-xs font-poppins'>Chats</span>
            </Link>
            
            </div>
            
            </div>
          
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <Input
            type="text"
            placeholder="Search..."
            className="max-w-screen-sm bg-white bg-opacity-50 border-gray-300"
          />
          <div className="flex items-center space-x-4">
              <IoMdHelpCircle className='h-8 w-8 text-blue-600 cursor-pointer' />
              <CiBookmark className='h-7 w-7 cursor-pointer' />
              <IoNotificationsOutline className='h-7 w-7 cursor-pointer' />
              <Button
              onClick={handleLogout}
              className="flex items-center justify-center px-4 py-2 bg-red-400 hover:text-gray-500 text-white hover:bg-gray-100 rounded-md"
            >
              <LogOut className='h-5 w-5 font-medium' />
              <span className='text-xs font-poppins'>Log Out</span>
            </Button>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
    </div>
  )
}

export default DashboardLayoutMentee