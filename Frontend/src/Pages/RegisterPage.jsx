import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { register } from "@/store/features/auth/authSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus } from "lucide-react";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function RegisterPage() {
  const [role, setRole] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [availability, setAvailability] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setRole(value);
    setInputValues((prev) => ({ ...prev, role: value }));
  };

  const addAvailability = () => {
    setAvailability((prev) => [
      ...prev,
      { day: "", timeZone: "", timeSlots: [{ startTime: null, endTime: null }] },
    ]);
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index][field] = value;
    setAvailability(updatedAvailability);
  };

  const handleTimeSlotChange = (availabilityIndex, slotIndex, field, value) => {
    const updatedAvailability = [...availability];
    updatedAvailability[availabilityIndex].timeSlots[slotIndex][field] = value;
    setAvailability(updatedAvailability);
  };

  const addTimeSlot = (availabilityIndex) => {
    const updatedAvailability = [...availability];
    updatedAvailability[availabilityIndex].timeSlots.push({
      startTime: null,
      endTime: null,
    });
    setAvailability(updatedAvailability);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      ...inputValues,
      availability: role === "mentor" ? availability : [],
    };

    dispatch(register(formData))
      .unwrap()
      .then((response) => {
        if (response?.success) {
          toast.success(response.message, { autoClose: 1000 });
          setTimeout(() => navigate("/admin/users"), 1000);
        } else {
          toast.error(response.message, { autoClose: 1000 });
        }
      })
      .catch((error) => toast.error(error, { autoClose: 1000 }));
  };

  return (
    <div className="bg-gray-200 relative min-h-screen bg-fixed bg-cover bg-center">
      <div className="absolute inset-0 flex justify-center items-center">
        <Card className="mx-4 sm:mx-auto w-full max-w-6xl bg-white bg-opacity-60 p-6 rounded-xl shadow-lg flex">
          <div className="flex-1 pr-4">
            <CardHeader>
              <CardTitle className="font-poppins font-semibold text-gray-700 underline">
                User Registration
              </CardTitle>
            </CardHeader>
            <Label htmlFor="role">Select Role</Label>
            <Select onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mentor">Mentor</SelectItem>
                <SelectItem value="mentee">Mentee</SelectItem>
              </SelectContent>
            </Select>

            {role && (
              <CardContent className="p-0 mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        required
                        value={inputValues.name || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={inputValues.email || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="********"
                        required
                        value={inputValues.password || ""}
                        onChange={handleChange}
                      />
                    </div>
                    {role === "mentor" && (
                      <div className="grid gap-2">
                        <Label htmlFor="expertise">Expertise</Label>
                        <Input
                          id="expertise"
                          name="expertise"
                          type="text"
                          placeholder="Enter your expertise"
                          required
                          value={inputValues.expertise || ""}
                          onChange={handleChange}
                        />
                      </div>
                    )}
                    {role === "mentee" && (
                      <div className="grid gap-2">
                        <Label htmlFor="preferences">Preferences</Label>
                        <Input
                          id="preferences"
                          name="preferences"
                          type="text"
                          placeholder="Enter your preferences"
                          required
                          value={inputValues.preferences || ""}
                          onChange={handleChange}
                        />
                      </div>
                    )}
                    <Button type="submit" className="w-full gap-1 bg-green-600 text-white">
                      <UserPlus />
                      Register as {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Button>
                  </div>
                </form>
              </CardContent>
            )}
          </div>

          {role === "mentor" && (
            <div className="flex-1 pl-4">
              <Label>Availability</Label>
              {availability.map((slot, index) => (
                <div key={index} className="grid gap-2 border p-4 rounded mb-4">
                  <Label>Day</Label>
                  <Select
                    onValueChange={(value) =>
                      handleAvailabilityChange(index, "day", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Label>Time Zone</Label>
                  <Input
                    type="text"
                    placeholder="e.g., PST"
                    value={slot.timeZone}
                    onChange={(e) =>
                      handleAvailabilityChange(index, "timeZone", e.target.value)
                    }
                  />
                  {slot.timeSlots.map((timeSlot, slotIndex) => (
                    <div key={slotIndex} className="grid gap-2">
                      <Label>Start Time</Label>
                      <DatePicker
                        selected={timeSlot.startTime}
                        onChange={(date) =>
                          handleTimeSlotChange(index, slotIndex, "startTime", date)
                        }
                        showTimeSelect
                        dateFormat="Pp"
                        placeholderText="Select Start Time"
                      />
                      <Label>End Time</Label>
                      <DatePicker
                        selected={timeSlot.endTime}
                        onChange={(date) =>
                          handleTimeSlotChange(index, slotIndex, "endTime", date)
                        }
                        showTimeSelect
                        dateFormat="Pp"
                        placeholderText="Select End Time"
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => addTimeSlot(index)}
                    className="mt-2"
                  >
                    Add Time Slot
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addAvailability} className="mt-4">
                Add Availability
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage;