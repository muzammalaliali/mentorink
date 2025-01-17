import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["mentor", "mentee", "admin"],
        default: "mentee",
    },

    expertise: [String], // For mentors
    preferences: [String],
  
  availability: [
    {
      day: {
        type: String,
        required: true,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
      timeZone: {
        type: String,
        required: true,
      },
      timeSlots: [
        {
            date: { type: Date, required: true },
          startTime: { type: String, required: true }, // e.g., "09:00 AM"
          endTime: { type: String, required: true }, // e.g., "11:00 AM"
        },
      ],
    },
  ],
  rating: {
     type: Number, 
     default: 0 
    },
},

 {timestamps: true});


export default mongoose.model("User", userSchema);