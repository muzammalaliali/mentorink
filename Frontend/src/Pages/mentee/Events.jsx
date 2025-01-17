import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Plus } from "lucide-react";
import { LiaDiceD20Solid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Model from "@/components/Model";
import { getAllSessions, GetSingleSession } from "@/store/features/event/eventSlice";
import { useNavigate, useParams } from "react-router-dom";

function Events() {
  const [open, setOpen] = useState(false);
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getAllSessions()); //get All product function
  }, [dispatch]);

  useEffect((eventId) => {
    dispatch(GetSingleSession(eventId)); //get All product function
  }, [dispatch, eventId]);

  if (status == "loading"){
    return (
      <div className="flex justify-center items-center h-full">
      <p>Loading Products...</p>
    </div>
    )
  }
    

  if (error == "error"){
    return (
      <div className="flex justify-center items-center h-full">
      <p>Error Products...</p>
    </div>
    )
  }

  return (
    <div className="p-4 md:px-6">
      <Card className="rounded-2xl shadow-lg h-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <LiaDiceD20Solid className="text-blue-500 h-6 w-6" />
              <span>All Sessions</span>
            </div>
            <div className="flex gap-4">
              <Button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200">
                <FaRegCalendarAlt className="mr-2" />
                Attend all
              </Button>
              <Button
                onClick={() => setOpen(true)}
                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition duration-200 flex items-center"
              >
                <Plus className="mr-2" />
                Add Session
              </Button>
            </div>
          </div>
        </CardHeader>

        <hr className="my-4" />
        
        <CardContent className="overflow-auto">
          <Table>
            <TableHeader className="bg-gray-200 text-gray-700">
              <TableRow>
                <TableHead>Sr. No</TableHead>
                <TableHead>Session Name</TableHead>
                <TableHead>Session Type</TableHead>
                <TableHead>Session Date</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Time Zone</TableHead>
                <TableHead>Link</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events &&
              events.events &&
              events.events.map((event, index) => (
                <TableRow key={event._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{event.eventName}</TableCell>
                  <TableCell>{event.eventType}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.startTime}</TableCell>
                  <TableCell>{event.endTime}</TableCell>
                  <TableCell>{event.timezone}</TableCell>
                  <TableCell>
                    <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Join
                    </a>
                  </TableCell>
                  <TableCell>
                    <Button variant="link" className="text-red-500 hover:text-red-600">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Model open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default Events;
