import express from 'express';
import clientRouter from './routes/clientRouter.js';
import lawyerRouter from './routes/lawyerRouter.js';
import authRouter from './routes/authRouter.js';
import adminRouter from './routes/adminRouter.js'

const app = express();

// app level moddleware
app.use(express.json())




// router 1 - client
// router 2 - lawyer
app.use("/client", clientRouter);
app.use("/lawyer", lawyerRouter);
app.use("/auth", authRouter)
app.use("/admin", adminRouter)


// http://localhost:8000/client/getclientdata
// http://localhost:8000/lawyer/getlawyerdata

export default app;