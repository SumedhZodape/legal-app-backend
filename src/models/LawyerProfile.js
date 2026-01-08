import mongoose from "mongoose";


const LawyerProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        barCouncilId: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        lawyerType: {
            type: String,
            enum: ["Criminal", "Civil", "Family", "Corporate", "Cyber", "Property"],
            required: true
        },
        experienceYears: {
            type: Number
        },
        totalCases: {
            type: Number
        },
        wonCases: {
            type: Number
        },
        lostCases: {
            type: Number
        },
        winRatio: {
            type: Number
        },
        feeMin: {
            type: Number
        },
        feeMax: {
            type: Number
        },
        status: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED", "RETURNED", "BLOCKED"],
            default: "PENDING"
        },
        adminRemark: {
            type: String
        },
        approvedAt: {
            type: Date
        }
    },
    { timestamps: true }
)


export default mongoose.model("Lawyerprofile", LawyerProfileSchema)