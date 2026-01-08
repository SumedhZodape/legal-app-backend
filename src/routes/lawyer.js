import express from 'express';

const router = express.Router();



router.get("/getlawyerdata", async(req, res)=>{
    res.send({message:"Lawyer Data..."})
})



export default router;