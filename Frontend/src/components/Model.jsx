import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { BiLogoZoom } from "react-icons/bi";
import DatePicker from "react-datepicker";
import { VscLink } from "react-icons/vsc";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { AddSessions } from "@/store/features/event/eventSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BsMicrosoftTeams } from "react-icons/bs";

function Model({ open, onClose, children }) {
  const [inputValues, setInputValues] = useState({
    eventName: "",
    eventType: "",
    date: new Date(), // Default to today's date
    startTime: null,
    endTime: null,
    timezone: "",
    joinUrl: "",
  });

  const timezones = [
    { value: "UTC-12:00", label: "(UTC-12:00) Baker/Howland Island" },
    { value: "UTC-11:00", label: "(UTC-11:00) Niue, Samoa" },
    { value: "UTC-10:00", label: "(UTC-10:00) Hawaii-Aleutian Standard Time, Cook Islands" },
    { value: "UTC-09:30", label: "(UTC-09:30) Marquesas Islands" },
    { value: "UTC-09:00", label: "(UTC-09:00) Alaska, Gambier Islands" },
    { value: "UTC-08:00", label: "(UTC-08:00) Pacific Time (US & Canada), Baja California" },
    { value: "UTC-07:00", label: "(UTC-07:00) Mountain Time (US & Canada), Chihuahua, Arizona" },
    { value: "UTC-06:00", label: "(UTC-06:00) Central Time (US & Canada), Mexico City, Guatemala" },
    { value: "UTC-05:00", label: "(UTC-05:00) Eastern Time (US & Canada), Lima, Bogotá" },
    { value: "UTC-04:00", label: "(UTC-04:00) Atlantic Time (Canada), Caracas, La Paz" },
    { value: "UTC-03:30", label: "(UTC-03:30) Newfoundland" },
    { value: "UTC-03:00", label: "(UTC-03:00) Brazil, Buenos Aires, Greenland, Uruguay" },
    { value: "UTC-02:00", label: "(UTC-02:00) South Georgia/Sandwich Islands" },
    { value: "UTC-01:00", label: "(UTC-01:00) Azores, Cape Verde Islands" },
    { value: "UTC+00:00", label: "(UTC+00:00) Greenwich Mean Time, London, Casablanca" },
    { value: "UTC+01:00", label: "(UTC+01:00) Central European Time, Lagos, Algiers" },
    { value: "UTC+02:00", label: "(UTC+02:00) Eastern European Time, Cairo, Johannesburg" },
    { value: "UTC+03:00", label: "(UTC+03:00) Moscow, Riyadh, Nairobi" },
    { value: "UTC+03:30", label: "(UTC+03:30) Tehran" },
    { value: "UTC+04:00", label: "(UTC+04:00) Dubai, Samara, Baku" },
    { value: "UTC+04:30", label: "(UTC+04:30) Kabul" },
    { value: "UTC+05:00", label: "(UTC+05:00) Pakistan Standard Time, Yekaterinburg" },
    { value: "UTC+05:30", label: "(UTC+05:30) India Standard Time, Sri Lanka Time" },
    { value: "UTC+05:45", label: "(UTC+05:45) Nepal Time" },
    { value: "UTC+06:00", label: "(UTC+06:00) Bangladesh Time, Bhutan Time, Omsk" },
    { value: "UTC+06:30", label: "(UTC+06:30) Cocos Islands, Myanmar" },
    { value: "UTC+07:00", label: "(UTC+07:00) Thailand, Vietnam, Jakarta" },
    { value: "UTC+08:00", label: "(UTC+08:00) China Standard Time, Singapore, Perth" },
    { value: "UTC+08:45", label: "(UTC+08:45) Eucla" },
    { value: "UTC+09:00", label: "(UTC+09:00) Japan Standard Time, Korea Standard Time" },
    { value: "UTC+09:30", label: "(UTC+09:30) Australian Central Time" },
    { value: "UTC+10:00", label: "(UTC+10:00) Australian Eastern Time, Vladivostok" },
    { value: "UTC+10:30", label: "(UTC+10:30) Lord Howe Island" },
    { value: "UTC+11:00", label: "(UTC+11:00) Solomon Islands, Magadan" },
    { value: "UTC+12:00", label: "(UTC+12:00) New Zealand, Fiji, Kamchatka" },
    { value: "UTC+12:45", label: "(UTC+12:45) Chatham Islands" },
    { value: "UTC+13:00", label: "(UTC+13:00) Tonga, Samoa" },
    { value: "UTC+14:00", label: "(UTC+14:00) Line Islands" }
  ];
  

  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (field, value) => {
    setInputValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AddSessions(inputValues))
      .unwrap()
      .then((response) => {
        if (response?.success) {
          toast.success(response?.message, { autoClose: 1000 });
          setTimeout(() => navigate("/mentee/events"), 1000);
        } else {
          toast.error(response?.message, { autoClose: 1000 });
        }
      })
      .catch((error) => toast.error(error, { autoClose: 1000 }));
  };

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-10 flex flex-col gap-5"
      >
        <Card className="w-full h-full rounded-2xl shadow-lg">
          <div className="sticky p-4 flex items-center justify-between border-b border-gray-200 bg-white">
            <h1 className="text-lg font-semibold font-poppins">Create Event</h1>
            <button onClick={onClose} aria-label="Close Modal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="eventName" className="font-poppins">
                    Event Name
                  </Label>
                  <Input
                    id="eventName"
                    name="eventName"
                    placeholder="Enter event name"
                    value={inputValues.eventName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="eventType" className="font-poppins">
                    Event Type
                  </Label>
                  <Input
                    id="eventType"
                    name="eventType"
                    placeholder="Enter event type"
                    value={inputValues.eventType}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2 mt-2">
              <Label htmlFor="eventType" className="font-poppins">
                    Preferences
                  </Label>
                  <Input
                    id="preferences"
                    name="preferences"
                    placeholder="Enter event type"
                    value={inputValues.preferences}
                    onChange={handleChange}
                    required
                  />
              </div>
              </div>

              <Card className="w-full bg-white shadow-md rounded-md p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="block text-sm font-poppins">
                      Date
                    </Label>
                    <div className="relative">
                      <DatePicker
                        id="date"
                        selected={inputValues.date}
                        onChange={(date) => handleDateChange("date", date)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <FaCalendarAlt className="absolute top-3 right-3 text-gray-500" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="timezone" className="block text-sm font-poppins">
                      Timezone
                    </Label>
                    <select
                      id="timezone"
                      name="timezone"
                      value={inputValues.timezone}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {/* Add your timezone options here */}
                      {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="startTime" className="block text-sm font-poppins">
                      Start Time
                    </Label>
                    <div className="relative">
                      <DatePicker
                        id="startTime"
                        selected={inputValues.startTime}
                        onChange={(time) => handleDateChange("startTime", time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <FaClock className="absolute top-3 right-3 text-gray-500" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="endTime" className="block text-sm font-poppins">
                      End Time
                    </Label>
                    <div className="relative">
                      <DatePicker
                        id="endTime"
                        selected={inputValues.endTime}
                        onChange={(time) => handleDateChange("endTime", time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <FaClock className="absolute top-3 right-3 text-gray-500" />
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex flex-col items-center justify-center gap-4 bg-gray-100 rounded-md w-full p-2">
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-2 w-36 bg-white text-gray-600 border rounded-md p-2"
                    onClick={() => setSelectedPlatform("Zoom")}
                  >
                    <div className="p-2 rounded-md bg-blue-600">
                      <BiLogoZoom className="text-white" />
                    </div>
                    Zoom
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-2 w-40 bg-white text-gray-600 border rounded-md p-2"
                    onClick={() => setSelectedPlatform("Google Meet")}
                  >
                    <div className="p-2 rounded-md bg-gray-200">
                      <VscLink className="text-blue-600" />
                    </div>
                    Google Meet
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-2 w-40 bg-white text-gray-600 border rounded-md p-2"
                    onClick={() => setSelectedPlatform("Ms teams")}
                  >
                    <div className="p-2 rounded-md bg-gray-200">
                      <BsMicrosoftTeams className="text-blue-600" />
                    </div>
                    Ms Teams
                  </button>
                </div>

                {selectedPlatform && (
                  <div className="flex flex-col items-center gap-2 w-full">
                    <p className="text-gray-600">
                      Paste your {selectedPlatform} meeting link below:
                    </p>
                    <Input
                      id="joinUrl"
                      name="joinUrl"
                      type="text"
                      value={inputValues.joinUrl}
                      onChange={handleChange}
                      placeholder={`Enter ${selectedPlatform} meeting link`}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
              >
                Create Event
              </Button>
            </form>
          </CardContent>
        </Card>
        {children}
      </div>
    </div>
  );
}

export default Model;
