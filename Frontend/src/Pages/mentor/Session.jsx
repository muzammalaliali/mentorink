import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LiaDiceD20Solid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllSessions, GetSingleSession } from "@/store/features/event/eventSlice";
import { useNavigate, useParams } from "react-router-dom";

function Session() {
    const [mentees, setMentees] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [userRole, setUserRole] = useState(""); // State to hold the current user's role
    const events = useSelector((state) => state.events.events);
    const status = useSelector((state) => state.events.status);
    const error = useSelector((state) => state.events.error);
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch all sessions
    useEffect(() => {
        dispatch(getAllSessions());
    }, [dispatch]);

    // Fetch the specific session
    useEffect(() => {
        if (eventId) {
            dispatch(GetSingleSession(eventId));
        }
    }, [dispatch, eventId]);

    // Fetch the current user's role (mentor or mentee)
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/auth/all-users`, { withCredentials: true }) // Assuming your API provides the current user info
            .then((response) => {
                setUserRole(response.data.role); // Set the role from the API response (mentor or mentee)
            })
            .catch((error) => {
                console.error("Error fetching user role:", error);
            });
    }, []);

    // Fetch all users with the 'mentee' role
    useEffect(() => {
        if (userRole === "mentor") { // Only fetch mentees if the user is a mentor
            axios
                .get(`${import.meta.env.VITE_BASE_URL}/auth/all-users`, { withCredentials: true })
                .then((response) => {
                    setMentees(response.data.mentees); // Assuming your API returns mentees data
                })
                .catch((error) => {
                    console.error("Error fetching mentees:", error);
                });
        }
    }, [userRole]);

    // Fetch all users with the 'mentor' role
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/auth/all-users`, { withCredentials: true })
            .then((response) => {
                setMentors(response.data.mentors); // Assuming your API returns mentors data
            })
            .catch((error) => {
                console.error("Error fetching mentors:", error);
            });
    }, []);

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-full">
                <p>Loading Products...</p>
            </div>
        );
    }

    if (error === "error") {
        return (
            <div className="flex justify-center items-center h-full">
                <p>Error Products...</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:px-6">
            <Card className="rounded-2xl shadow-lg h-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-lg font-semibold">
                            <LiaDiceD20Solid className="text-blue-500 h-6 w-6" />
                            <span>All Sessions Created by Mentees</span>
                        </div>
                    </div>
                </CardHeader>

                <hr className="my-4" />

                <CardContent className="overflow-auto">
                    {/* Mentees Table (only visible if user is a mentor) */}
                    {userRole === "mentor" && (
                        <>
                            <h2 className="text-xl font-semibold">Mentees</h2>
                            <Table>
                                <TableHeader className="bg-gray-200 text-gray-700">
                                    <TableRow>
                                        <TableHead>Sr. No</TableHead>
                                        <TableHead>Mentee Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Assigned Session</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mentees.map((mentee, index) => (
                                        <TableRow key={mentee._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{mentee.name}</TableCell>
                                            <TableCell>{mentee.email}</TableCell>
                                            <TableCell>
                                                {events &&
                                                    events.events &&
                                                    events.events
                                                        .filter((event) => event.createdBy === mentee._id) // Only events created by this mentee
                                                        .map((event) => (
                                                            <span key={event._id}>{event.eventName}</span>
                                                        ))}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </>
                    )}

                    <hr className="my-4" />

                    {/* Events Table for Mentor (All mentee-created events) */}
                    {userRole === "mentor" && (
                        <>
                            <h2 className="text-xl font-semibold">All Events Created by Mentees</h2>
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
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {events &&
                                        events.events &&
                                        events.events
                                            .filter((event) => mentees.some((mentee) => mentee._id === event.createdBy)) // Filter events created by any mentee
                                            .map((event, index) => (
                                                <TableRow key={event._id}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{event.eventName}</TableCell>
                                                    <TableCell>{event.eventType}</TableCell>
                                                    <TableCell>{event.date}</TableCell>
                                                    <TableCell>{event.startTime}</TableCell>
                                                    <TableCell>{event.endTime}</TableCell>
                                                    <TableCell>{event.timezone}</TableCell>
                                                    <TableCell>
                                                        <a
                                                            href={event.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            Join
                                                        </a>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                </TableBody>
                            </Table>
                        </>
                    )}

                    <hr className="my-4" />

                    {/* Mentors Table */}
                    <h2 className="text-xl font-semibold">Mentors</h2>
                    <Table>
                        <TableHeader className="bg-gray-200 text-gray-700">
                            <TableRow>
                                <TableHead>Sr. No</TableHead>
                                <TableHead>Mentor Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Assigned Session</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mentors.map((mentor, index) => (
                                <TableRow key={mentor._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{mentor.name}</TableCell>
                                    <TableCell>{mentor.email}</TableCell>
                                    <TableCell>
                                        {events &&
                                            events.events &&
                                            events.events
                                                .filter((event) => event.createdBy === mentor._id) // Only events created by this mentor
                                                .map((event) => (
                                                    <span key={event._id}>{event.eventName}</span>
                                                ))}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default Session;
