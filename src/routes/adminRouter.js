import express from 'express';
import { GetAllLawyers } from '../controller/adminController.js';
import Protect from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get("/getlawyers", Protect, GetAllLawyers)


export default router;