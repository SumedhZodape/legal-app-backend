import mongoose from "mongoose";

export default async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://sumedhzodape143_db_user:OLJcO0CsUR1SezjW@cluster0.3nk9vcb.mongodb.net/legal-app");
        console.log("DB Connected...")
    } catch (error) {
        console.log(error)
    }
}