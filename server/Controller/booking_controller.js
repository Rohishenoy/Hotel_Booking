
import bookingmodel from "../Models/booking_model.js";
import roommodel from "../Models/room_model.js";
import hotelmodel from "../Models/hotel_model.js";
import mongoose from "mongoose";

// ADD BOOKING
export const AddBooking = async (req, res) => {
    let reservedRoomId;
    let reservedBookingId;

    try {
        const {
            userId,
            hotel,
            roomId,
            location,
            arrival,
            departure,
            rooms,
            adults,
            children
        } = req.body;
        // Required fields
        if (
            !userId ||
            !hotel ||
            !roomId ||
            !location ||
            !arrival ||
            !departure ||
            !rooms ||
            !adults
        ) {

            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });

        }

        if (
            !mongoose.isValidObjectId(userId) ||
            !mongoose.isValidObjectId(hotel) ||
            !mongoose.isValidObjectId(roomId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid user, hotel or room"
            });
        }

        const arrivalDate = new Date(arrival);
        const departureDate = new Date(departure);

        if (
            Number.isNaN(arrivalDate.getTime()) ||
            Number.isNaN(departureDate.getTime()) ||
            departureDate <= arrivalDate
        ) {

            return res.status(400).json({
                success: false,
                message: "Departure date must be after arrival date"
            });

        }


        const roomCount = Number(rooms);
        const adultCount = Number(adults);
        const childCount = Number(children || 0);

        if (!Number.isInteger(roomCount) || roomCount < 1) {
            return res.status(400).json({
                success: false,
                message: "Rooms must be at least 1"
            });
        }

        if (roomCount !== 1) {
            return res.status(400).json({
                success: false,
                message: "Each booking reserves one physical room. Create separate bookings for additional rooms."
            });
        }

        if (!Number.isInteger(adultCount) || adultCount < 1) {
            return res.status(400).json({
                success: false,
                message: "Adults must be at least 1"
            });
        }

        if (!Number.isInteger(childCount) || childCount < 0) {
            return res.status(400).json({
                success: false,
                message: "Children cannot be less than 0"
            });
        }

        const activeHotel = await hotelmodel.findOne({
            _id: hotel,
            status: "active"
        });
        if (!activeHotel) {
            return res.status(400).json({
                success: false,
                message: "Hotel is not available"
            });
        }

        const selectedRoom = await roommodel.findOne({
            _id: roomId,
            hotel
        });
        if (!selectedRoom) {
            return res.status(404).json({
                success: false,
                code: "ROOM_NOT_FOUND",
                message: "Selected room was not found at this hotel"
            });
        }

        if (selectedRoom.status !== "available") {
            const isOccupied = selectedRoom.status === "booked";
            return res.status(409).json({
                success: false,
                code: isOccupied ? "ROOM_ALREADY_BOOKED" : "ROOM_UNAVAILABLE",
                roomStatus: selectedRoom.status,
                message: isOccupied
                    ? `Room ${selectedRoom.roomnumber} has already been booked and is now occupied. Please choose another room.`
                    : `Room ${selectedRoom.roomnumber} is currently unavailable. Please choose another room.`
            });
        }

        const nights = Math.ceil(
            (departureDate - arrivalDate) / (1000 * 60 * 60 * 24)
        );

        const totalAmount =
            selectedRoom.price *
            roomCount *
            nights;

        const booking = new bookingmodel({
            user: userId,
            hotel,
            room: selectedRoom._id,
            location: location,
            roomType: selectedRoom.roomtype,
            arrival: arrivalDate,
            departure: departureDate,
            rooms: roomCount,
            adults: adultCount,
            children: childCount,
            totalAmount: totalAmount,
            bookingStatus: "pending"
        });
        reservedBookingId = booking._id;

        const reservedRoom = await roommodel.findOneAndUpdate(
            {
                _id: roomId,
                hotel,
                status: "available",
                activeBooking: { $in: [null] }
            },
            { $set: { status: "booked", activeBooking: booking._id } },
            { new: true }
        );

        if (!reservedRoom) {
            const currentRoom = await roommodel.findOne({ _id: roomId, hotel });
            if (!currentRoom) {
                return res.status(404).json({
                    success: false,
                    code: "ROOM_NOT_FOUND",
                    message: "Selected room was not found at this hotel"
                });
            }

            const isOccupied = currentRoom.status === "booked";
            return res.status(409).json({
                success: false,
                code: isOccupied ? "ROOM_ALREADY_BOOKED" : "ROOM_UNAVAILABLE",
                roomStatus: currentRoom.status,
                message: isOccupied
                    ? `Room ${currentRoom.roomnumber} has already been booked and is now occupied. Please choose another room.`
                    : `Room ${currentRoom.roomnumber} is currently unavailable. Please choose another room.`
            });
        }

        reservedRoomId = reservedRoom._id;

        const savedBooking = await booking.save();
        reservedRoomId = null;
        reservedBookingId = null;

        return res.status(201).json({
            success: true,
            message: "Room booked successfully",
            booking: savedBooking
        });


    } catch (error) {

        console.log(error);

        if (reservedRoomId && reservedBookingId) {
            try {
                await roommodel.updateOne(
                    { _id: reservedRoomId, status: "booked", activeBooking: reservedBookingId },
                    { $set: { status: "available" }, $unset: { activeBooking: 1 } }
                );
            } catch (releaseError) {
                console.error("Failed to release room after booking error:", releaseError);
            }
        }

        return res.status(500).json({

            success: false,

            message: "Server error",

            error: error.message

        });

    }

};

export const ViewBooking = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const [bookings, totalbooking] = await Promise.all([
            bookingmodel
                .find()
                .populate("user", "name email")
                .populate("room", "roomnumber roomtype status")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            bookingmodel.countDocuments()
        ]);

        return res.status(200).json({
            success: true,
            allbooking: bookings,
            currentpage: page,
            totalbooking,
            totalpages: Math.ceil(totalbooking / limit) || 1,
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

export const ViewBookingByUser = async (req, res) => {

    try {

        const { userId } = req.params;

        const bookings = await bookingmodel
            .find({ user: userId })
            .populate("hotel", "hotelname")
            .populate("room", "roomnumber roomtype status")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            bookings: bookings
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

export const DeleteBooking = async (req, res) => {
    try {
        const { bid } = req.params;

        const deletedBooking = await bookingmodel.findByIdAndDelete(bid);

        if (!deletedBooking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        if (deletedBooking.room) {
            const remainingActiveBookings = await bookingmodel.exists({
                room: deletedBooking.room,
                bookingStatus: { $in: ["pending", "approved"] }
            });

            if (!remainingActiveBookings) {
                await roommodel.updateOne(
                    {
                        _id: deletedBooking.room,
                        status: "booked",
                        activeBooking: deletedBooking._id
                    },
                    { $set: { status: "available" }, $unset: { activeBooking: 1 } }
                );
            }
        }

        return res.status(200).json({
            success: true,
            message: "Booking deleted successfully"
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

export const UpdateBookingStatus = async (req, res) => {
    let claimedRoomId;
    let claimedBookingId;

    try {
        const { bid } = req.params;
        const { bookingStatus } = req.body;
        const allowedStatuses = ["pending", "approved", "rejected", "cancelled"];

        if (!allowedStatuses.includes(bookingStatus)) {
            return res.status(400).json({
                success: false,
                message: "A valid booking status is required"
            });
        }

        const booking = await bookingmodel.findById(bid);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        const activeStatuses = ["pending", "approved"];
        const wasActive = activeStatuses.includes(booking.bookingStatus);
        const willBeActive = activeStatuses.includes(bookingStatus);

        if (booking.room && willBeActive && !wasActive) {
            const room = await roommodel.findOneAndUpdate(
                {
                    _id: booking.room,
                    status: "available",
                    activeBooking: { $in: [null] }
                },
                { $set: { status: "booked", activeBooking: booking._id } },
                { new: true }
            );

            if (!room) {
                const currentRoom = await roommodel.findById(booking.room);
                return res.status(409).json({
                    success: false,
                    code: currentRoom?.status === "booked" ? "ROOM_ALREADY_BOOKED" : "ROOM_UNAVAILABLE",
                    roomStatus: currentRoom?.status,
                    message: currentRoom?.status === "booked"
                        ? "This room is already occupied by another booking."
                        : "This room is unavailable and the booking cannot be reactivated."
                });
            }
            claimedRoomId = room._id;
            claimedBookingId = booking._id;
        }

        const updatedBooking = await bookingmodel.findOneAndUpdate(
            { _id: bid, bookingStatus: booking.bookingStatus },
            { $set: { bookingStatus } },
            { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            if (claimedRoomId && claimedBookingId) {
                await roommodel.updateOne(
                    {
                        _id: claimedRoomId,
                        status: "booked",
                        activeBooking: claimedBookingId
                    },
                    { $set: { status: "available" }, $unset: { activeBooking: 1 } }
                );
                claimedRoomId = null;
                claimedBookingId = null;
            }

            return res.status(409).json({
                success: false,
                code: "BOOKING_STATUS_CHANGED",
                message: "This booking changed while you were updating it. Refresh and try again."
            });
        }
        claimedRoomId = null;
        claimedBookingId = null;

        if (booking.room && !willBeActive) {
            const remainingActiveBookings = await bookingmodel.exists({
                _id: { $ne: booking._id },
                room: booking.room,
                bookingStatus: { $in: activeStatuses }
            });

            if (!remainingActiveBookings) {
                await roommodel.updateOne(
                    {
                        _id: booking.room,
                        status: "booked",
                        activeBooking: booking._id
                    },
                    { $set: { status: "available" }, $unset: { activeBooking: 1 } }
                );
            }
        }

        return res.status(200).json({
            success: true,
            message: "Booking status updated successfully",
            booking: updatedBooking
        });
    } catch (error) {
        console.log(error);
        if (claimedRoomId && claimedBookingId) {
            try {
                await roommodel.updateOne(
                    {
                        _id: claimedRoomId,
                        status: "booked",
                        activeBooking: claimedBookingId
                    },
                    { $set: { status: "available" }, $unset: { activeBooking: 1 } }
                );
            } catch (releaseError) {
                console.error("Failed to release room after booking status error:", releaseError);
            }
        }
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};
