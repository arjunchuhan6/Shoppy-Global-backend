import express from "express"
import { addUser, deleteUser, getAllUsers, getSingleUser, loginUser, updateUser } from "../controllers/userControllers.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = express();

// routs for users

router.get("/", getAllUsers);

router.get("/user/:id", getSingleUser);

router.post("/addUser", addUser);

router.put("/updateUser/:id", updateUser);

router.post("/loginUser/:id", loginUser);

router.delete("/deleteUser/:id", checkAuth, deleteUser);



export default router;