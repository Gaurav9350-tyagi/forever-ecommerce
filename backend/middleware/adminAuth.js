import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    console.log("ADMIN AUTH TOKEN RECEIVED:", token); 

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("ADMIN AUTH DECODED:", decoded); 

    if (!decoded.admin) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again"
      });
    }

    next();
  } catch (error) {
    console.log("ADMIN AUTH ERROR:", error.message);
    return res.json({
      success: false,
      message: "Not Authorized Login Again"
    });
  }
};

export default adminAuth;
