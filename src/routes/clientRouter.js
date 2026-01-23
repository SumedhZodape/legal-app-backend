import express from 'express';
import Protect from '../middlewares/authMiddleware.js';
import {AITest} from '../controller/clientController.js'

const router = express.Router()


router.get("/aitest", Protect, AITest)

export default router;