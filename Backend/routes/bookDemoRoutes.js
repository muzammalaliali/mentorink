import express from 'express'

import { addUser, isAdmin, isAuthorized } from '../middlewares/authMiddlewares.js';
import { createBookDemoController, deleteBookDemoController, getAllBookDemoController } from '../controllers/bookDemoController.js';

const bookDemoRouter = express.Router();

bookDemoRouter.get("/all", getAllBookDemoController);
// http://localhost:8080/api/v1/bookDemo
bookDemoRouter.post("/", isAuthorized, isAdmin, createBookDemoController);
// bookDemoRouter.get("/logout", logoutController);

bookDemoRouter.delete("/:bookDemoId", isAuthorized, isAdmin, deleteBookDemoController);
// // Admin Routes
// bookDemoRouter.get("/all-users",isAuthorized, isAdmin, allUsersController);


export default bookDemoRouter;