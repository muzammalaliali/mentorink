import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({
    eventName: { 
        type: String, 
        required: true 
    },
    eventType: { 
        type: String, 
        required: true 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: { 
        type: String, 
        required: true 
    },
    startTime: { 
        type: String, 
        required: true 
    },
    endTime: { 
        type: String, 
        required: true 
    },
    timezone: { 
        type: String, 
        required: true 
    },
    joinUrl: { type: String, required: true },
},

 {timestamps: true});


export default mongoose.model("Event", eventSchema);