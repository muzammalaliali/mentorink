import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import Avatar from '../assets/avatar-18.jpg'
import formatNumber from 'format-number'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DeleteSessions, getAllSessions, GetSingleSession } from "@/store/features/event/eventSlice"
import { Button } from "./ui/button"



function EventCard({event}) {

    const [open, setOpen] = useState(false);
    const events = useSelector((state) => state.events.events);
    const status = useSelector((state) => state.events.status);
    const error = useSelector((state) => state.events.error);
    const dispatch = useDispatch();
    // const { eventID } = useParams();
  
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
      <div className="min-w-screen">
        <Link to={`/event/${event._id}`}>
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
                          <TableHead className="font-poppins font-semibold">Session Date</TableHead>
                          <TableHead className="font-poppins font-semibold">Start time</TableHead>
                          <TableHead className="font-poppins font-semibold">End time</TableHead>
                          <TableHead className="font-poppins font-semibold">Time zone</TableHead>
                          <TableHead className="font-poppins font-semibold">Link</TableHead>
                          <TableHead className="font-poppins font-semibold">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {events &&
                        events.events &&
                        events.events.map((event, index) => (
                          <TableRow key={event._id}>
                            <TableCell className="font-poppins text-gray-700">{index + 1}</TableCell>
                            <TableCell className="font-poppins text-gray-700">{event.eventName}</TableCell>
                            <TableCell className="font-poppins text-gray-700">{event.eventType}</TableCell>
                            <TableCell className="font-poppins text-gray-700">{event.date}</TableCell>
                            <TableCell className="font-poppins text-gray-700">{event.startTime}</TableCell>
                            <TableCell className="font-poppins text-gray-700">{event.endTime}</TableCell>
                            <TableCell className="font-poppins text-gray-700">{event.timezone}</TableCell>
                            <TableCell>
                              <Button
                                onClick={() => handleDelete(event.eventID)}
                                variant="link"
                                className="font-semibold font-poppins text-blue-600"
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </CardContent>
              </Card>
    </Link>

      </div>    
  )
}

export default EventCard