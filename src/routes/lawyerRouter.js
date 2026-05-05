import express from 'express';
import Protect from '../middlewares/authMiddleware.js';
import { CreateProfile, getCases, AcceptRequest } from '../controller/lawyerController.js'
const router = express.Router();


router.post("/profile", CreateProfile);

router.get("/mycases", Protect, getCases);

router.put("/acceptrequest/:caseID", Protect, AcceptRequest)



export default router;