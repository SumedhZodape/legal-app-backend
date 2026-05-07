import mongoose from "mongoose";

export default async () => {
    try {
        const conn = await mongoose.connect("http://");
        console.log("DB Connected...")
    } catch (error) {
        console.log(error)
    }
}