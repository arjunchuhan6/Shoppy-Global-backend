import User from "../models/User.js";
import JWT from "jsonwebtoken"

// get all users
export const getAllUsers = async (req, res) => {

    try {

        const result = await User.find();
        res.status(200).json({ success: true, messge: "All Users List", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}

// get single user
export const getSingleUser = async (req, res) => {
    let id = req.params.id;

    try {

        const result = await User.findById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, messge: "User Found", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}

// add user 
export const addUser = async (req, res) => {
    if (!req.body.name) {
        return res.status(403).json({ success: false, message: "Name is required" });
    }
    if (!req.body.email) {
        return res.status(403).json({ success: false, message: "Email is required" });
    }
    if (!req.body.password) {
        return res.status(403).json({ success: false, message: "Password is required" });
    }

    const { name, email, password} = req.body;


    try {
        // sign jwt token
        const accessToken = JWT.sign(email, "ARRAJJUPNUT");
        const result = await User.create({ name, email, password});
        res.status(201).json({ success: true, message: "User added successfully", result: { ...result, accessToken } });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}


 

// update user
export const updateUser = async (req, res) => {
    let id = req.params.id;
    try {
        const isMatch = await User.findById(id);
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const result = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, messge: "User updated successfully", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}

// user login  
export const loginUser = async (req, res) => {
    let id = req.params.id;
    if (!req.body.email) {
        return res.status(403).json({ success: false, message: "Email is required" });
    }
    if (!req.body.password) {
        return res.status(403).json({ success: false, message: "Password is required" });
    }
    const { email, password } = req.body;
    try {
        //check for match
        const isMatch = await User.find({ email: email }); 
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (isMatch && isMatch[0].password !== password) {
            return res.status(403).json({ success: false, message: "Invalid credentials" });
        }
        // sign jwt token
        const accessToken = JWT.sign({ email: isMatch.email, id: isMatch._id }, "ARRAJJUPNUT", { expiresIn: '1h' });
        res.status(200).json({ success: true, messge: "User Found", result: { ...isMatch, accessToken } })


    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}

// delete user
export const deleteUser = async (req, res) => {
    let id = req.params.id;
    try {
        const isMatch = await User.findById(id);
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        // delete using id 
        const result = await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, messge: "User deleted successfully", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
} 