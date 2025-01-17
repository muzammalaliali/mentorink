import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { User2 } from 'lucide-react'
import React from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import Calendar1 from '../../assets/Calendar.png'

function DashboardMentor() {
  return (
    <div>
        <Card className='h-full shadow-ring focus:ring-gray-500 w-full'>
            <CardHeader>
                <span className='text-2xl font-semibold font-poppins text-gray-600'>Mentors Dashboard</span>
            </CardHeader>
            <hr />
            <CardContent className='w-full mt-2 p-8'>
                <div className='flex items-center justify-center gap-4'>
                <div className='p-8 border w-60 h-full bg-slate-200 rounded-lg'>
                <div className='flex items-center justify-center gap-1'>
                    <User2 className='h-4 w-4 text-gray-700' />
                    <span className='text-gray-700 text-lg font-poppins'>Total Mentees</span>
                </div>
                <div className='flex items-center justify-center'>
                    <span className='font-bold font-poppins text-gray-700'>50</span>
                </div>
                </div>
                <div className='p-8 border w-60 h-full bg-orange-200 rounded-lg'>
                <div className='flex items-center justify-center gap-1'>
                    <FaRegCalendarAlt className='h-4 w-4 text-gray-700' />
                    <span className='text-gray-700 text-lg font-poppins'>Total Sessions</span>
                </div>
                <div className='flex items-center justify-center'>
                    <span className='font-bold font-poppins text-gray-700'>50</span>
                </div>
                </div>
                <div className='p-8 border w-60 h-full bg-blue-200 rounded-lg'>
                <div className='flex items-center justify-center gap-1'>
                    <User2 className='h-4 w-4 text-gray-700' />
                    <span className='text-gray-700 text-lg font-poppins'>Total Mentees</span>
                </div>
                <div className='flex items-center justify-center'>
                    <span className='font-bold font-poppins text-gray-700'>50</span>
                </div>
                </div>
                <div className='p-8 border w-60 h-full bg-green-200 rounded-lg'>
                <div className='flex items-center justify-center gap-1'>
                    <User2 className='h-4 w-4 text-gray-700' />
                    <span className='text-gray-700 text-lg font-poppins'>Total Mentees</span>
                </div>
                <div className='flex items-center justify-center'>
                    <span className='font-bold font-poppins text-gray-700'>50</span>
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
  )
} 

export default DashboardMentor