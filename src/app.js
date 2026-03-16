import express from 'express';
import clientRouter from './routes/clientRouter.js';
import lawyerRouter from './routes/lawyerRouter.js';
import authRouter from './routes/authRouter.js';
import adminRouter from './routes/adminRouter.js';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config()

// app level moddleware
app.use(express.json());
app.use(cors())




// router 1 - client
// router 2 - lawyer
app.use("/auth", authRouter)
app.use("/client", clientRouter);
app.use("/lawyer", lawyerRouter);
app.use("/admin", adminRouter)


// http://localhost:8000/client/getclientdata
// http://localhost:8000/lawyer/getlawyerdata

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))



// http://localhost:8000/uploads/1770645252093-769492861-demo.jpg

export default app;