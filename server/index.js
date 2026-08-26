const express= require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
const app = express();
const mongoDB = require('./config/db');
mongoDB();


app.use(express.json())
app.use(cors());
console.log("kkdjbvdh")
//API'S STARTED
app.use('/api/admin', require('./Routes/adminRoutes'));

// app.use('/api/category', require('./Routes/categoryRoutes'));
// app.use('/api/user', require('./Routes/userRoutes'));

app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
