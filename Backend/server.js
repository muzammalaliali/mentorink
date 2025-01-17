import express from 'express'
import colors from 'colors'
import connetDB from './config/db.js';
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config();
// MongoDb connection
connetDB();
import authRoutes from './routes/authRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
// import bookDemoRoutes from './routes/bookDemoRoutes.js'
// import mentorRoutes from './routes/mentorRoutes.js'
// import sessionRoutes from './routes/sessionRoutes.js'

const app =  express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
// http://localhost:8080
// app.use("/api/v1/session", sessionRoutes)
// app.use("/api/v1/mentor", mentorRoutes)
app.use("/api/v1/event", eventRoutes)
app.use("/api/v1/auth", authRoutes)

const PORT = process.env.PORT || 5000

app.listen (PORT, () => { console.log(`Server is Running at PORT ${PORT}`.bgYellow)})