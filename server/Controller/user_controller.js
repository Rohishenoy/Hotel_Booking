import usermodel from "../Models/user_model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.SECRET_KEY || "mernstack"

export const AddUser =async(req,res)=>{
try {
    console.log("client request details",req)
    const{uname,uemail,upassword,uaddress,uphone}=req.body
    const userImage = req.file? req.file.filename :null
    const checkemail= await usermodel.findOne({email:uemail})
    if (checkemail) {
        console.log("email is already used")
        res.json({success:true,message:"email is already used"})
    } else {
    
   
const hashpassword= await bcrypt.hash(upassword,10)

    const newuser = new usermodel({
        name:uname,
        email:uemail,
        phone:uphone,
        password:upassword,
        password:hashpassword,
        address:uaddress,
        profileimage:userImage
    })
    await newuser.save()
    console.log("user added",newuser)
    res.json({success:true,message:"useradded",newuser})
     }
} catch (error) {
    console.log(error)
    res.json({success:false,message:"server error",error})
}
}


export const Login = async (req, res) => {
    try {
        const { uemail, upassword } = req.body;
        if (!uemail || !upassword) {
            return res.status(400).json({success: false,message: "Email and password are required"});
        }
        const user = await usermodel.findOne({ email: uemail});
        // Email not found
        if (!user) {
            return res.status(400).json({success: false,message: "Email not found"});
        }
        // Check password
        const checkpassword = await bcrypt.compare(
            upassword,
            user.password
        );
        if (!checkpassword) {
            return res.status(400).json({success: false,message: "Password doesn't match"});
        }
        // Create token
        const token = jwt.sign({ id: user._id },SECRET_KEY);
        console.log("Token generated:", token);
        // Send user also
        return res.status(200).json({success: true,message: "Login successfully",token: token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false,message: "Server error",error: error.message});

    }
};
export const ViewUser = async(req,res)=>{
    try {
        console.log("request details",res)
                const pagedata= parseInt(req.query.page)
                const limitdata= parseInt(req.query.limit)
                const skipdata=(pagedata -1)*limitdata //to skip data  
                const allusers =await usermodel
                .find()
                .skip(skipdata)
                .limit(limitdata)
        // const allusers =await usermodel.find()
        console.log("All fetched users",allusers)
          const totaluser=await usermodel.countDocuments()
                const totalpages =Math.ceil(totaluser/limitdata)
                res.status(200).json({message:"fetched all user",allusers,currentpage:pagedata,totaluser,totalpages,limitdata})
        // res.status(200).json({message:"fetched all users",allusers})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error",error})
    }
}

export const GetUserById = async(req,res)=>{
    try {
        const {uid} =req.params  //it used to fetchd id from url
// const userid =req.params.uid
const singleuser =await usermodel.findById(uid)
console.log("user fetched by id",singleuser)
res.status(200).json({message:" users found",singleuser})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error",error})
    }

}

export const Deleteuser =async(req,res)=>{
    try {
        // const user_id =req.params.uid
        const {uid} = req.params
        console.log("delete id",uid)
        const duser =await usermodel.findByIdAndDelete(uid)
        console.log("user deleted",duser)
        res.status(200).json({message:"user deleted successfully",duser})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error",error})
    }
}
export const Profile =async(req,res)=>{
    try {
        const uid = req.id
        const userprofile = await usermodel.findById(uid)
        console.log(userprofile)
        res.json({success:true,message:"profile fetched",userprofile})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"server error",error})
    }

}

//update
export const Updateprofile = async(req,res)=>{
    try {
        // const uid=req.id
        console.log(req)
         const {uname,uemail,uaddress,uphone} =req.body
         const updatedata ={
            name:uname,
            email:uemail,
            address:uaddress,
            phone:uphone,
         }
         if(req.file){
            updatedata.profileimage=req.file.filename
         }
         const updateuser =await usermodel.findByIdAndUpdate(req.id,updatedata,{new:true})

         
         console.log("updated profile",updateuser)
         res.status(200).json({message:"profile  successfully updated",updateuser})
    } catch (error) {
       console.log(error)
         res.status(500).json({message:"server error",error})
    }
 }
