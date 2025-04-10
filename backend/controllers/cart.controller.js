// update cart:  /api/cart/update

import { User } from "../models/User.model.js";

export const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { cartItems } = req.body;
    await User.findByIdAndUpdate(userId, { cartItems });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log("Error in updateCart controller ", error.message);
    res.json({ success: false, message: error.message });
  }
};
