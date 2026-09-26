const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const https = require("https");
const Order = require("../models/Order");

// Helper function to call Razorpay API directly using Node's native https
function createRazorpayOrderDirect(options, keyId, keySecret) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(options);
        const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

        const reqOptions = {
            hostname: "api.razorpay.com",
            port: 443,
            path: "/v1/orders",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(postData),
                "Authorization": `Basic ${auth}`
            }
        };

        const req = https.request(reqOptions, (res) => {
            let data = "";
            res.on("data", (chunk) => { data += chunk; });
            res.on("end", () => {
                try {
                    const parsed = JSON.parse(data);
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(parsed);
                    } else {
                        reject(new Error(parsed.error ? parsed.error.description : "Razorpay order creation failed"));
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.on("error", (e) => reject(e));
        req.write(postData);
        req.end();
    });
}

// 1. Create Order endpoint
router.post("/create-order", async (req, res) => {
    try {
        const { amount } = req.body;
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keyId || !keySecret) {
            return res.status(500).json({
                success: false,
                message: "Razorpay Key ID ya Secret .env file me set nahi hai."
            });
        }

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Valid amount provide karein."
            });
        }

        const options = {
            amount: Math.round(Number(amount) * 100), // amount in paise
            currency: "INR",
            receipt: `rcpt_${Date.now()}`
        };

        const razorpayOrder = await createRazorpayOrderDirect(options, keyId, keySecret);

        res.json({
            success: true,
            order: razorpayOrder,
            key_id: keyId
        });
    } catch (error) {
        console.error("Razorpay order error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to create Razorpay order"
        });
    }
});

// 2. Verify Payment & Create Order
router.post("/verify", async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderData
        } = req.body;

        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keySecret) {
            return res.status(500).json({
                success: false,
                message: "Razorpay Key Secret configured nahi hai."
            });
        }

        // Signature verification: HMAC-SHA256
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const generatedSignature = crypto
            .createHmac("sha256", keySecret)
            .update(text)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature. Payment verify nahi ho paayi."
            });
        }

        // Generate custom order number if not present
        const count = await Order.countDocuments();
        const order_number = `ORD-${new Date().getFullYear()}-${1001 + count}`;

        const newOrder = await Order.create({
            ...orderData,
            order_number: orderData?.order_number || order_number,
            payment_method: "Online",
            payment_status: "Paid",
            order_status: "Processing",
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        });

        res.status(201).json({
            success: true,
            message: "Payment successfully verified and order placed!",
            order: newOrder
        });
    } catch (error) {
        console.error("Payment verify error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Payment verification failed"
        });
    }
});

module.exports = router;
