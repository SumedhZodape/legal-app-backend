import LawyerProfileModel from "../models/LawyerProfile.js";

export const GetAllLawyers = async(req, res)=>{
    try {
        const users = await LawyerProfileModel.find();

        res.status(200).json({result: users, message:"Fetched Lawyers!"})
    } catch (error) {
        res.status(500).json({message:"Server Error!"})
    }
}


export const UpdateLawyerStatus = async(req, res)=>{
    try {
        
        console.log("Testing")

        const { status, remark } = req.body;
        const profileId = req.params.profileId;


        // fist findout the lawyer
        const lawyerProfile = await LawyerProfileModel.findById(profileId);
        lawyerProfile.status = status;
        lawyerProfile.adminRemark = remark;

        status === "APPROVED" ? lawyerProfile.approvedAt = new Date() : null;

        await lawyerProfile.save();

        res.status(200).json({result: lawyerProfile, message:`Status updated to: ${status}`})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error!", error})
    }
}