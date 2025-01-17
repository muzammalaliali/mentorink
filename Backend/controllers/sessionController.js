import Session from '../models/sessionModel.js'

const scheduleSession = async (req, res) => {
    const { mentorId, participantId, date, type, meetingLink } = req.body;
  
    try {
      const session = await Session.create({
        mentorId,
        participantId,
        date,
        type,
        meetingLink,
      });
      res.status(201).json({ success: true, session });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

export {scheduleSession}