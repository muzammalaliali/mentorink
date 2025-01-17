import Mentor from '../models/mentorModel.js'

const syncCalendar = async (req, res) => {
    const { mentorId, googleToken } = req.body;
  
    try {
      // Simulate fetching data from Google Calendar API
      const events = [
        { start: "2025-01-15T09:00:00", end: "2025-01-15T10:00:00" },
        { start: "2025-01-16T14:00:00", end: "2025-01-16T15:00:00" },
      ];
  
      const mentor = await Mentor.findByIdAndUpdate(
        mentorId,
        { $set: { availability: events, googleCalendarToken: googleToken } },
        { new: true }
      );
  
      res.status(200).json({ success: true, availability: mentor.availability });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Get Mentor List for Matching
const matchMentor = async (req, res) => {
    const { expertise, availability, location } = req.body;
  
    try {
      const mentors = await Mentor.find({
        expertise: { $in: expertise },
        availability: { $elemMatch: { start: { $lte: availability.start }, end: { $gte: availability.end } } },
      });
  
      res.status(200).json({ success: true, mentors });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};

export {syncCalendar, matchMentor}