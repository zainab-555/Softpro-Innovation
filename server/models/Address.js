const mongoose = require('mongoose')
const AddressSchema = mongoose.Schema({
    name: {
        type: "name",
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    pincode: {
        type: "String",
        required: true
    },
    location: {
        type: "string",
        required: true
    },

    address: {
        type: 'String',
        required: true
    },

    city: {
        type: 'City',
        required: true
    },
    states: {
        type: 'States',
        required: true
    },

    is_default: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "default",
        required: true
    },
    address_type:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"address",
        required:true
    },
    user_id:{
        types:mongoose.Schema.Types.ObjectId,
        ref:"user id",
        required:true
    }, 

}, {
    timestamps: true
});
module.exports = mongoose.model("Address", AddressSchema);