import admin_model from "../Models/admin_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "mernstack";

export const InsertAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashpassword = await bcrypt.hash(password, 10);
        const newadmin = new admin_model({
            email,
            password: hashpassword
        });
        await newadmin.save();
        res.json({success: true,message: "admin added",newadmin});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false,message: "server error",error});
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await admin_model.findOne({ email });
        console.log(admin);

        if (!admin) {
            return res.json({success: false,message: "email not found"});
        }

        const checkpassword = await bcrypt.compare(
            password,
            admin.password
        );

        if (!checkpassword) {
            return res.json({success: false,message: "password Doesn't match"});
        }

        const token = jwt.sign(
            { id: admin._id },
            SECRET_KEY
        ); 
        console.log(" admintoken generated", token);
        res.status(200).json({success: true,message: "login successfully",token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false,message: "server error",error});
    }
};