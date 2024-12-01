import express from "express"
import {addCartItem, updateCartItem, getSingleCartItem, deleteCartItem, getAllUsersCart } from "../controllers/cartControllers.js"
import { checkAuth } from "../utils/checkAuth.js";
const router = express();
 
// routes for cart

router.get("/allUserCarts", checkAuth, getAllUsersCart);

router.post("/addCartItem", checkAuth, addCartItem);

router.get("/cart/:id", checkAuth, getSingleCartItem);

router.put("/updateCartItem/:id", checkAuth, updateCartItem);

router.delete("/deleteCartItem/:id", checkAuth, deleteCartItem);


export default router;