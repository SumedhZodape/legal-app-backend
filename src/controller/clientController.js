import { GoogleGenAI } from "@google/genai";

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
        req.status(500).json({message:"Server Error"})
    }

}