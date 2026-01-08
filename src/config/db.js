import mongoose from "mongoose";

export default async() =>{
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/legalapp");
        console.log("DB Connected...")
    } catch (error) {
        console.log(error)
    }
}
