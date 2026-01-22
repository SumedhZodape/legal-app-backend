import LawyerProfileModel from "../models/LawyerProfile.js";

export const CreateProfile = async (req, res) => {


    const { userId, barCouncilId, degree, lawyerType,
        experienceYears, totalCases, wonCases, lostCases, winRatio,
        feeMin, feeMax,
    } = req.body;


    if (!userId || !barCouncilId || !degree || !lawyerType
        || !experienceYears
    ) {
        return res.status(400).json({ message: "Required fileds are missing!" })
    }

    try {

        const existingUser = await LawyerProfileModel.findOne({ userId });

        if (existingUser) {
            return res.status(400).json({ message: "User Profile alredy exist!" })
        }


        const userProfile = await LawyerProfileModel.create(
            {
                userId, barCouncilId, degree, lawyerType,
                experienceYears, totalCases, wonCases, lostCases, winRatio,
                feeMin, feeMax,
            }
        )

        res.status(201).json({result: userProfile, message: "User Profile created!"})


    } catch (error) {
        return res.status(500).json({ message: "Server Error!" })
    }



}