import { GoogleGenAI } from "@google/genai";
import ClientCaseModel from "../models/ClientCase.js";
import AianalysisModel from "../models/Aianalysis.js";
import LawyerProfileModel from "../models/LawyerProfile.js";


export const AITest = async (req, res) => {

    const { prompt } = req.body;

    console.log(prompt)

    try {
        const ai = new GoogleGenAI({
            apiKey: "AIzaSyD7l1lIxb9SrdyzdwzoY35aYoti_0goRog",
        });


        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                systemInstruction: "Please return data in the json format.",
            },
        });

        console.log(response)


        res.status(200).json({ response })
    } catch (error) {
        req.status(500).json({ message: "Server Error" })
    }

}


export const CreateCase = async (req, res) => {

    const userId = req.user;
    const { problemStatement, location, caseDate } = req.body;
    
    try {

        if (problemStatement?.trim() === "") {
            return res.status(400).json({ message: "Problem statement is required!" })
        }


        console.log(req.files)

        let proofFiles = []

        if(req.files && req.files.length > 0){
            proofFiles = req.files?.map(ele=>({
                fileName: ele.originalname,
                fileURL: `uploads/${ele.filename}`
            }))
        }

        console.log("proofFiles", proofFiles)


        

        const caseInfo = await ClientCaseModel.create({
            userId,
            problemStatement,
            location,
            caseDate,
            proofFiles
        })

        console.log("Request is coming")

        const ai = new GoogleGenAI({
            apiKey: "AIzaSyAZWXofR8pwVzjmpgkm8jv7OOXdN6L93QE",
        });

        const promt =`
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


        /// find out the lawyers list


        const lawyersData = await LawyerProfileModel.find({
            lawyerType: parsedRes?.TypeOfLawyerNeeded,
            status: "APPROVED",
            feeMin: { $lte: parsedRes?.estimatedFeeMax },
            feeMax: { $gte: parsedRes?.estimatedFeeMin }
        }).sort({wonCases: -1}).limit(5).select("userId")


        console.log(lawyersData)

        const mapData = lawyersData?.map((ele)=>ele.userId)

      

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

        res.status(200).json({message:"Case has been created", result: parsedRes, caseInfo, lawyersData})


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error!" })
    }



}