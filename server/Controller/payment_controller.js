
import paymentmodel from "../Models/payment_model.js";
import bookingmodel from "../Models/booking_model.js";
import roommodel from "../Models/room_model.js";
import mongoose from "mongoose";

export const ConfirmPayment = async (req, res) => {
    let approvedBookingId;

    try {

        const {
            bookingId,
            userId,
            amount,
            paymentMethod,
            transactionId
        } = req.body;

        if (!bookingId || !userId || amount === undefined || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        if (!mongoose.isValidObjectId(bookingId) || !mongoose.isValidObjectId(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid booking or user"
            });
        }

        const paymentAmount = Number(amount);
        const allowedMethods = ["COD", "UPI", "Card"];
        if (!Number.isFinite(paymentAmount) || !allowedMethods.includes(paymentMethod)) {
            return res.status(400).json({
                success: false,
                message: "A valid payment amount and payment method are required"
            });
        }

        const booking = await bookingmodel.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        if (booking.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "This booking does not belong to the supplied user"
            });
        }

        if (booking.bookingStatus !== "pending") {
            return res.status(409).json({
                success: false,
                code: "BOOKING_NOT_PAYABLE",
                message: booking.bookingStatus === "approved"
                    ? "This booking has already been confirmed."
                    : "This booking is no longer active and cannot be paid."
            });
        }

        if (paymentAmount !== booking.totalAmount) {
            return res.status(400).json({
                success: false,
                message: "Payment amount does not match the booking total"
            });
        }

        if (booking.room) {
            const reservedRoom = await roommodel.exists({
                _id: booking.room,
                status: "booked",
                activeBooking: booking._id
            });

            if (!reservedRoom) {
                return res.status(409).json({
                    success: false,
                    code: "ROOM_RESERVATION_LOST",
                    message: "This room is no longer reserved for the booking. Please contact the hotel."
                });
            }
        }

        const updatedBooking = await bookingmodel.findOneAndUpdate(
            { _id: bookingId, user: userId, bookingStatus: "pending" },
            { $set: { bookingStatus: "approved" } },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(409).json({
                success: false,
                code: "BOOKING_STATUS_CHANGED",
                message: "This booking changed while payment was being processed. Refresh your bookings."
            });
        }
        approvedBookingId = updatedBooking._id;

        const payment = new paymentmodel({
            booking: bookingId,
            user: userId,
            amount: paymentAmount,
            paymentMethod: paymentMethod,
            paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
            transactionId: transactionId || ""
        });

        const savedPayment = await payment.save();
        approvedBookingId = null;

        console.log("Payment saved:", savedPayment);

        return res.status(200).json({
            success: true,
            message: "Payment successful and booking approved",
            payment: savedPayment,
            booking: updatedBooking
        });

    } catch (error) {

        console.log("PAYMENT ERROR:", error);

        if (approvedBookingId) {
            try {
                await bookingmodel.updateOne(
                    { _id: approvedBookingId, bookingStatus: "approved" },
                    { $set: { bookingStatus: "pending" } }
                );
            } catch (rollbackError) {
                console.error("Failed to restore booking status after payment error:", rollbackError);
            }
        }

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const ViewPayment = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const [payments, totalpayment] = await Promise.all([
            paymentmodel
                .find()
                .populate("user", "name email")
                .populate("booking", "roomType bookingStatus")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            paymentmodel.countDocuments()
        ]);

        return res.status(200).json({
            success: true,
            allpayment: payments,
            currentpage: page,
            totalpayment,
            totalpages: Math.ceil(totalpayment / limit) || 1,
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

export const MonthlyRevenue = async (req, res) => {
    try {
        const now = new Date();
        const startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5, 1));
        const endDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));

        const monthlyTotals = await paymentmodel.aggregate([
            {
                $match: {
                    paymentStatus: "paid",
                    createdAt: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m",
                            date: "$createdAt",
                            timezone: "UTC"
                        }
                    },
                    revenue: { $sum: "$amount" }
                }
            }
        ]);
        const revenueByMonth = new Map(
            monthlyTotals.map(({ _id, revenue }) => [_id, revenue])
        );
        const monthlyRevenue = Array.from({ length: 6 }, (_, index) => {
            const date = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth() + index, 1));
            const month = date.toISOString().slice(0, 7);
            return { month, revenue: revenueByMonth.get(month) || 0 };
        });

        return res.status(200).json({ success: true, monthlyRevenue });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch monthly revenue",
            error: error.message
        });
    }
};

export const DeletePayment = async (req, res) => {
    try {
        const { pid } = req.params;

        const deletedPayment = await paymentmodel.findByIdAndDelete(pid);

        if (!deletedPayment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Payment deleted successfully"
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
