import mongoose from "mongoose";


const mentorsSchema = new mongoose.Schema({
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
    expertise: [String],
  availability: [
    {
      start: Date,
      end: Date,
    },
  ],
  googleCalendarToken: String,
  rating: { type: Number, default: 0 },
    
    
}, {timestamps: true});


export default mongoose.model("mentor", mentorsSchema);