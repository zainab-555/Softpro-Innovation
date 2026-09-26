const express = require('express');
const routes = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

console.log("kkdjbvdh")

routes.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const a = await Admin.findOne({ email });
        if (a) {
            return res.json({ message: "Admin Already Registered" })
        }
        console.log(req.body);
        const data = await Admin.create(req.body);
        console.log("data", data)
        return res.json({ "message": "Email  Registered" });
    }
    catch (error) {
        return res.json({ "message": "Email Not Registered" });
    }


});

routes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await Admin.findOne({ email: email });
        if (!data) {
            return res.json({ msg: "Email not exit" });
        }
        if (data.password == password) {
            const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
            return res.json({
                msg: "Success",
                token: token,
                role: "admin",
                name: data.name,
                adminId: data._id
            })

        } else {
            return res.json({ msg: "Password is Incorrect" })
        }

    } catch (er) {
        console.log(er);
        return res.json({ msg: "Server error" })
    }
});

routes.get("/show", async (req, res) => {
        try {
            const data = await Admin.find();
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: "Error fetching admin data" });
        }
});

routes.put("/update/:id", async (req, res) => {
        try {
            const updatedAdmin = await Admin.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            res.json({ message: "Admin updated", admin: updatedAdmin });
        } catch (error) {
            res.status(500).json({ message: "Error updating admin", error: error.message });
        }
});

routes.patch('/patch/:id', async (req, res) => {
        try {
            const updatedAdmin = await Admin.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            res.json({ message: 'Admin updated', admin: updatedAdmin });
        } catch (error) {
            res.status(500).json({ message: "Error patching admin", error: error.message });
        }
});
routes.delete("/delete/:id", async (req, res) => {
        try {
            await Admin.findByIdAndDelete(req.params.id);
            res.json({ message: "Admin deleted" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting admin", error: error.message });
        }
});

module.exports = routes;