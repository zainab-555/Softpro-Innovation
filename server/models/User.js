const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'delete']
    },
    picture: {
        type: String,
    
    },
    gender:{
        type:String,
        
    }

});

const User = mongoose.model("User", userSchema);
module.exports = User;