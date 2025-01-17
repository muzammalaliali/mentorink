import express from "express";
import userModel from '../models/userModel.js'
import { encryptPassword, matchPassword } from "../helper/userHelper.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const registerController = async (req, res) => {
  try {
    const { name, email, password, role, expertise, availability, preferences } = req.body;
    if (!name || !email || !password || !role) {
      res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    //  Checking user duplicate email
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res.status(400).send({
        success: false,
        message: "Email already exist",
      });
    }
    // encrypting userPassword
    const hashedPassword = await encryptPassword(password);

    const validRoles = ["admin", "mentor", "mentee"];
    if (!validRoles.includes(role)) {
      return res.status(400).send({
        success: false,
        message: "Invalid role. Role must be 'mentor' or 'participant'.",
      });
    }

     // If role is "mentor," validate and include availability
     let validatedAvailability = [];
     if (role === "mentor") {
       if (availability && Array.isArray(availability)) {
         // Validate availability structure
         for (const slot of availability) {
           if (
             !slot.day ||
             !slot.timeZone ||
             !slot.timeSlots ||
             !Array.isArray(slot.timeSlots) ||
             slot.timeSlots.some(
               (timeSlot) =>
                 !timeSlot.date || !timeSlot.startTime || !timeSlot.endTime
             )
           ) {
             return res.status(400).send({
               success: false,
               message: "Invalid availability format",
             });
           }
         }
         validatedAvailability = availability; // Assign validated availability
       } else {
         return res.status(400).send({
           success: false,
           message: "Availability is required for mentors",
         });
       }
     }

    // create new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      expertise: role === "mentor" ? expertise || [] : [], // Default to an empty array if not provided
      availability: role === "mentor" ? validatedAvailability : [],
      preferences
    });
    return res
      .status(201)
      .send({
        success: true,
        message: "User Registration Successful",
        newUser,
      });
  } catch (error) {
    console.log(`registerController Error ${error}`);
    res.status(400).send({
      success: false,
      message: "error in registerController",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    // check user email is present in database or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Email Does not Exists",
      });
    }
    // matching password
    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Incorrect Email/Password",
      });
    }
    // generating token

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
    });
    // remove password field to send user data from backend to frontend
    user.password = undefined;
    // success response
    return res
      .cookie("token", token, { httpOnly: true, secure: true })
      .status(200)
      .send({
        success: true,
        message: "Login successful",
        user,
        token,
      });

    // return res.status(200).send({ success: true, message: "Login successful" });
  } catch (error) {
    console.log(`loginController Error ${error}`);
    res.status(400).send({
      success: false,
      message: "error in loginController",
      error,
    });
  }
};

const logoutController = async (req, res) => {
  return res
    .cookie("token", "", { httpOnly: true, secure: true, expires: new Date(0) }) // to remove cookies from browser cookies
    .status(200)
    .send({
      success: true,
      message: "Logout successful",
    });
};

const allUsersController = async (req, res) => {
  try {
    // find all users in database
    const users = await userModel.find({}).select("-password");
    if (!users) {
      return res.status(404).send({
        success: false,
        message: "No user found",
      });
    }

    return res.status(200).send({
      success: true,
      total: users.length,
      message: "All users fetched successfully",
      users,
    });

    // return res.status(200).send({ success: true, message: "Login successful" });
  } catch (error) {
    console.log(`allUsersController Error ${error}`);
    res.status(400).send({
      success: false,
      message: "error in allUsersController",
      error,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // await userModel.findByIdAndDelete(userId)
    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(`deleteUserController Error: ${error}`);
    return res.status(404).send({
      success: false,
      message: "Error in deleteUserController",
    });
  }
};

const getUserCounts = async (req, res) => {
  try {
    const mentorCount = await userModel.countDocuments({ role: "mentor" });
    const menteeCount = await userModel.countDocuments({ role: "mentee" });

    res.status(200).send({
      success: true,
      data: {
        mentors: mentorCount,
        mentees: menteeCount,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching user counts",
      error,
    });
  }
};


export {
  registerController,
  loginController,
  logoutController,
  allUsersController,
  deleteUserController,
  getUserCounts
};
