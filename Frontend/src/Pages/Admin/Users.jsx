import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteUser } from "@/store/features/auth/authSlice";
// import { fetchAllUsers } from "@/store/features/auth/authSlice";
import axios from "axios";
// import axios from "axios";
import { User2 } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Users() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  useEffect(function(){
    axios
    .get(`${import.meta.env.VITE_BASE_URL}/auth/all-users`, {
                  // automatically send cookies
                  withCredentials: true,    
                  headers: { "Content-Type": "application/json" },
                })
    .then(function(result){
      console.log(result.data.users);
      setUsers(result?.data?.users)
    })
    .catch(function(error){
      console.log(error)
    })
  }, [])

  const handleDelete = (userId) => {
      dispatch(DeleteUser(userId))
      .unwrap()
      .then((response) => {
        if (response?.success == true){
          toast.success(response?.message, {autoClose: 1000});
        }else{
          toast.error(response?.message, {autoClose: 1000})
        }
        
      })
      .catch((error) => {
        toast.error(error, {autoClose: 1000})
        // console.log(error)
      });
    }
  return (
    <>
      <Card className="">
      <div className="flex items-end justify-end gap-4 mt-3 mr-3">
      <Link to="/admin/users/mentor">
          <Button className='bg-green-500 rounded hover:bg-green-600 gap-0 font-poppins'>
            <User2 />Mentors</Button>
        </Link>
        <Link to="/admin/users/mentee">
          <Button className='bg-orange-500 rounded hover:bg-orange-600 gap-0 font-poppins'>
            <User2 />Mentees</Button>
        </Link>
      </div>
        <CardHeader>
        <div className="flex justify-between items-center">
        <CardTitle className="font-semibold md:text-2xl font-poppins text-gray-700">Users</CardTitle>
        
      </div>
          <CardDescription className='font-poppins'>
            A user is a casual name given to an individual who interacts with a
            website, online service, app or platform in any way.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Card className="">
            <Table>
                  <TableHeader className='bg-slate-200'>
                  <TableRow>
                    <TableHead className='font-poppins font-semibold'>Sr.No</TableHead>
                    <TableHead className='font-poppins font-semibold'>User Name</TableHead>
                    <TableHead className='font-poppins font-semibold'>User Email</TableHead>
                    <TableHead className='font-poppins font-semibold'>User Role</TableHead>
                    <TableHead className='font-poppins font-semibold'>Date</TableHead>
                    <TableHead className='font-poppins font-semibold'>Actions</TableHead>
                  </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users?.map(function(user, index){
                      return (
                          <TableRow key={user._id}>
                    <TableCell className='font-poppins text-gray-700'>{index + 1}</TableCell>
                    <TableCell className='font-poppins text-gray-700'>{user.name}</TableCell>
                    <TableCell className='font-poppins text-gray-700'>{user.email}</TableCell>
                    <TableCell className='font-poppins text-gray-700'>{user.role}</TableCell>
                    <TableCell className='font-poppins text-gray-700'>{moment(user.createdAt).format("DD-MM-YYYY")}</TableCell>
                    <TableCell>
                      <Button variant="link" className='font-poppins text-green-600 font-semibold'>Edit</Button>
                      <Button onClick={()=>{handleDelete(user._id)}} variant="link" className='font-semibold font-poppins text-blue-600'>Delete</Button>
                    </TableCell>
                  </TableRow>
                      )
                    })}        
                  </TableBody>
            </Table>
            </Card>
        </CardContent>
      </Card>
    </>
  );
}

export default Users;


