import mongoose from "mongoose";


const CliendtLawyerTrackSchema = new mongoose.Schema(
    {
        caseId :{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Clientcase"
        },
        lawyerId :{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        lawyerResponse: {
            type: String
        }
    },
    { timestamps: true }
)


export default mongoose.model("Clientlawyertrack", CliendtLawyerTrackSchema)