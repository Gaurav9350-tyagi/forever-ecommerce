import express from "express";
import {
  placeOrder,
  allOrders,
  userOrders,
  adminOrders,
  updateStatus
} from "../controllers/orderController.js";
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// USER – PLACE ORDER
router.post("/place", authUser, placeOrder);
router.post("/stripe", authUser, placeOrder);
router.post("/razorpay", authUser, placeOrder);

// USER – GET OWN ORDERS
router.post("/userorders", authUser, userOrders);

// ADMIN – ORDERS
router.get("/list", adminAuth, adminOrders);
router.get("/all", adminAuth, allOrders);
router.post("/update", adminAuth, updateStatus);

export default router;
