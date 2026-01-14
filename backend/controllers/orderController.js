import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// ================= ADMIN: ALL ORDERS =================
const adminOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= PLACE ORDER (USER) =================
const placeOrder = async (req, res) => {
  try {
    
    const userId = req.user._id;

    const { items, amount, address, paymentMethod } = req.body;

    const newOrder = new orderModel({
      userId,                  
      items,
      address,
      amount,
      paymentMethod,
      payment: true,            
      status: "Placed",
      date: Date.now()
    });

    await newOrder.save();

    
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: `${paymentMethod} order placed successfully`,
      order: newOrder
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= ADMIN: ALL ORDERS (ALT) =================
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= USER: OWN ORDERS =================
const userOrders = async (req, res) => {
  try {
    
    const userId = req.user._id;

    const orders = await orderModel.find({ userId });
    res.json({
      success: true,
      orders
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= ADMIN: UPDATE STATUS =================
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({
      success: true,
      message: "Status Updated"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export {
  placeOrder,
  allOrders,
  userOrders,
  adminOrders,
  updateStatus
};
