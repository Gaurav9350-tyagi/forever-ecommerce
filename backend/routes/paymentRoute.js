import express from "express";

const paymentRouter = express.Router();

// Razorpay disabled for MOCK / college project
paymentRouter.post("/razorpay/order", (req, res) => {
  return res.json({
    success: true,
    message: "Razorpay mock order created"
  });
});

paymentRouter.post("/razorpay/verify", (req, res) => {
  return res.json({
    success: true,
    message: "Razorpay mock payment verified"
  });
});

export default paymentRouter;