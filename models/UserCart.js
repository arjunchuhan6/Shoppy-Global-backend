import mongoose, { Schema } from "mongoose"

const UserCartSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    user: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true,
    },
    product: {
        ref: "Product",
        type: Schema.Types.ObjectId,
        required: true,
    }
}, { timestamps: true });

const UserCart = mongoose.model("UserCart", UserCartSchema);

export default UserCart;

