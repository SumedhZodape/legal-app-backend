import express from 'express';

const router = express.Router()


router.get("/helloapi", async(req, res)=>{
    res.send({message:"Hi I am router api..."})
})

router.get("/getclientdata", async(req, res)=>{
    res.send({message:"Client Data"})
})

export default router;