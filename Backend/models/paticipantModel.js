import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  preferences: {
    expertise: [String],
    availability: {
      start: Date,
      end: Date,
    },
    location: String,
  },
});

export default mongoose.model("Participant", participantSchema);
