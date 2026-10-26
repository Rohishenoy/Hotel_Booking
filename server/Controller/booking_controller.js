
import bookingmodel from "../Models/booking_model.js";
import roommodel from "../Models/room_model.js";
import hotelmodel from "../Models/hotel_model.js";
import mongoose from "mongoose";

// ADD BOOKING
export const AddBooking = async (req, res) => {
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
            hotel,
            status: "available"
        });
        if (!selectedRoom) {
            return res.status(400).json({
                success: false,
                message: "Selected room is not available for this hotel"
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

        const savedBooking = await booking.save();

        return res.status(201).json({
            success: true,
            message: "Room booked successfully",
            booking: savedBooking
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
