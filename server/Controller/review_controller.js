import reviewmodel from "../Models/review_model.js";


// ADD REVIEW
export const AddReview = async (req, res) => {
    try {

        const {
            user,
            hotel,
            rating,
            review
        } = req.body;

        if (!user || !hotel || !rating) {
            return res.status(400).json({
                success: false,
                message: "User, hotel and rating are required"
            });
        }

        if (Number(rating) < 1 || Number(rating) > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5"
            });
        }

        const newReview = new reviewmodel({
            user,
            hotel,
            rating: Number(rating),
            review
        });

        const savedReview = await newReview.save();

        return res.status(201).json({
            success: true,
            message: "Review added successfully",
            review: savedReview
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


// VIEW ALL REVIEWS
export const ViewReview = async (req, res) => {
    try {

        const reviews = await reviewmodel
            .find()
            .populate("user")
            .populate("hotel");

        return res.status(200).json({
            success: true,
            reviews
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


// VIEW REVIEWS BY HOTEL
export const ViewReviewByHotel = async (req, res) => {
    try {

        const { hotel } = req.params;

        const reviews = await reviewmodel
            .find({
                hotel,
                status: "active"
            })
            .populate("user");

        return res.status(200).json({
            success: true,
            reviews
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


// UPDATE REVIEW
export const UpdateReview = async (req, res) => {
    try {

        const { rid } = req.params;

        const updatedReview =
            await reviewmodel.findByIdAndUpdate(
                rid,
                req.body,
                { new: true }
            );

        if (!updatedReview) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Review updated successfully",
            review: updatedReview
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


// DELETE REVIEW
export const DeleteReview = async (req, res) => {
    try {

        const { rid } = req.params;

        const deletedReview =
            await reviewmodel.findByIdAndDelete(rid);

        if (!deletedReview) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

