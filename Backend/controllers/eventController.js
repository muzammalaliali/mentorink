import express from "express";
import axios from 'axios'
import eventModel from "../models/eventModel.js";
import generateZoomToken from '../utils/generateZoomToken.js'
import User from '../models/userModel.js'
import mongoose from "mongoose";

const createEventController = async (req, res) => {
  try {
    const {
      eventName,
      eventType,
      preferences,
      date,
      startTime,
      endTime,
      timezone,
      joinUrl
    } = req.body;
    
    if (!eventName || !eventType || !date || !startTime || !endTime) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }


    const newEvent = await eventModel.create({
      eventName,
      eventType,
      user: req.user._id,
      preferences: req.user.role === "mentee" ? preferences || [] : [],
      date,
      startTime,
      endTime,
      timezone,
      joinUrl
    });

    return res.status(201).send({
      success: true,
      message: "Event created successfully",
      newEvent,
    });
  } catch (error) {
    console.log(`createEventController Error ${error}`);
    res.status(400).send({
      success: false,
      message: "Error in createEventController",
      error,
    });
  }
};

const getAllEventController = async (req, res) => {
  try {
    const { role, _id } = req.user; // Extract role and ID from the user

    let events;

    if (role === "admin") {
      // Admin can see all events
      events = await eventModel
        .find()
        .populate("user", "name email"); // Populate mentee data for admin
    } else if (role === "mentee") {
      // Mentees can only see their own events
      events = await eventModel.find({ user: _id });
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    res.status(200).json({
      success: true,
      total: events.length,
      message: "Events fetched successfully",
      events,
    });
  } catch (error) {
    console.error("getAllEventController Error:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching events",
      error,
    });
  }
};

const getSingleEventController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { role, _id } = req.user;

    const event = await eventModel
      .findById(eventId)
      .populate("user", "name email");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (role !== "admin" && event.user._id.toString() !== _id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to event",
      });
    }

    res.status(200).json({
      success: true,
      message: "Single event fetched successfully",
      event,
    });
  } catch (error) {
    console.error(`getSingleEventController Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Error in fetching event",
      error,
    });
  }
};

const deleteEventController = async (req, res) => {
  try{
      
    const {eventId} = req.params

    //  Delete categories in database
    const event = await eventModel.findById(eventId);
    if(!event) {
      return res.status(400).send({
        success: false,
        message: "Session not found",
      })
    }
    await eventModel.findByIdAndDelete(eventId)

    return res.status(200).send({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    console.log(`deleteEventController Error ${error}`);
    res.status(400).send({
      success: false,
      message: "error in deleteEventController",
      error,
    });
  }
}







const updateEventController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const updatedEvent = await eventModel.findByIdAndUpdate(eventId, req.body, {
      new: true,
    });

    if (!updatedEvent) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res
      .status(200)
      .send({
        success: true,
        message: "Event updated successfully",
        updatedEvent,
      });
  } catch (error) {
    console.log(`updateEventController Error: ${error}`);
    return res.status(404).send({
      success: false,
      message: "Error in updateEventController",
    });
  }
};

const getEventCounts = async (req, res) => {
  try {
    // Assuming you have an event model called 'eventModel'
    const eventCount = await eventModel.countDocuments();

    res.status(200).send({
      success: true,
      data: {
        events: eventCount,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching event count",
      error,
    });
  }
};


export {
  createEventController,
  getAllEventController,
  getSingleEventController,
  deleteEventController,
  updateEventController,
  getEventCounts
};
