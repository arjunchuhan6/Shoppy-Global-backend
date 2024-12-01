import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    description: {
        required: true,
        type: String
    },
    stockQty: {
        required: true,
        type: Number
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;

