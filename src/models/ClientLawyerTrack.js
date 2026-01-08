import mongoose from "mongoose";


const CliendtLawyerTrackSchema = new mongoose.Schema(
    {
        caseId :{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Clientcase"
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        lawyerId :{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        requestStatus: {
            type: String,
            enum: ["PENDING", "ACCEPTED", "REJECTED", "EXPIRED"],
            default: "PENDING"
        },
        lawyerResponse: {
            type: String
        }
    },
    { timestamps: true }
)


export default mongoose.model("Clientlawyertrack", CliendtLawyerTrackSchema)