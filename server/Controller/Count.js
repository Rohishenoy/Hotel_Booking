import user from '../Models/user_model.js'
import hotel from '../Models/hotel_model.js'
import booking from '../Models/booking_model.js'
import payment from '../Models/payment_model.js'

//view all details(Admin)
export  const Count =async (req,res) => {
  try {
     const allusers = await user.countDocuments()
    const hotels = await hotel.countDocuments()
    const bookings = await booking.countDocuments()
    const payments = await payment.countDocuments({paymentStatus:"paid"})
    res.status(200).json({message:'fetched all count',allusers,hotels,bookings,payments})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'server error',error})
  }
}