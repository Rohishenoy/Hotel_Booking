import locationmodel from '../Models/location_model.js'

 export const AddLocation = async(req,res)=>{
    try {
        console.log("client request details",req)
        const{location}=req.body
        const newlocation = new locationmodel({
            location:location
        })
        await newlocation.save()
        console.log("new location added",newlocation)
         res.status(200).json({message:"fetched  add location",newlocation})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error",error})
    }
}


export const ViewLocation = async (req, res) => {

    try {

        const pagedata = parseInt(req.query.page) || 1;
        const limitdata = parseInt(req.query.limit) || 5;

        const skipdata = (pagedata - 1) * limitdata;

        const alllocation = await locationmodel
            .find()
            .skip(skipdata)
            .limit(limitdata);

        const totallocation = await locationmodel.countDocuments();

        const totalpages = Math.ceil(
            totallocation / limitdata
        );

        console.log("ALL LOCATION:", alllocation);

        return res.status(200).json({

            success: true,
            message: "fetched all location",

            alllocation: alllocation,

            currentpage: pagedata,

            totallocation: totallocation,

            totalpages: totalpages,

            limitdata: limitdata

        });

    } catch (error) {

        console.log("VIEW LOCATION ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        });

    }
};

 export const GetLocationById = async(req,res)=>{
    try {
        const {lid} =req.params  
const singlelocation =await locationmodel.findById(lid)
console.log("location fetched by id",singlelocation)
res.status(200).json({message:" location found",singlelocation})


    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error",error})
    }

}
export const DeleteLocation =async(req,res)=>{
    try {
    
        const {lid} = req.params
        console.log("delete id",lid)
        const dlocation =await locationmodel.findByIdAndDelete(lid)
        console.log("location deleted",dlocation)
        res.status(200).json({message:"location deleted successfully",dlocation})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error",error})
    }
}
 export const UpdateLocation = async(req,res)=>{
    try {
        const {lid}=req.params
         const {location,status} =req.body
         const updatelocation =await locationmodel.findByIdAndUpdate(lid,{location:location,status:status},{new:true})
         console.log("updated location",updatelocation)
         res.status(200).json({message:"location  successfully updated",updatelocation})
    } catch (error) {
       console.log(error)
         res.status(500).json({message:"server error",error})
    }
 }