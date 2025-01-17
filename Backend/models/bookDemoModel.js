import mongoose from "mongoose";


const bookDemoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
      required: true,
    }
    
}, {timestamps: true});


export default mongoose.model("Booking", bookDemoSchema);