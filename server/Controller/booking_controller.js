
import bookingmodel from "../Models/booking_model.js";
import roommodel from "../Models/room_model.js";
import hotelmodel from "../Models/hotel_model.js";
import mongoose from "mongoose";

const activeBookingStatuses = ["pending", "approved"];
const availabilityLockLeaseMs = 120000;

const acquireRoomAvailabilityLock = (roomId, hotel, lockId) => {
    const staleLockBefore = new Date(Date.now() - availabilityLockLeaseMs);

    return roommodel.findOneAndUpdate(
        {
            _id: roomId,
            hotel,
            status: { $ne: "inactive" },
            $or: [
                { availabilityLock: { $exists: false } },
                { availabilityLock: null },
                { availabilityLockAt: { $lt: staleLockBefore } }
            ]
        },
        {
            $set: {
                availabilityLock: lockId,
                availabilityLockAt: new Date()
            }
        },
        { new: true }
    );
};

const releaseRoomAvailabilityLock = async (roomId, lockId) => {
    try {
        await roommodel.updateOne(
            { _id: roomId, availabilityLock: lockId },
            { $unset: { availabilityLock: 1, availabilityLockAt: 1 } }
        );
    } catch (error) {
        console.error("Failed to release room availability lock:", error);
    }
};

// ADD BOOKING
export const AddBooking = async (req, res) => {
    let lockedRoomId;
    let lockId;

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

        if (selectedRoom.status === "inactive") {
            return res.status(409).json({
                success: false,
                code: "ROOM_UNAVAILABLE",
                roomStatus: selectedRoom.status,
                message: `Room ${selectedRoom.roomnumber} is currently unavailable. Please choose another room.`
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
        lockId = new mongoose.Types.ObjectId().toString();
        const lockedRoom = await acquireRoomAvailabilityLock(roomId, hotel, lockId);
        if (!lockedRoom) {
            const currentRoom = await roommodel.findOne({ _id: roomId, hotel });
            if (!currentRoom) {
                return res.status(404).json({
                    success: false,
                    code: "ROOM_NOT_FOUND",
                    message: "Selected room was not found at this hotel"
                });
            }

            return res.status(409).json({
                success: false,
                code: currentRoom.status === "inactive" ? "ROOM_UNAVAILABLE" : "ROOM_AVAILABILITY_CHECK_IN_PROGRESS",
                roomStatus: currentRoom.status,
                message: currentRoom.status === "inactive"
                    ? `Room ${currentRoom.roomnumber} is currently unavailable. Please choose another room.`
                    : "Room availability is being checked. Please try again."
            });
        }

        lockedRoomId = lockedRoom._id;

        const conflictingBooking = await bookingmodel.findOne({
            hotel,
            room: roomId,
            bookingStatus: { $in: activeBookingStatuses },
            arrival: { $lt: departureDate },
            departure: { $gt: arrivalDate }
        });
        if (conflictingBooking) {
            return res.status(409).json({
                success: false,
                code: "ROOM_ALREADY_BOOKED",
                message: `Room ${selectedRoom.roomnumber} is already reserved for some or all of these dates. Please choose another room or dates.`
            });
        }

        const savedBooking = await booking.save();

        return res.status(201).json({
            success: true,
            message: "Booking request submitted and pending hotel approval",
            booking: savedBooking
        });


    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Server error",

            error: error.message

        });

    } finally {
        if (lockedRoomId && lockId) {
            await releaseRoomAvailabilityLock(lockedRoomId, lockId);
        }
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
    let lockedRoomId;
    let lockId;

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

        const willBeActive = activeBookingStatuses.includes(bookingStatus);
        const mustCheckAvailability =
            willBeActive &&
            (bookingStatus === "approved" || !activeBookingStatuses.includes(booking.bookingStatus));

        if (mustCheckAvailability && booking.room) {
            lockId = new mongoose.Types.ObjectId().toString();
            const room = await acquireRoomAvailabilityLock(booking.room, booking.hotel, lockId);

            if (!room) {
                return res.status(409).json({
                    success: false,
                    code: "ROOM_UNAVAILABLE",
                    message: "The room is unavailable or another availability check is in progress."
                });
            }
            lockedRoomId = room._id;

            const conflictingBooking = await bookingmodel.findOne({
                _id: { $ne: booking._id },
                hotel: booking.hotel,
                room: booking.room,
                bookingStatus: { $in: activeBookingStatuses },
                arrival: { $lt: booking.departure },
                departure: { $gt: booking.arrival }
            });
            if (conflictingBooking) {
                return res.status(409).json({
                    success: false,
                    code: "ROOM_ALREADY_BOOKED",
                    message: "Another pending or approved booking already reserves this room for overlapping dates."
                });
            }
        }

        const updatedBooking = await bookingmodel.findOneAndUpdate(
            { _id: bid, bookingStatus: booking.bookingStatus },
            { $set: { bookingStatus } },
            { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            return res.status(409).json({
                success: false,
                code: "BOOKING_STATUS_CHANGED",
                message: "This booking changed while you were updating it. Refresh and try again."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Booking status updated successfully",
            booking: updatedBooking
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    } finally {
        if (lockedRoomId && lockId) {
            await releaseRoomAvailabilityLock(lockedRoomId, lockId);
        }
    }
};
