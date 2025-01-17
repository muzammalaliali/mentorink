import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from './ui/card';
import { Button } from './ui/button';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function MentorModel({ open, onClose, mentee, children }) {
  const [mentors, setMentors] = useState([]);
  const [assignedMentor, setAssignedMentor] = useState(null);
  const navigate = useNavigate();

  // Fetch mentors from backend
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/auth/all-users`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((result) => {
        // Filter users to include only mentors
        const mentorData = result?.data?.users?.filter(
          (user) => user.role === "mentor"
        );
        setMentors(mentorData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAssignMentor = (userId) => {
    // Ensure the mentee exists and has the role of "mentee"
    if (!mentee || mentee.role !== "mentee" || !mentee._id) {
      toast.error("Invalid mentee. Ensure the selected user is a mentee.");
      return;
    }
  
    // Find the mentor based on the provided mentorId
    const selectedMentor = mentors.find((user) => user._id === userId && user.role === "mentor");
    if (!selectedMentor) {
      toast.error("Invalid mentor. Ensure the selected user is a mentor.");
      return;
    }
  
    // Simulate the assignment of the mentor to the mentee
    // Update local state with the assigned mentor
    setAssignedMentor(selectedMentor);
  
    // Simulate updating mentee's assigned mentor ID and their role to "mentor"
    const updatedMentee = { ...mentee, assignedMentorId: selectedMentor._id }; // Add mentor ID to mentee
    console.log("Updated Mentee:", updatedMentee);
  
    // Simulate success message
    toast.success(`${mentee.name} has been successfully assigned to ${selectedMentor.name} as their mentor.`);
  
    // Optionally, update the UI to reflect changes (e.g., mentee assigned to mentor)
    // You could render updated mentee details or other UI elements here.
  
    // Optionally, redirect to a dashboard or another page after assignment
    setTimeout(() => {
      navigate('/mentor-dashboard');  // Redirect to the mentor dashboard
    }, 1500);
  };
  
  
  
  
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/30" : "invisible"}`}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Card>
          <CardHeader>
            <div className="sticky p-4 flex items-center justify-between border-b border-gray-200 bg-white">
              <h1 className="text-2xl underline font-semibold font-poppins">Available Mentors</h1>
              <button onClick={onClose} aria-label="Close Modal">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <CardDescription className="font-poppins">
              A mentor is an individual who provides guidance, expertise, and support to others in their personal or professional development.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-slate-200">
                <TableRow>
                  <TableHead className="font-poppins font-semibold">Sr.No</TableHead>
                  <TableHead className="font-poppins font-semibold">Name</TableHead>
                  <TableHead className="font-poppins font-semibold">Email</TableHead>
                  <TableHead className="font-poppins font-semibold">Expertise</TableHead>
                  <TableHead className="font-poppins font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mentors?.map((mentor, index) => (
                  <TableRow key={mentor._id}>
                    <TableCell className="font-poppins text-gray-700">{index + 1}</TableCell>
                    <TableCell className="font-poppins text-gray-700">{mentor.name}</TableCell>
                    <TableCell className="font-poppins text-gray-700">{mentor.email}</TableCell>
                    <TableCell className="font-poppins text-gray-700">
                      {mentor.expertise?.join(", ") || "N/A"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        className="font-poppins text-green-600 font-semibold"
                        onClick={() => handleAssignMentor(mentor._id)} // Assign mentor when button is clicked
                      >
                        Assign
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {children}
      </div>
    </div>
  );
}

export default MentorModel;
