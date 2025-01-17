import UserModel from '../models/userModel.js'; // Import the UserModel
import { responseHandler } from '../utils/responseHandler.js'; // Utility for response handling

export const assignMentorController = async (req, res) => {
  try {
    const { menteeId, mentorId } = req.body; // Get mentee and mentor IDs from the request body

    // Find the mentee by ID
    const mentee = await UserModel.findById(menteeId);
    if (!mentee || mentee.role !== 'mentee') {
      return responseHandler(res, 400, 'Mentee not found or invalid role');
    }

    // Find the mentor by ID
    const mentor = await UserModel.findById(mentorId);
    if (!mentor || mentor.role !== 'mentor') {
      return responseHandler(res, 400, 'Mentor not found or invalid role');
    }

    // Assign mentor to mentee
    mentee.mentor = mentorId;
    await mentee.save(); // Save the mentee with the assigned mentor

    // Optionally, you can also store mentee's id in mentor's record if required
    mentor.mentees.push(menteeId);
    await mentor.save();

    // Respond with success message
    return responseHandler(res, 200, 'Mentee assigned to mentor successfully', { mentee, mentor });
  } catch (error) {
    console.error(error);
    return responseHandler(res, 500, 'Internal server error');
  }
};
