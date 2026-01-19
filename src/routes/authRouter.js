import express from 'express';
import { Register, Login } from '../controller/authController.js'

const router = express.Router();



// first api for user registration



router.post("/register", Register);
router.post("/login", Login)




export default router