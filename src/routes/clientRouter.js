import express from 'express';
import Protect from '../middlewares/authMiddleware.js';
import {AITest , CreateCase} from '../controller/clientController.js'

const router = express.Router()


router.get("/aitest", Protect, AITest);

router.post("/createcase", Protect, CreateCase);

export default router;