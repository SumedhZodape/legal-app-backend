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
            maxLength: 30,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please enter a valid email address.'
            ]
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
UserSchema.pre('save', async function () {
    // logic - to encrypt the pass

    console.log(this)

    // condition for if we are not updaing password then no need to hash
    if (!this.isModified('password')) {
        return;
    }

    // encrypt logic - (registration, forget pass)
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt)


})



// login method
UserSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)
}



export default mongoose.model("User", UserSchema)

