import express from "express";
import { syncCalendar, matchMentor } from "../controllers/mentorController.js";

const mentorRouter = express.Router();

mentorRouter.post("/sync-calendar", syncCalendar);
mentorRouter.post("/match", matchMentor);

export default mentorRouter;