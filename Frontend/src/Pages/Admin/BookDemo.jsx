import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DeleteBookDemo } from '@/store/features/auth/bookingDemo/bookDemoSlice';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
// import { getAllBookDemo } from '@/store/features/auth/bookingDemo/bookDemoSlice';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function BookDemo() {
    const [booking, setBooking] = useState([]);
    const dispatch = useDispatch();

  useEffect(function(){
    axios
    .get(`${import.meta.env.VITE_BASE_URL}/bookDemo/all`, {
                  // automatically send cookies
                  withCredentials: true,    
                  headers: { "Content-Type": "application/json" },
                })
    .then(function(result){
    //   console.log(result);
      setBooking(result?.data?.booking)
    })
    .catch(function(error){
      console.log(error)
    })
  }, [])

  const handleDelete = (bookDemoId) => {
    dispatch(DeleteBookDemo(bookDemoId))
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
    <div>
        <Card className='bg-gray-200'>
            <CardHeader>
                <CardTitle className='font-semibold font-poppins text-gray-900'>Book a demo</CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold font-poppins text-gray-700">
                    Sr No#
                  </TableHead>
                  <TableHead className="font-semibold font-poppins text-gray-700">
                    Name
                  </TableHead>
                  <TableHead className="font-semibold font-poppins text-gray-700">
                    Company
                  </TableHead>
                  <TableHead className="font-semibold font-poppins text-gray-700">
                    Role
                  </TableHead>
                  <TableHead className="font-semibold font-poppins text-gray-700">
                    Email
                  </TableHead>
                  <TableHead className="font-semibold font-poppins text-gray-700">
                    Date
                  </TableHead>
                  <TableHead className="font-semibold font-poppins text-gray-700">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {booking?.map((bookDemo, index) => {
                return (
                  <TableRow key={bookDemo._id}>
                      <TableCell>{index+1}</TableCell>
                      <TableCell className="font-poppins text-gray-900">{bookDemo.name}</TableCell>
                      <TableCell className="font-poppins text-gray-900">{bookDemo.companyName}</TableCell>
                      <TableCell className="font-poppins text-gray-900">{bookDemo.role}</TableCell>
                      <TableCell className="font-poppins text-gray-900">{bookDemo.email}</TableCell>
                      <TableCell className="font-poppins text-gray-900">{moment(bookDemo.createdAt).format("DD-MM-YYYY")}</TableCell>
                      {/* <TableCell className="hidden sm:table-cell"> */}
                            {/* <Badge className="text-xs" variant="secondary">
                              {product.statu}
                            </Badge> */}
                          {/* </TableCell> */}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className='bg-gray-200'>
                            <DropdownMenuLabel className="font-poppins text-gray-900 font-semibold">Actions</DropdownMenuLabel>
                            {/* <DropdownMenuItem>
                              <button
                               onClick={()=>{
                                navigate(
                                  `/admin/products/update/${product._id}`
                                  )}}>
                                    Edit
                              </button>
                            </DropdownMenuItem> */}
                            <DropdownMenuItem><button className="font-poppins text-gray-900 font-semibold" onClick={()=>{handleDelete(bookDemo._id)}}>Delete</button></DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                );
              })}
              </TableBody>
            </Table>
            </CardContent>
        </Card>
    </div>
  )
}

export default BookDemo