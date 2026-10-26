import express from "express";

import {AddReview,ViewReview,ViewReviewByHotel,UpdateReview,DeleteReview} from "../Controller/review_controller.js";

const route = express.Router();


// Add Review / Rating
route.post("/AddReview", AddReview);

// View All Reviews
route.get("/ViewReview", ViewReview);

// View Reviews By Hotel
route.get("/ViewReviewByHotel/:hotel", ViewReviewByHotel);

// Update Review
route.put("/UpdateReview/:rid", UpdateReview);

// Delete Review
route.delete("/DeleteReview/:rid", DeleteReview);


export default route;