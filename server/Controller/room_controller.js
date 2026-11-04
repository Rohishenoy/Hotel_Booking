import roommodel from "../Models/room_model.js";
import bookingmodel from "../Models/booking_model.js";


// ADD ROOM
export const AddRoom = async (req, res) => {
    try {

        const {
            hotel,
            roomnumber,
            roomtype,
            price,
            capacity,
            description,
            image,
            status
        } = req.body;

        if (!hotel || !roomnumber || !roomtype || !price) {
            return res.status(400).json({
                success: false,
                message: "Hotel, room number, room type and price are required"
            });
        }

        const room = new roommodel({
            hotel,
            roomnumber,
            roomtype,
            price,
            capacity,
            description,
            image,
            status: status || "available"
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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const [rooms, totalroom] = await Promise.all([
            roommodel
                .find()
                .populate("hotel")
                .skip(skip)
                .limit(limit),
            roommodel.countDocuments()
        ]);

        const totalpages = Math.ceil(totalroom / limit) || 1;

        return res.status(200).json({
            success: true,
            allroom: rooms,
            currentpage: page,
            totalroom,
            totalpages,
            limit
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
        const { arrival, departure } = req.query;

        const rooms = await roommodel
            .find({ hotel })
            .populate("hotel");

        if (arrival || departure) {
            const arrivalDate = new Date(arrival);
            const departureDate = new Date(departure);

            if (
                !arrival ||
                !departure ||
                Number.isNaN(arrivalDate.getTime()) ||
                Number.isNaN(departureDate.getTime()) ||
                departureDate <= arrivalDate
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Valid arrival and departure dates are required"
                });
            }

            const conflictingBookings = await bookingmodel.find({
                hotel,
                bookingStatus: { $in: ["pending", "approved"] },
                arrival: { $lt: departureDate },
                departure: { $gt: arrivalDate }
            }).select("room");
            const unavailableRoomIds = new Set(
                conflictingBookings.map((booking) => booking.room?.toString())
            );

            return res.status(200).json({
                success: true,
                rooms: rooms.map((room) => ({
                    ...room.toObject(),
                    availableForStay:
                        room.status !== "inactive" &&
                        !unavailableRoomIds.has(room._id.toString())
                }))
            });
        }

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

        const room = await roommodel.findById(rid);
        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        if (req.body.status && req.body.status !== room.status) {
            const activeBooking = await bookingmodel.exists({
                room: room._id,
                bookingStatus: { $in: ["pending", "approved"] }
            });

            if (activeBooking && req.body.status !== "booked") {
                return res.status(409).json({
                    success: false,
                    code: "ROOM_HAS_ACTIVE_BOOKING",
                    message: "This room has an active booking. Cancel or reject the booking before changing its occupied status."
                });
            }
        }

        const allowedFields = [
            "hotel",
            "roomnumber",
            "roomtype",
            "price",
            "capacity",
            "description",
            "image",
            "status"
        ];
        const updates = {};
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });
        const filter = { _id: rid };
        if (req.body.status && req.body.status !== room.status) {
            filter.status = room.status;
            if (req.body.status !== "booked") {
                filter.activeBooking = { $in: [null] };
            }
        }

        const updatedRoom = await roommodel.findOneAndUpdate(
            filter,
            { $set: updates },
            { new: true, runValidators: true }
        );
        if (!updatedRoom) {
            return res.status(409).json({
                success: false,
                code: "ROOM_STATUS_CHANGED",
                message: "Room availability changed while you were editing. Refresh and try again."
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

        const activeBooking = await bookingmodel.exists({
            room: rid,
            bookingStatus: { $in: ["pending", "approved"] }
        });

        if (activeBooking) {
            return res.status(409).json({
                success: false,
                code: "ROOM_HAS_ACTIVE_BOOKING",
                message: "This room has an active booking. Cancel or reject the booking before deleting it."
            });
        }

        const deletedRoom = await roommodel.findOneAndDelete({
            _id: rid,
            status: { $ne: "booked" }
        });

        if (!deletedRoom) {
            const currentRoom = await roommodel.findById(rid).select("status");
            const isOccupied = currentRoom?.status === "booked";
            return res.status(isOccupied ? 409 : 404).json({
                success: false,
                code: isOccupied ? "ROOM_OCCUPIED" : "ROOM_NOT_FOUND",
                message: isOccupied
                    ? "This room is occupied. Cancel or reject its booking before deleting it."
                    : "Room not found"
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