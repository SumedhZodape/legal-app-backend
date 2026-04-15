import express from 'express';
import Protect from '../middlewares/authMiddleware.js';
import { CreateCase, MyCases, UpdateCase} from '../controller/clientController.js'
import upload from '../middlewares/uploadMiddlewar.js';

const router = express.Router()


router.post("/createcase", Protect, upload.array("proofFiles", 2),  CreateCase);

router.get("/mycases", Protect, MyCases),

router.put("/updatecase", Protect, UpdateCase);


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