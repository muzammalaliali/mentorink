import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User2 } from "lucide-react"
import Calendar1 from '../../assets/Calendar.png'
import { FaRegCalendarAlt } from "react-icons/fa"
import { useEffect, useState } from "react"
import axios from "axios"


function Dashboard() {
  const [mentorCount, setMentorCount] = useState(0);
  const [menteeCount, setMenteeCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/auth/user-counts`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        const { mentors, mentees } = response.data.data;
        setMentorCount(mentors);
        setMenteeCount(mentees);
      })
      .catch((error) => {
        console.error("Error fetching user counts:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/event/event-counts`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        const { events } = response.data.data;
        setEventCount(events);
      })
      .catch((error) => {
        console.error("Error fetching user counts:", error);
      });
  }, []);
return (
    <>
        <div>
        <Card className='h-full shadow-ring focus:ring-gray-500 w-full'>
            <CardHeader>
                <span className='text-2xl font-semibold font-poppins text-gray-600'>Dashboard</span>
            </CardHeader>
            <hr />
            <CardContent className='w-full mt-2 p-8'>
                <div className='flex items-center justify-center gap-4'>
                <div className='p-8 border w-60 h-full bg-slate-200 rounded-lg'>
                <div className='flex items-center justify-center gap-1'>
                    <User2 className='h-4 w-4 text-gray-700' />
                    <span className='text-gray-700 text-lg font-poppins'>Total Mentor</span>
                </div>
                <div className='flex items-center justify-center'>
                    <span className='font-bold font-poppins text-gray-700'>{mentorCount}</span>
                </div>
                </div>
                <div className='p-8 border w-60 h-full bg-orange-200 rounded-lg'>
                <div className='flex items-center justify-center gap-1'>
                    <FaRegCalendarAlt className='h-4 w-4 text-gray-700' />
                    <span className='text-gray-700 text-lg font-poppins'>Total Sessions</span>
                </div>
                <div className='flex items-center justify-center'>
                    <span className='font-bold font-poppins text-gray-700'>{eventCount}</span>
                </div>
                </div>
                <div className='p-8 border w-60 h-full bg-blue-200 rounded-lg'>
                <div className='flex items-center justify-center gap-1'>
                    <User2 className='h-4 w-4 text-gray-700' />
                    <span className='text-gray-700 text-lg font-poppins'>Total Mentees</span>
                </div>
                <div className='flex items-center justify-center'>
                    <span className='font-bold font-poppins text-gray-700'>{menteeCount}</span>
                </div>
                </div>
                </div>
                <div>
                <div className='flex items-center justify-center'>
                    <img src={Calendar1} className='h-60 w-60' alt="" />
                </div>
                <div className='flex items-center justify-center'>
                <span className='text-gray-600 font-poppins'>No session enrolled</span>
                </div>
                </div>
                
            </CardContent>
        </Card>
        </div>
    </>
  )
}

export default Dashboard