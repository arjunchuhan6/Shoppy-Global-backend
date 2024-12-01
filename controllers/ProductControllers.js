import Product from "../models/Product.js";
// get products
export const getProducts = async (req, res) => {
    try {
        const result = await Product.find();
        res.status(200).json({ success: true, messge: "All Product List", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}
// get single product
export const getSingleProducts = async (req, res) => {
    let id = req.params.id;

    try {

        const result = await Product.findById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, messge: "Product Found", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}

// add a single product
export const addProduct = async (req, res) => {

    const { name, price, description, stockQty } = req.body;

    try {
        const result = await Product.create({ name, price, description, stockQty });
        res.status(201).json({ success: true, message: "Product added successfully", result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}

// update a product 
export const updateProduct = async (req, res) => {
    let id = req.params.id;
    try {
        const isMatch = await Product.findById(id);
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        const result = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, messge: "Product updated successfully", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}

// delete product 
export const deleteProduct = async (req, res) => {
    let id = req.params.id;
    try {
        const isMatch = await Product.findById(id);
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        const result = await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, messge: "Product deleted successfully", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}

