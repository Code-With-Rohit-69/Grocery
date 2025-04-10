import { Product } from "../models/Product.model.js";
import { v2 as cloudinary } from "cloudinary";

// Add product : /api/product/add

export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);

    const images = req.files;

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    
    await Product.create({
      ...productData,
      image: imagesUrl,
    });

    res.status(200).json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log("Error in addProduct controller ", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get product : /api/product/list

export const productList = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error in productList controller ", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get single product : /api/product/id

export const productById = async (req, res) => {
  try {
    const { id } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.json({ success: false, message: "Product is not available" });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.log("Error in product find by id controller ", error.message);
    res.json({ success: false, message: error.message });
  }
};

// change product inStock : /api/product/stock

export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    const product = await Product.findByIdAndUpdate(id, { inStock });

    return res.status(200).json({ success: true, message: "Stock updated" });
  } catch (error) {
    console.log("Error in changeStock controller ", error.message);
    res.json({ success: false, message: error.message });
  }
};
