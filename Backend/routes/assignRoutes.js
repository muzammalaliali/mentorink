import express from 'express';
import { assignMentorController } from '../controllers/assignMentorController';
// import { protect } from '../middleware/authMiddleware.js'; // Optional middleware to protect the route

const assignRouter = express.Router();

// POST route for assigning a mentor to a mentee
assignRouter.post('/assign-mentor', assignMentorController); // `protect` middleware is optional

export default assignRouter;
