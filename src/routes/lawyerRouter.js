import express from 'express';
import Protect from '../middlewares/authMiddleware.js';
import { CreateProfile } from '../controller/lawyerController.js'
const router = express.Router();


router.post("/profile", CreateProfile)



export default router;