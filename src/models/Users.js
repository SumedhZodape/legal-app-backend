import mongoose from "mongoose";
import bcrypt from 'bcrypt'

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
            required: true
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


// 1. time
// 2. time


// password encrypt logic
UserSchema.pre('save', async function (next) {
    // logic - to encrypt the pass

    console.log(this)

    // condition for if we are not updaing password then no need to hash
    if(!this.isModified('password')){ 
        return next();
    }

    // encrypt logic - (registration, forget pass)
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt)

    next()



})





export default mongoose.model("User", UserSchema)

