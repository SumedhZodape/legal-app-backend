import { GoogleGenAI } from "@google/genai";
import ClientCaseModel from "../models/ClientCase.js";
import AianalysisModel from "../models/Aianalysis.js";
import LawyerProfileModel from "../models/LawyerProfile.js";



export const CreateCase = async (req, res) => {

    const userId = req.user;
    const { problemStatement, location, caseDate } = req.body;

    try {

        if (problemStatement?.trim() === "") {
            return res.status(400).json({ success: false, message: "Problem statement is required!" })
        }


        console.log(req.files)

        let proofFiles = []

        if (req.files && req.files.length > 0) {
            proofFiles = req.files?.map(ele => ({
                fileName: ele.originalname,
                fileURL: `uploads/${ele.filename}`
            }))
        }

        console.log("proofFiles", proofFiles)






        console.log("Request is coming")

        const ai = new GoogleGenAI({
            apiKey: "AIzaSyD6vTMIhh3y3WZSTgxsKYosOsCzWluLwq4",
        });

        const promt = `
        Analyze the legal case belowand return STRICT JSON only.
        
        Problem: "${problemStatement}",
        
        Return format:
        {
        "predictedCaseType":"",
        "caseSeverity":"HIGH" | "MEDIUM" | "LOW",
        "suggestedIPSSections": [],
        "wrostCaseOutcome":"",
        "estimatedFeeMin": number,
        "estimatedFeeMax": number,
        "remark":"",
        "TypeOfLawyerNeeded":"Criminal" | "Civil" | "Family" | "Corporate" | "Cyber" | "Property"
        }
        `


        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: promt,
            config: {
                systemInstruction: "Return valid JSON only. No extra text.",
            },
        });

        console.log(response)

        const aiResponse = response?.candidates[0]?.content?.parts[0]?.text;
        const parsedRes = JSON.parse(aiResponse)


        const caseInfo = await ClientCaseModel.create({
            userId,
            problemStatement,
            location,
            caseDate,
            proofFiles,
            lawyerType: parsedRes?.TypeOfLawyerNeeded
        })

        /// find out the lawyers list
        const lawyersData = await LawyerProfileModel.find({
            lawyerType: parsedRes?.TypeOfLawyerNeeded,
            status: "APPROVED",
            $or: [
                { feeMin: { $lte: parsedRes?.estimatedFeeMax } },
                { feeMax: { $gte: parsedRes?.estimatedFeeMin } }
            ]
        }).sort({ wonCases: -1 }).limit(5).populate('userId')


        console.log(lawyersData)

        const mapData = lawyersData?.map((ele) => ele.userId?._id)

        const returnedLawyer = lawyersData?.map((ele) => {
            return {
                value: ele.userId?._id,
                label: ele.userId?.name
            }
        })


        const aiInfo = await AianalysisModel.create({
            clientCaseId: caseInfo._id,
            predictedCaseType: parsedRes?.predictedCaseType,
            caseSeverity: parsedRes?.caseSeverity,
            suggestedIPCSections: parsedRes?.suggestedIPSSections,
            wrostCaseOutcome: parsedRes?.wrostCaseOutcome,
            estimatedFeeMin: parsedRes?.estimatedFeeMin,
            estimatedFeeMax: parsedRes?.estimatedFeeMax,
            remark: parsedRes?.remark,
            suggestedLawyers: mapData
        })

        res.status(200).json({ success: true, message: "Case has been created", result: parsedRes, caseInfo, lawyersData: returnedLawyer })


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server Error!" })
    }



}

export const MyCases = async (req, res) => {
    try {

        const userID = req.user;

        const cases = await ClientCaseModel.find({ userId: userID }).populate('userId');

        const result = await Promise.all(
            cases.map(async (c) => {
                const analysis = await AianalysisModel.findOne({ clientCaseId: c._id }).populate({
                    path: "suggestedLawyers",
                    select: "name"
                });
                return {
                    ...c.toObject(),
                    aiAnalysis: analysis
                };
            })
        );

        res.status(200).json({ success: true, result: result })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error!" })
    }
}

export const UpdateCase = async (req, res) => {
    try {

        const user = req.user; // client ID

        const { requestedLawyers, caseId } = req.body;

        if (!caseId){
            return res.status(400).json({ success: false, message: "Please Pass the Case ID!" })
        }

        if (requestedLawyers.length === 0) {
            return res.status(400).json({ success: false, message: "Please Select minimun one Lawyer!" })
        }

        const caseData = await ClientCaseModel.findById(caseId);

        caseData.requestedLawyers = requestedLawyers;

        caseData.save();

        return res.status(201).json({ success: true, message: "Lawyers added successfully!" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error!" })
    }
}