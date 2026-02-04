import mongoose from "mongoose";


const AIAnalysisSchema = new mongoose.Schema(
    {
        clientCaseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clientcase"
        },
        predictedCaseType: {
            type: String
        },
        caseSeverity: {
            type: String,
            enum: ["HIGH", "LOW", "MEDIUM"]
        },
        suggestedIPCSections: [String],
        wrostCaseOutcome: {
            type: String
        },
        estimatedFeeMin: {
            type: Number
        },
        estimatedFeeMax: {
            type: Number
        },
        suggestedLawyers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        remark: {
            type: String
        }
    },
    { timestamps: true }
)

export default mongoose.model("Aianalys", AIAnalysisSchema)