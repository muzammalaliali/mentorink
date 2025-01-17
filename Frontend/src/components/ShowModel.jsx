import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import axios from "axios";

function ShowModel({ open, onClose, children }) {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Fetch all events on component mount
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/event`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data.events)
        setEvents(response?.data?.events || []);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  // Handler to select an event
  const handleSelectEvent = (eventId) => {
    setSelectedEventId(eventId); // Set the ID of the selected event
  };

  // Get the selected event details
  const selectedEvent = events.find((event) => event._id === selectedEventId);

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/30" : "invisible"
      }`}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Card className="w-80 h-auto rounded-2xl shadow-lg">
          <div className="sticky p-4 flex items-center justify-between border-b border-gray-200 bg-white">
            <h1 className="text-lg font-semibold font-poppins">Meeting URL</h1>
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
            <Label>Copy URL</Label>
            {selectedEvent ? (
              // Show only the selected event's URL
              <div>
                <Input value={selectedEvent.joinUrl} readOnly />
                <button
                  className="text-red-500 underline mt-2"
                  onClick={() => setSelectedEventId(null)}
                >
                  Back to List
                </button>
              </div>
            ) : (
              // Show a list of events if no event is selected
              events.map((event) => (
                <div
                  key={event._id}
                  className="flex justify-between items-center mt-2"
                >
                  <span className="text-sm">{event.eventName}</span>
                  <button
                    className="text-blue-500 underline"
                    onClick={() => handleSelectEvent(event._id)}
                  >
                    Check URL
                  </button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
        {children}
      </div>
    </div>
  );
}

export default ShowModel;
