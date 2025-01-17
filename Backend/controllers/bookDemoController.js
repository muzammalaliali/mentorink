import express from 'express'
import { sendDemoEmail } from "../utils/email.js";
import bookDemoModel from '../models/bookDemoModel.js';


const createBookDemoController = async (req, res) => {
    try {
        const {name, companyName, role, email, description} = req.body;

        if(!name || !companyName || !role || !email || !description){
            res
            .status(400)
            .send({
                success: false, 
                message: "All fields are required"
            })
        }
        // Check email already exist
        const isExist = await bookDemoModel.findOne({ email });
            if (isExist) {
              return res.status(400).send({
                success: false,
                message: "Email already exist",
              });
            };

        const newBooking = await bookDemoModel.create({
            name,
            companyName,
            role,
            email,
            description
        })
        await sendDemoEmail(email, name);
        return res.status(201).send({success: true, message: "Demo booked and email sent successfully!", newBooking})
    } catch (error) {
        console.log(`createBookDemoController Error ${error}`);
    res.status(400).send({
      success: false,
      message: "error in createBookDemoController",
      error,
    });
    }
}

const getAllBookDemoController = async (req, res) => {
    try {
        const booking = await bookDemoModel.find({})

        if (!booking) {
            return res.status(404).send({
              success: false,
              message: "No booking found",
            });
          }

          return res
          .status(200)
          .send({
            success: true,
            total: booking.length,
            message: "Demo booking fetched successfully",
            booking
          });
    } catch (error) {
        console.log(`getAllBookDemoController Error ${error}`);
        res.status(400).send({
          success: false,
          message: "error in getAllBookDemoController",
          error,
        });  
    }
};

const deleteBookDemoController = async (req, res) => {
  try {
      const {bookDemoId} = req.params;
      const booking = await bookDemoModel.findByIdAndDelete(bookDemoId);

      if (!booking) {
        return res.status(404).send({
          success: false,
          message: "Booking not found",
        });
      }
      // await userModel.findByIdAndDelete(userId)
      return res.status(200).send({
        success: true,
        message: "Booking deleted successfully",
      });
  } catch (error) {
    console.log(`deleteBookDemoController Error: ${error}`);
      return res.status(404).send({
        success: false,
        message: "Error in deleteBookDemoController",
      });
  }
}

export {createBookDemoController, getAllBookDemoController, deleteBookDemoController}