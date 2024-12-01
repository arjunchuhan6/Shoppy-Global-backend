import Product from "../models/Product.js";
import User from "../models/User.js";
import UserCart from "../models/UserCart.js";


// get all users cart items
export const getAllUsersCart = async (req, res) => {
    try {

        const result = await UserCart.find();
        res.status(200).json({ success: true, messge: "All Cart Item List", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}

// get singlecart item
export const getSingleCartItem = async (req, res) => {
    let id = req.params.id;

    try {

        const result = await UserCart.findById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Cart Item not found" });
        }
        res.status(200).json({ success: true, messge: "Cart Item Found", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}
// add cart item
export const addCartItem = async (req, res) => {
    if (!req.body.user) {
        return res.status(403).json({ success: false, message: "User is required" });
    }
    if (!req.body.product) {
        return res.status(403).json({ success: false, message: "Product is required" });
    }
    if (!req.body.quantity) {
        return res.status(403).json({ success: false, message: "Quantity is required" });
    }
    const { product, quantity, user } = req.body;
    try {
        //check this
        const isMatch = await Product.findById(product);
        const isUserMatch = await User.findById(user);

        if (!isUserMatch) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        const result = await UserCart.create({ quantity, product, user });
        res.status(201).json({ success: true, message: "Cart Item added successfully", result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}
//  update cart item
export const updateCartItem = async (req, res) => {
    const cartItemId = req.params.id;

    try {
        // Check if the cart item exists
        const cartItem = await UserCart.findById(cartItemId);
        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Cart Item not found" });
        }

        // Check if the user is authenticated and matches the cart item's user
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User  not found" });
        }

        // Verify that the user ID matches the user associated with the cart item
        if (cartItem.user.toString() === user._id.toString()) {
            // Update the cart item
            const updatedCartItem = await UserCart.findByIdAndUpdate(cartItemId, req.body, { new: true });
            return res.status(200).json({ success: true, message: "Cart Item updated successfully", result: updatedCartItem });
        } else {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }
    } catch (error) {
        console.error(error); // Use console.error for error logging
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}
// delete cart item
export const deleteCartItem = async (req, res) => {
    let id = req.params.id;

    try {
        let userMatch = await User.find({ email: req.user });

        const isMatch = await UserCart.findById(id);

        if (!isMatch) {
            return res.status(404).json({ success: false, message: "Cart Item not found" });
        }

        
        //  the user should match with the cartitem to delete it 
        if (isMatch.user.toString() === userMatch[1]._id.toString()) {
            const result = await UserCart.findByIdAndDelete(id);
            res.status(200).json({ success: true, messge: "Cart Item deleted successfully", result });
        } else {
            return res.status(403).json({ success: false, message: "Unauthorise access" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }

}