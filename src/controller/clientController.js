import { GoogleGenAI } from "@google/genai";
import ClientCaseModel from "../models/ClientCase.js";
import AianalysisModel from "../models/Aianalysis.js";

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
        

        const caseInfo = await ClientCaseModel.create({
            userId,
            problemStatement,
            location,
            caseDate
        })

        console.log("Request is coming")

        const ai = new GoogleGenAI({
            apiKey: "AIzaSyA8clyaEFDtVLPoV0HSow1v4HPDyNvIGNA",
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
        "TypeOfLawyerNeeded":""
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


        const aiInfo = await AianalysisModel.create({
            clientCaseId: caseInfo._id,
            predictedCaseType: parsedRes?.predictedCaseType,
            caseSeverity: parsedRes?.caseSeverity,
            suggestedIPCSections: parsedRes?.suggestedIPSSections,
            wrostCaseOutcome: parsedRes?.wrostCaseOutcome,
            estimatedFeeMin: parsedRes?.estimatedFeeMin,
            estimatedFeeMax: parsedRes?.estimatedFeeMax,
            remark: parsedRes?.remark,
        })

        res.status(200).json({message:"Case has been created", result: parsedRes, caseInfo})


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error!" })
    }



}