require("dotenv").config()
import { app } from './app'
import { initSocketServer } from './socketServer';
import { connectDb } from './utils/db';
import { v2 as cloudinary } from "cloudinary"
import http from 'http'

const server = http.createServer(app)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

initSocketServer(server)

// connect to database
connectDb()

server.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
})

