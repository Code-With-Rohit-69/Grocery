import jwt from "jsonwebtoken";

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      password == process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        success: true,
        message: "Logged in",
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid credentials!",
      });
    }
  } catch (error) {
    console.log("Error in seller login controller: ", error.message);
    res.json({ success: false, message: `${error.message}` });
  }
};

export const isSellerAuth = async (req, res) => {
  try {
    return res.json({
      success: true,
    });
  } catch (error) {
    console.log("Error in seller isAuth controller: ", error.message);
    res.json({ success: false, message: `${error.message}` });
  }
};

export const logout = async (req, res) => {
    try {
      res.clearCookie("sellerToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      });
  
      return res.json({
        success: true,
        message: "Logged out",
      });
    } catch (error) {
      console.log("Error in seller logout controller: ", error.message);
      res.json({ success: false, message: `${error.message}` });
    }
  };
  