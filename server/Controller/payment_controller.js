
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
            paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
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
