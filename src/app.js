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


// Define your allowed origins (add your actual domains here)
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:8080',
    'http://localhost:3000',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:5173',
    'http://13.235.99.187', // Replace with your actual domain
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Allow all origins in development, or check against allowedOrigins in production
        const isDevelopment = process.env.NODE_ENV !== 'production';

        if (isDevelopment) {
            // In development, allow all origins
            return callback(null, true);
        } else {
            // In production, check against allowed origins
            if (allowedOrigins.indexOf(origin) !== -1) {
                return callback(null, true);
            } else {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));




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