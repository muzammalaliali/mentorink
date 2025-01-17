import express from 'express'

import { isAdmin, isAuthorized, isMentor, isMentee  } from '../middlewares/authMiddlewares.js';
import { allUsersController, deleteUserController, getUserCounts, loginController, logoutController, registerController } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post("/register", registerController);
// http://localhost:8080/api/v1/users
authRouter.post("/login", loginController);
authRouter.get("/logout", logoutController);

authRouter.delete("/:userId", isAuthorized, isAdmin, deleteUserController);
// // Admin Routes
authRouter.get("/all-users",isAuthorized, isAdmin, allUsersController);
authRouter.get("/user-counts",isAuthorized, getUserCounts);


export default authRouter;