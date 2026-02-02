import { GoogleGenAI } from "@google/genai";
import ClientCaseModel from "../models/ClientCase.js";

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
            apiKey: "AIzaSyCLmQB51eUcCriGxByWIRluCom6qeLFTvU",
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
        "remark":""
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

        res.status(200).json({message:"Test", result: parsedRes, caseInfo})


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error!" })
    }



}