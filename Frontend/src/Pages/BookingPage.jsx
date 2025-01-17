// import React, { useState } from "react";
// import AMS from "../assets/logo1.png";
// import Logo2 from "../assets/logo2.png";
// import Logo3 from "../assets/logo3.png";
// import Logo4 from "../assets/logo4.png";
// import Ahmad from "../assets/Ahmad.jpg";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { AddBookDemo } from "@/store/features/auth/bookingDemo/bookDemoSlice";
// import { toast } from "react-toastify";

// const BookingPage = () => {
//   const [inputValues, setInputValues] = useState({});
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInputValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(AddBookDemo(inputValues))
//       .unwrap()
//       .then((response) => {
//         if (response?.success) {
//           toast.success(response?.message, { autoClose: 1000 });
//           setTimeout(() => {
//             navigate("/booking");
//           }, 1000);
//         } else {
//           toast.error(response?.message, { autoClose: 1000 });
//         }
//       })
//       .catch((error) => {
//         toast.error(error, { autoClose: 1000 });
//       });
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
//       {/* Wrapper */}
//       <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//         {/* Left Side */}
//         <div className="space-y-6">
//           <h1 className="text-2xl md:text-3xl font-bold font-poppins text-gray-800">
//             Send us a message or directly schedule a meeting in order to
//           </h1>
//           <ul className="space-y-2 text-lg text-gray-700">
//             <li className="flex items-start">
//               <span className="text-orange-500 font-bold text-lg font-poppins mr-2">
//                 ✔
//               </span>
//               See our platform in a live demo
//             </li>
//             <li className="flex items-start">
//               <span className="text-orange-500 font-bold text-lg mr-2 font-poppins">
//                 ✔
//               </span>
//               Get further info about features
//             </li>
//             <li className="flex items-start">
//               <span className="text-orange-500 font-bold font-poppins text-lg mr-2">
//                 ✔
//               </span>
//               Understand pricing and get a specific quote
//             </li>
//             <li className="flex items-start">
//               <span className="text-orange-500 font-bold font-poppins text-lg mr-2">
//                 ✔
//               </span>
//               Discuss timelines & roadmap
//             </li>
//           </ul>
//           <div className="flex items-center space-x-4">
//             <img src={Ahmad} alt="Ahmad" className="w-12 h-12 rounded-full" />
//             <div>
//               <p className="font-bold text-gray-800 font-poppins">
//                 Muhammad Ahmad
//               </p>
//               <p className="text-gray-600 font-poppins">Customer Success</p>
//             </div>
//           </div>
//           <p className="text-lg text-gray-800 font-semibold font-poppins">
//             Trusted & Enjoyed by{" "}
//             <span className="text-orange-500 font-poppins">
//               a Family of Pioneers
//             </span>
//           </p>
//           <div className="flex space-x-4">
//             <img src={AMS} alt="CocaCola" className="w-16 h-10" />
//             <img src={Logo2} alt="Siemens" className="w-16 h-10" />
//             <img src={Logo3} alt="AMS" className="w-16 h-10" />
//             <img src={Logo4} alt="General Electric" className="w-16 h-10" />
//           </div>
//         </div>

//         {/* Right Side */}
//         <form onSubmit={handleSubmit}>
//           <div className="relative flex flex-col sm:flex-row sm:items-start">
//             <Card className="bg-gray-900 p-16 rounded-2xl shadow-lg space-y-6">
//               <h2 className="text-2xl text-gray-100 font-bold font-poppins">
//                 See how Mentorink can empower you via a live{" "}
//                 <span className="text-orange-500 font-bold">demo & chat:</span>
//               </h2>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   placeholder="Your Name"
//                   required
//                   className="w-full bg-gray-900 p-3 font-poppins rounded-lg border border-gray-300 text-gray-100 focus:outline-none"
//                   value={inputValues.name || ""}
//                   onChange={handleChange}
//                 />
//                 <input
//                   id="companyName"
//                   name="companyName"
//                   type="text"
//                   placeholder="Your Company"
//                   required
//                   className="w-full bg-gray-900 p-3 font-poppins rounded-lg border border-gray-300 text-gray-100 focus:outline-none"
//                   value={inputValues.companyName || ""}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <input
//                   id="role"
//                   name="role"
//                   type="text"
//                   placeholder="Your Role"
//                   required
//                   className="w-full bg-gray-900 p-3 font-poppins rounded-lg border border-gray-300 text-gray-100 focus:outline-none"
//                   value={inputValues.role || ""}
//                   onChange={handleChange}
//                 />
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="Your Email"
//                   required
//                   className="w-full bg-gray-900 p-3 font-poppins rounded-lg border border-gray-300 text-gray-100 focus:outline-none"
//                   value={inputValues.email || ""}
//                   onChange={handleChange}
//                 />
//               </div>
//               <textarea
//                 id="description"
//                 name="description"
//                 type="text"
//                 placeholder="Tell us more about your plans so that we can help you faster"
//                 required
//                 className="w-full bg-gray-900 p-3 font-poppins rounded-lg border border-gray-300 text-gray-100 focus:outline-none"
//                 rows={4}
//                 value={inputValues.description || ""}
//                 onChange={handleChange}
//               ></textarea>
//               <div className="flex items-center justify-center">
//                 <Button
//                   type="submit"
//                   className="bg-orange-500 text-white p-3 border border-orange-500 mb-16 rounded-lg font-semibold hover:bg-gray-900 sm:w-40 sm:h-14 w-full"
//                 >
//                   Submit
//                 </Button>
//               </div>
//             </Card>
//             <Card className="mt-4 sm:mt-0 sm:absolute sm:top-[560px] sm:right-[60px] p-8 bg-gray-200">
//               <h2 className="text-center font-medium font-poppins text-[#617798]">
//                 Are you ready to book a meeting with us? Secure your <br />
//                 slot here{" "}
//                 <Link to="/scheduleMeeting" className="text-orange-500 hover:text-gray-900 cursor-pointer">
//                   Schedule a Meeting
//                 </Link>
//               </h2>
//             </Card>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;
