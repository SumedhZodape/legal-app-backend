import express from 'express';
import { GetAllLawyers, UpdateLawyerStatus } from '../controller/adminController.js';
import Protect from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get("/getlawyers", Protect, GetAllLawyers);

router.put("/updateLawyerStatus/:profileId", Protect, UpdateLawyerStatus)


export default router;