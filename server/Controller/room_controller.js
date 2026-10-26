import roommodel from "../Models/room_model.js";


// ADD ROOM
export const AddRoom = async (req, res) => {
    try {

        const {
            hotel,
            roomtype,
            price,
            capacity,
            description,
            image
        } = req.body;

        if (!hotel || !roomtype || !price) {
            return res.status(400).json({
                success: false,
                message: "Hotel, room type and price are required"
            });
        }

        const room = new roommodel({
            hotel,
            roomtype,
            price,
            capacity,
            description,
            image
        });

        const savedRoom = await room.save();

        return res.status(201).json({
            success: true,
            message: "Room added successfully",
            room: savedRoom
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// VIEW ALL ROOMS
export const ViewRoom = async (req, res) => {
    try {

        const rooms = await roommodel
            .find()
            .populate("hotel");

        return res.status(200).json({
            success: true,
            rooms
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// VIEW ROOMS BY HOTEL
export const ViewRoomByHotel = async (req, res) => {
    try {

        const { hotel } = req.params;

        const rooms = await roommodel
            .find({ hotel })
            .populate("hotel");

        return res.status(200).json({
            success: true,
            rooms
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// GET ROOM BY ID
export const GetRoomById = async (req, res) => {
    try {

        const { rid } = req.params;

        const room = await roommodel
            .findById(rid)
            .populate("hotel");

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        return res.status(200).json({
            success: true,
            room
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// UPDATE ROOM
export const UpdateRoom = async (req, res) => {
    try {

        const { rid } = req.params;

        const updatedRoom =
            await roommodel.findByIdAndUpdate(
                rid,
                req.body,
                { new: true }
            );

        if (!updatedRoom) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Room updated successfully",
            room: updatedRoom
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// DELETE ROOM
export const DeleteRoom = async (req, res) => {
    try {

        const { rid } = req.params;

        const deletedRoom =
            await roommodel.findByIdAndDelete(rid);

        if (!deletedRoom) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Room deleted successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};
// AVAILABLE ROOMS
export const ViewAvailableRoom = async (req, res) => {
  try {
    const { hotel } = req.params;

    const rooms = await roommodel.find({
      hotel: hotel,
      status: "available"
    }).populate("hotel");

    return res.status(200).json({
      success: true,
      message: "Available rooms fetched",
      rooms
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


// BOOKED ROOMS
export const ViewBookedRoom = async (req, res) => {
  try {
    const { hotel } = req.params;

    const rooms = await roommodel.find({
      hotel: hotel,
      status: "booked"
    }).populate("hotel");

    return res.status(200).json({
      success: true,
      message: "Booked rooms fetched",
      rooms
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};