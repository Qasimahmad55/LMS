require("dotenv").config()
import { app } from './app'
import { connectDb } from './utils/db';
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})



app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
    connectDb()
})

