import LawyerProfileModel from "../models/LawyerProfile.js";
import UserModel from '../models/Users.js';
import ClinetCaseModel from '../models/ClientCase.js'
import ClientlawyertrackModel from '../models/ClientLawyerTrack.js';
import AianalysModel from '../models/Aianalysis.js'

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

        if (userData.role !== "LAWYER") {
            return res.status(400).json({ success: false, message: `Please check your role, Role should be LAWYER and your current role is ${userData.role}` })
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

export const getCases = async (req, res) => {
    try {

        const lawyerID = req.user;

        const cases = await ClinetCaseModel.find({ requestedLawyers: lawyerID });


        const result = await Promise.all(
            cases.map(async (c) => {
                const track = await ClientlawyertrackModel.findOne({ caseId: c._id })

                if (track && track.lawyerId.toString === lawyerID.toString()) {

                    const analysis = await AianalysModel.findOne({ clientCaseId: c._id })

                    return {
                        ...c,
                        Aianalys: analysis,
                        lawyerTrack: track
                    }

                }

                if (!track) {
                    const analysis = await AianalysModel.findOne({ clientCaseId: c._id })

                    return {
                        ...c,
                        Aianalys: analysis
                    }
                }

                return null
            })
        )

        const filteredCases = result.filter((ele) => ele !== null)


        const mappedData = filteredCases?.map((ele)=>{
            return {
                ...ele._doc,
                aiAnalysis: ele.Aianalys,
                lawyerTrack: ele.lawyerTrack
            }
        })

        return res.status(200).json({
            success: true,
            result: mappedData,
            message: "Fetch all cases!"
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error!" })
    }
}

export const AcceptRequest = async (req, res)=>{
    try {
        const caseID = req.params.caseID;
        const {lawyerResponse}= req.body;

        const track = await ClientlawyertrackModel.create(
            {
                caseId: caseID,
                lawyerId: req.user,
                lawyerResponse: lawyerResponse
            }
        )
        
        const updateCaseStatus = await ClinetCaseModel.findById(caseID)

        
        updateCaseStatus.caseStatus = "ONGOING";

        await updateCaseStatus.save();

        return res.status(201).json({success: true, message: "Request has been accepted!"})

    } catch (error) {
        console.log(error)
         return res.status(500).json({ success: false, message: "Server Error!" })
    }
}