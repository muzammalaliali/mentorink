import express from 'express'
import { allUsersController, deleteUserController, loginController, logoutController, registerController } from '../controllers/userController.js';
// import { addUser, isAdmin, isAuthorized } from '../middlewares/authMiddlewares.js';

const userRouter = express.Router();

userRouter.post("/register", registerController);
// http://localhost:8080/api/v1/users
userRouter.post("/login", loginController);
userRouter.get("/logout", logoutController);

// userRouter.delete("/:userId", isAuthorized, isAdmin, deleteUserController);
// // Admin Routes
// userRouter.get("/all-users",isAuthorized, isAdmin, allUsersController);


export default userRouter;