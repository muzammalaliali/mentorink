import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
  participantId: { type: mongoose.Schema.Types.ObjectId, ref: "Participant" },
  date: { type: Date, required: true },
  type: { type: String, enum: ["online", "offline"], required: true },
  meetingLink: { type: String },
});

export default mongoose.model("Session", sessionSchema);
