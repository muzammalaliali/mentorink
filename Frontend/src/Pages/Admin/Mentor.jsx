import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteUser } from "@/store/features/auth/authSlice";
import axios from "axios";
import { User2 } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Mentor() {
  const [mentors, setMentors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/auth/all-users`, {
        // Automatically send cookies
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

  const handleDelete = (userId) => {
    dispatch(DeleteUser(userId))
      .unwrap()
      .then((response) => {
        if (response?.success === true) {
          toast.success(response?.message, { autoClose: 1000 });
          setMentors((prev) => prev.filter((user) => user._id !== userId));
        } else {
          toast.error(response?.message, { autoClose: 1000 });
        }
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: 1000 });
      });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-semibold md:text-2xl font-poppins text-gray-700">
              Mentors
            </CardTitle>
          </div>
          <CardDescription className="font-poppins">
            A mentor is an individual who provides guidance, expertise, and
            support to others in their personal or professional development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Card>
            <Table>
              <TableHeader className="bg-slate-200">
                <TableRow>
                  <TableHead className="font-poppins font-semibold">Sr.No</TableHead>
                  <TableHead className="font-poppins font-semibold">Name</TableHead>
                  <TableHead className="font-poppins font-semibold">Email</TableHead>
                  <TableHead className="font-poppins font-semibold">Expertise</TableHead>
                  <TableHead className="font-poppins font-semibold">Date</TableHead>
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
                    <TableCell className="font-poppins text-gray-700">
                      {moment(mentor.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        className="font-poppins text-green-600 font-semibold"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(mentor._id)}
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
    </>
  );
}

export default Mentor;
