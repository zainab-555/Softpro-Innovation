const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const mongoDB = require('./config/db');
mongoDB();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

console.log("kkdjbvdh");
//API'S STARTED
app.use('/api/admin', require('./Routes/adminRoutes'));
app.use('/api/category', require('./Routes/categoryRoutes'));
app.use('/api/product', require('./Routes/productRoutes'));
app.use('/api/order', require('./Routes/orderRoutes'));
app.use('/api/user', require('./Routes/userRoutes'));
app.use('/api/complaint', require('./Routes/complaintRoutes'));
app.use('/api/cart', require('./Routes/cartRoutes'));
app.use('/api/wishlist', require('./Routes/wishlistRoutes'));
app.use('/api/payment', require('./Routes/paymentRoutes'));
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
