import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import 'react-datepicker/dist/react-datepicker.css';
import ICON from '../assets/icon.png';

function ScheduleMeeting() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-8">
      <Card className="w-full max-w-6xl bg-white shadow-md rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="flex-1 p-6 md:p-8 bg-white">
            <div className="flex items-center mb-6">
              <img src={ICON} alt="" width={50} height={50} className="mr-4" />
              <h1 className="text-2xl font-bold">Mentor Booking Platform</h1>
            </div>
            <hr className="mb-6" />
            <h2 className="text-lg text-gray-600">Mentor Team</h2>
            <h3 className="text-xl font-bold mt-4">Exploration Call</h3>
            <p className="text-gray-500 mt-2 font-semibold">1 hr</p>
            <p className="mt-4">Web conferencing details provided upon confirmation.</p>
            <hr className="my-4" />
            <ul className="list-disc pl-5 space-y-2">
              <li>Discuss mentoring goals and areas of expertise</li>
              <li>Understand pricing and availability</li>
              <li>Get answers to questions about mentoring sessions</li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="flex-1 p-6 md:p-8 bg-gray-100 flex flex-col items-center">
            <h2 className="text-2xl mb-4 text-center">Select a Date & Time</h2>

            {/* Calendar */}
            <div className="bg-white w-full max-w-md shadow-md p-4 mb-6 rounded-lg">
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                minDate={new Date()}
                inline
              />
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <>
                <h3 className="text-lg mb-4">Select a Time</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {times.map((time) => (
                    <button
                      key={time}
                      className={`px-4 py-2 rounded border focus:outline-none ${
                        selectedTime === time
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Confirmation */}
            {selectedDate && selectedTime && (
              <div className="mt-6 text-center">
                <p className="text-gray-700">
                  You selected <strong>{selectedDate.toDateString()}</strong> at <strong>{selectedTime}</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ScheduleMeeting;
