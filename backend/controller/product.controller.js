import Product from '../model/Product_model.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        console.log("here")
        console.log(Product);
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (e) {
        res.status(500).json({ sucess: false, message: e.message })
    }
};


export const createProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        res.status(400).json({ sucess: false, message: "please provide all fields" });
    }
    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (e) {
        res.status(500).json({ sucess: false, message: "server error" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ sucess: false, message: "Invalid Product id" });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ sucess: true, data: updatedProduct });
    } catch (e) {
        res.status(500).json({ success: false, message: "server error" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    console.log(`id${id}`);
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id); // Delete the product by ID

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: deletedProduct });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
};