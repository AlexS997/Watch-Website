import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://alex_db_user:UE0sf3sSNAZC8Am6@cluster0.1kfmsfo.mongodb.net/WatchSite").then(() => console.log('DB CONNECTEDD'))
}