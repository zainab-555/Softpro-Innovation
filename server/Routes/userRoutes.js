const express=require('express');
const Router=express.Router();
const User = require('../models/User');


// Router.post("/User/register", (req,res)=>{
//     res.json("User register information")
// })


Router.post('/register',async(req,res)=>{
 
 try{
        const {fullName,email,password}=req.body;
        const a =await User.findOne({email});
        if(a){
            return res.json({message:"User Already Registered"})
        }
        const data=new User({
            name:fullName,
            email:email,
            password:password 
        });
         await data.save();
         return res.json({"message":"User Register  Registered"});
    }

catch(error){

    console.error("User registration error:", error);
    return res.json({"message":"Email Not Registered", error: error.message});

}

})
  
Router.get('/show', async (req, res) => {
    try {
        const { search, status } = req.query;
        const filter = {};
        if (status && status !== 'All') filter.status = status;
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { mobile: { $regex: search, $options: 'i' } }
            ];
        }
        const users = await User.find(filter).select('-password').sort({ _id: -1 });
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching users" });
    }
});

Router.put('/update/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ message: 'User updated', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
});

Router.patch('/patch/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ message: 'User patched', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error patching user", error: error.message });
    }
});

Router.delete('/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
});

module.exports = Router;