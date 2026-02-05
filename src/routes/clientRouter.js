import express from 'express';
import Protect from '../middlewares/authMiddleware.js';
import {AITest , CreateCase} from '../controller/clientController.js'
import upload from '../middlewares/uploadMiddlewar.js';

const router = express.Router()


router.get("/aitest", Protect, AITest);

router.post("/createcase", Protect, upload.array("proofFiles", 2),  CreateCase);

export default router;





// type : multipart/form-data

// {
//     "caseInfo":"Something Happen with me",
//     "Date":"2024-12-30",
//     "proofFiles": [
//         file1,
//         file2
//     ]
// }