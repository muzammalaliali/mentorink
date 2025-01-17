import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ShowModel from "@/components/ShowModel";
import MentorModel from "@/components/MentorModel";
import { DeleteSessions, getAllSessions } from "@/store/features/event/eventSlice";
import { toast } from "react-toastify";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

function AdminEvents() {
  const [showModelOpen, setShowModelOpen] = useState(false);
  const [mentorModelOpen, setMentorModelOpen] = useState(false);
  const [joinUrl, setJoinUrl] = useState("");
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSessions());
  }, [dispatch]);

  const handleDelete = (eventId) => {
    dispatch(DeleteSessions(eventId))
      .unwrap()
      .then((response) => {
        if (response?.success) {
          toast.success(response?.message, { autoClose: 1000 });
          dispatch(getAllSessions());
        } else {
          toast.error(response?.message, { autoClose: 1000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 1000 });
      });
  };

  const handleCheckUrl = (url) => {
    setJoinUrl(url); // Set the joinUrl for the ShowModel
    setShowModelOpen(true); // Open the ShowModel
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading Events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Error Loading Events...</p>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-semibold md:text-2xl font-poppins text-gray-700">
              Sessions
            </CardTitle>
          </div>
          <CardDescription className="font-poppins">
            A user is a casual name given to an individual who interacts with a
            website, online service, app, or platform in any way.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Card>
            <Table>
              <TableHeader className="bg-slate-200">
                <TableRow>
                  <TableHead className="font-poppins font-semibold">Sr.No</TableHead>
                  <TableHead className="font-poppins font-semibold">Session Name</TableHead>
                  <TableHead className="font-poppins font-semibold">Session Type</TableHead>
                  <TableHead className="font-poppins font-semibold">User</TableHead>
                  <TableHead className="font-poppins font-semibold">Session Date</TableHead>
                  <TableHead className="font-poppins font-semibold">Start time</TableHead>
                  <TableHead className="font-poppins font-semibold">End time</TableHead>
                  <TableHead className="font-poppins font-semibold">Link</TableHead>
                  <TableHead className="font-poppins font-semibold">Refer</TableHead>
                  <TableHead className="font-poppins font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events?.events?.map((event, index) => (
                  <TableRow key={event._id}>
                    <TableCell className="font-poppins text-gray-700">{index + 1}</TableCell>
                    <TableCell className="font-poppins text-gray-700">{event.eventName}</TableCell>
                    <TableCell className="font-poppins text-gray-700">{event.eventType}</TableCell>
                    <TableCell className="font-poppins text-gray-700">{event.user.name}</TableCell>
                    <TableCell className="font-poppins text-gray-700">{event.date}</TableCell>
                    <TableCell className="font-poppins text-gray-700">{event.startTime}</TableCell>
                    
                    <TableCell className="font-poppins text-gray-700">{event.endTime}</TableCell>
                    <TableCell className="font-poppins text-gray-700">
                      <button
                        onClick={() => handleCheckUrl(event.joinUrl)}
                        className="w-28 rounded-md bg-slate-300 p-2 text-green-700"
                      >
                        Check Url
                      </button>
                    </TableCell>
                    <TableCell><button
                              className=" font-poppins hover:text-blue-600 underline"
                              onClick={() => setMentorModelOpen(true)} // Open the MentorModel on Refer button click
                            >
                              Refer
                            </button></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <button className=" font-poppins">Edit</button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <button
                              onClick={() => handleDelete(event.eventID)}
                              variant="link"
                              className=" font-poppins"
                            >
                              Delete
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </CardContent>
      </Card>

      {/* ShowModel and MentorModel */}
      <ShowModel open={showModelOpen} onClose={() => setShowModelOpen(false)} />
      <MentorModel open={mentorModelOpen} onClose={() => setMentorModelOpen(false)} />
    </div>
  );
}

export default AdminEvents;
