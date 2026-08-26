const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express();
dotenv.config();
const mongoDB=require("./config/db.js")
app.use(express.json())
app.use(cors());
// api's started

app.use("/api/admin", require("./routes/routesAdmin.js"))
app.use("/api/category", require("./routes/categoryRoutes.js"))
app.use("/api/user", require("./routes/userRoutes.js"))

// api's end

mongoDB();
app.listen(process.env.PORT,()=>{
    console.log("Server is running");
})