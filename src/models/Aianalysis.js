import mongoose from "mongoose";


const AIAnalysisSchema = new mongoose.Schema(
    {
        clientCaseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Clientcase"
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
                lawyerId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                score: {
                    type: Number
                }
            }
        ],
        remark: {
            type: String
        }
    },
    { timestamps:true }
)