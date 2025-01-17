import express from 'express'
import { createEventController, deleteEventController, getAllEventController, getSingleEventController, updateEventController } from '../controllers/eventController.js';
import { isAdmin, isAuthorized, isMentee, isMentor,  } from '../middlewares/authMiddlewares.js';
import { assignMentorController } from '../controllers/assignMentorController.js';
import { getUserCounts } from '../controllers/authController.js';

const eventRouter = express.Router();

eventRouter.post("/", isAuthorized, isMentee, createEventController);

eventRouter.get("/", isAuthorized, getAllEventController);

eventRouter.get("/:eventId", isAuthorized, getSingleEventController);

eventRouter.delete("/:eventId", isAuthorized, isAdmin, deleteEventController);

eventRouter.put("/:eventId",isAuthorized, isMentee, updateEventController);

eventRouter.post('/assign-mentor', assignMentorController); 

eventRouter.get("/event-counts",isAuthorized, getUserCounts);
// // Admin Routes

export default eventRouter;