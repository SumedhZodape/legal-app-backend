import mongoose from "mongoose";


const ClientCaseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        problemStatement: {
            type: String,
            minLength: 100
        },
        location: {
            type: String,
            required: true
        },
        caseDate: {
            type: Date
        },
        proofFiles: [
            {
               fileName: {
                type: String,
                required: true
               },
               fileURL: {
                type: String,
                required: true
               } 
            }
        ],
        opponentLawyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        assignedLawyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, 
        requestedLawyers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        caseStatus: {
            type: String,
            enum:["NEW", "ONGOING", "COMPLETED"],
            default: "NEW"
        }
    }, 
    { timestamps: true }
)



export default mongoose.model("Clientcase", ClientCaseSchema)