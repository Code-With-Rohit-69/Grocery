// add address = /api/address/add

import { Address } from "../models/Address.model.js";

export const addAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { address } = req.body;
    await Address.create({ ...address, userId });

    res.json({ success: true, message: "Address added Successfully" });
  } catch (error) {
    console.log("Error in addAddress controller ", error.message);
    res.json({ success: false, message: error.message });
  }
};

// get address

export const getAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const addresses = await Address.find({ userId });

    res.json({ success: true, addresses });
  } catch (error) {
    console.log("Error in getAddress controller ", error.message);
    res.json({ success: false, message: error.message });
  }
};
