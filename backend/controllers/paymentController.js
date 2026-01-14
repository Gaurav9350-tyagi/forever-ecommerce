// MOCK Razorpay Controller (College Project)
// No real Razorpay SDK, No crypto verification

// =======================
// CREATE RAZORPAY ORDER (MOCK)
// =======================
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    return res.status(200).json({
      success: true,
      order: {
        id: "order_mock_" + Date.now(),
        amount: amount * 100,
        currency: "INR",
        status: "created",
      },
      mock: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Mock Razorpay order creation failed",
    });
  }
};

// =======================
// VERIFY RAZORPAY PAYMENT (MOCK)
// =======================
export const verifyRazorpayPayment = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Mock payment verified successfully",
      mock: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Mock payment verification failed",
    });
  }
};
