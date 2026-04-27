require("dotenv").config()
import { app } from './app'
import { connectDb } from './utils/db';


app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
    connectDb()
})

