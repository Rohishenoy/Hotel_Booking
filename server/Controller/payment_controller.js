
import paymentmodel from "../Models/payment_model.js";
import bookingmodel from "../Models/booking_model.js";

export const ConfirmPayment = async (req, res) => {
    try {

        const {
            bookingId,
            userId,
            amount,
            paymentMethod,
            transactionId
        } = req.body;

        console.log("Payment data:", req.body);

        if (!bookingId || !userId || !amount || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        const booking = await bookingmodel.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        const payment = new paymentmodel({
            booking: bookingId,
            user: userId,
            amount: Number(amount),
            paymentMethod: paymentMethod,
            paymentStatus: "paid",
            transactionId: transactionId || ""
        });

        const savedPayment = await payment.save();

        const updatedBooking = await bookingmodel.findByIdAndUpdate(
            bookingId,
            {
                bookingStatus: "approved"
            },
            {
                new: true
            }
        );

        console.log("Payment saved:", savedPayment);

        return res.status(200).json({
            success: true,
            message: "Payment successful and booking approved",
            payment: savedPayment,
            booking: updatedBooking
        });

    } catch (error) {

        console.log("PAYMENT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};
