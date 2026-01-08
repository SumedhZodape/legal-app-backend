import mongoose from "mongoose";


const ReviewSchema = new mongoose.Schema(
    {
        caseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clientcase"
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        lawyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        reviewText: {
            type: String
        }
    },
    { timestamps: true }
)

export default mongoose.model("Review", ReviewSchema)