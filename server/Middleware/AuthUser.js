 import jwt from 'jsonwebtoken'

 const SECRET_KEY = process.env.SECRET_KEY || "mernstack"
  export const AuthUsercheck=async(req,res,next)=>{
    try {
        const utoken=await req.header("auth-token")
        if(utoken){
            const udata=await jwt.verify(utoken,SECRET_KEY)
            console.log("token details",udata)
            req.id= udata.id
            next()
        }else{
            res.json({success:false,message:"unauthorized!!! token not provided"})
        }
    } catch (error) {
        console.log(error)
        res.json({message:"server error",error})
    }
}