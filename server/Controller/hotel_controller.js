import hotelmodel from "../Models/hotel_model.js";
import mongoose from "mongoose";


// ADD HOTEL
export const AddHotel = async (req, res) => {
    try {
        const {hotelname,location,address,description,phone,email,status} = req.body;
        const hotelimage = req.file ?req.file.filename : null;
        if (!hotelname || !location) {
            return res.status(400).json({success:false,message:"Hotel name and location are required"});
        }
        const hotel = new hotelmodel({hotelname,location,address,description,image:hotelimage,phone,email,status: status || "active"});
        const savedHotel = await hotel.save();
        return res.status(201).json({success: true,message: "Hotel added successfully",hotel: savedHotel});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false,message: "Server error",error: error.message});
    }
};

// VIEW ALL HOTELS
export const ViewHotel = async (req, res) => {

    try {
     const pagedata = parseInt(req.query.page) || 1;
        const limitdata = parseInt(req.query.limit) || 5;
        const skipdata = (pagedata - 1) * limitdata;
        const hotels = await hotelmodel
            .find()
            .populate("location")
            .skip(skipdata)
            .limit(limitdata);
        const totalhotel = await hotelmodel.countDocuments();
        const totalpages = Math.ceil(
            totalhotel / limitdata
        );
        return res.status(200).json({success:true,message:"Fetched all hotels",hotels: hotels,currentpage: pagedata,totalhotel: totalhotel,totalpages: totalpages,limitdata: limitdata
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false,message: "Server error",error: error.message});
    }
};

export const FilterHotelByLocation = async (req, res) => {
    try {
        const { location } = req.query;
        if (!location || !mongoose.isValidObjectId(location)) {
            return res.status(400).json({success: false,message: "A valid location is required"
            });
        }
        const hotels = await hotelmodel
            .find({ location, status: "active" })
            .populate("location");
        return res.status(200).json({success: true,message: "Fetched available hotels",hotels});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Server error",error: error.message});
    }
};

export const GetHotelById = async (req, res) => {
    try {
        const { hid } = req.params;
        const hotel = await hotelmodel
            .findById(hid)
            .populate("location");
        if (!hotel) {
            return res.status(404).json({success: false,message: "Hotel not found" });
        }
        return res.status(200).json({success: true,message: "Hotel found",hotel: hotel});
    } catch (error) {
        console.log(error);return res.status(500).json({success: false,message: "Server error",error: error.message});
    }
};
export const UpdateHotel = async (req, res) => {
    try {
        const { hid } = req.params;
        const {hotelname,location,address,description,phone,email,status} = req.body;
        const userimage = req.file?req.file.filename : null
        const updatedHotel = await hotelmodel.findByIdAndUpdate(hid,{
                    hotelname,location,address,description,image:userimage,phone,email,status
                },
                {
                    new: true
                }
            );
        if (!updatedHotel) {
            return res.status(404).json({success: false,message: "Hotel not found"});
        }
        return res.status(200).json({success: true,message: "Hotel updated successfully",hotel: updatedHotel });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false,message: "Server error",error: error.message});
    }
};
export const DeleteHotel = async (req, res) => {
    try {
        const { hid } = req.params;
        const deletedHotel =
            await hotelmodel.findByIdAndDelete(hid);
        if (!deletedHotel) {
            return res.status(404).json({success: false,message: "Hotel not found"});
        }
        return res.status(200).json({success: true,message: "Hotel deleted successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false,message: "Server error",error: error.message});
    }
};