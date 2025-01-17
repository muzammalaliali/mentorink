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
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Mentee() {
  const [mentees, setMentees] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/auth/all-users`, {
        // Automatically send cookies
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((result) => {
        // Filter users to include only mentees
        const menteeData = result?.data?.users?.filter(
          (user) => user.role === "mentee"
        );
        setMentees(menteeData);
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
          setMentees((prev) => prev.filter((user) => user._id !== userId));
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
              Mentees
            </CardTitle>
          </div>
          <CardDescription className="font-poppins">
            A mentee is an individual who seeks guidance, advice, and support
            from a mentor to grow personally or professionally.
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
                  <TableHead className="font-poppins font-semibold">Preferences</TableHead>
                  <TableHead className="font-poppins font-semibold">Date</TableHead>
                  <TableHead className="font-poppins font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mentees?.map((mentee, index) => (
                  <TableRow key={mentee._id}>
                    <TableCell className="font-poppins text-gray-700">{index + 1}</TableCell>
                    <TableCell className="font-poppins text-gray-700">{mentee.name}</TableCell>
                    <TableCell className="font-poppins text-gray-700">{mentee.email}</TableCell>
                    <TableCell className="font-poppins text-gray-700">
                      {mentee.preferences || "N/A"}
                    </TableCell>
                    <TableCell className="font-poppins text-gray-700">
                      {moment(mentee.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        className="font-poppins text-green-600 font-semibold"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(mentee._id)}
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

export default Mentee;
