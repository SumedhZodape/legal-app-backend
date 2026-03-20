import LawyerProfileModel from "../models/LawyerProfile.js";
import UserModel from '../models/Users.js'

export const CreateProfile = async (req, res) => {


    const { email, barCouncilId, degree, lawyerType,
        experienceYears, totalCases, wonCases, lostCases, winRatio,
        feeMin, feeMax,
    } = req.body;


    if (!email || !barCouncilId || !degree || !lawyerType
        || !experienceYears
    ) {
        return res.status(400).json({ success: false, message: "Required fileds are missing!" })
    }

    try {

        const userData = await UserModel.findOne({ email });

        if (!userData) {
            return res.status(404).json({ success: false, message: "User Doesn't exists!" })
        }

        if(userData.role !== "LAWYER"){
            return res.status(400).json({success: false, message: `Please check your role, Role should be LAWYER and your current role is ${userData.role}`})
        }

        const existingUser = await LawyerProfileModel.findOne({ userId: userData._id });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User Profile alredy exist!" })
        }


        const userProfile = await LawyerProfileModel.create(
            {
                userId: userData._id, barCouncilId, degree, lawyerType,
                experienceYears, totalCases, wonCases, lostCases, winRatio,
                feeMin, feeMax,
            }
        )

        res.status(201).json({ success: true, result: userProfile, message: "User Profile created!" })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error!" })
    }



}