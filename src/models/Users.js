import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 30
        },
        email: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 30
        },
        Phone: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 10
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
        role: {
            type: String,
            enum: ["ADMIN", "LAWYER", "CLIENT"]
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
)


export default mongoose.model("User", UserSchema)