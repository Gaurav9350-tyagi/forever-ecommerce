import express from "express";

const paymentRouter = express.Router();

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