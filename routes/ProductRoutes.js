import express from "express"
import { getProducts, getSingleProducts, updateProduct, deleteProduct, addProduct } from "../controllers/ProductControllers.js"
import { validateProduct } from "../utils/validateProduct.js";

const router = express();


// routes for products

router.get("/", getProducts)

router.get("/getSingleProduct/:id", getSingleProducts);

router.post("/addProduct", validateProduct, addProduct);

router.put("/updateProduct/:id", updateProduct);

router.delete("/deleteProduct/:id", deleteProduct);

export default router;