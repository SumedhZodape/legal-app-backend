import express from 'express';
import userModel from '../models/Users.js'

const router = express.Router();




router.post("/", async(req, res)=>{

    const payload = req.body;

    const user = await userModel.create(payload);

    res.send(user)

})






export default router