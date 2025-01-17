import express from 'express'
import userModel from '../models/userModel.js';
import { encryptPassword, matchPassword } from '../helper/userHelper.js';
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";



const registerController = async (req, res) => {
    try {
        const {name, email, password} = req.body;
    if(!name || !email || !password){
        res
        .status(400)
        .send({
            success: false, 
            message: "All fields are required"
        })
    }
    //  Checking user duplicate email
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res.status(400).send({
        success: false,
        message: "Email already exist",
      });
    };
    // encrypting userPassword
    const hashedPassword = await encryptPassword(password);
    // create new user
   const newUser = await userModel.create({
    name, 
    email, 
    password: hashedPassword});
   return res.status(201).send({success: true, message: "User Registration Successful", newUser})
    } catch (error) {
        console.log(`registerController Error ${error}`);
    res.status(400).send({
      success: false,
      message: "error in registerController",
      error,
    });
    }
}

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
      
      const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXP})
      // remove password field to send user data from backend to frontend
      user.password= undefined;
      // success response
      return res
      .cookie("token", token, { httpOnly: true, secure: true })
      .status(200)
      .send({
        success: true,
        message: "Login successful", user, token,
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
      .cookie("token", "", { httpOnly: true, secure: true, expires: new Date(0) })  // to remove cookies from browser cookies
      .status(200)
      .send({
        success: true,
        message: "Logout successful"
      });
  }
  
  
  const allUsersController = async (req,res) => {
    try {
     
      // find all users in database
      const users = await userModel.find({}).select("-password");
      if (!users) {
        return res.status(404).send({
          success: false,
          message: "No user found",
        });
      }
    
      return res
      .status(200)
      .send({
        success: true,
        total: users.length,
         users
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
  }

  const deleteUserController = async (req, res) => {
    try {
      const {userId} = req.params;
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
  
  

export {registerController, loginController, logoutController, allUsersController, deleteUserController}