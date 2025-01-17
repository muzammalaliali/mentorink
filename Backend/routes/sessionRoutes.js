import express from "express";
import { scheduleSession } from "../controllers/sessionController.js";

const sessionRouter = express.Router();

sessionRouter.post("/schedule", scheduleSession);

export default sessionRouter;
