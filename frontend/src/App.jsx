import React from 'react'
import {BrowserRouter,Routes,Route,useLocation} from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import About from './Components/About'
// import Blog from './Components/Blog'
import Contact from './Components/Contact'
import Gallery from './Components/Gallery'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Hotels from './Components/Hotel'
import HotelDetails from './Components/HotelDetails'
import Rooms from './Components/Room'
import Booking from './Components/Booking'
import Payment from './Components/Payment'

import Review from './Components/Review'
import MyBookings from "./Components/MyBookings";
import RoomAvailability from './Components/RoomAvailability'
import Profile from './Components/Profile'
function AppContent(){
  const location=useLocation()
  console.log(location)
  const hiderappbar=location.pathname === '/Login' ||
  location.pathname === '/login' ||
  location.pathname === '/register'||
  location.pathname === '/Register'
  
  return(
    <div>
      {!hiderappbar && <Header/>}
 <Routes>
        <Route path='/Register'element={<Register/>} />
        <Route path='/Login'element={<Login/>} />
        <Route path='/About'element={<About/>} />
        {/* <Route path='/Blog'element={<Blog/>} /> */}
        <Route path='/Contact'element={<Contact/>} />
        <Route path='/Gallery'element={<Gallery/>} />


        <Route path='/'element={<Home/>} />
        <Route path='/hotels' element={<Hotels/>} />
        <Route path='/HotelDetails/:id'element={<HotelDetails/>} />
        <Route path='/Room'element={<Rooms/>} />
        <Route path='/RoomAvailability'element={<RoomAvailability/>} />
        <Route path='/Booking'element={<Booking/>} />
        <Route path='/Payment'element={<Payment/>} />
        <Route path='/MyBookings'element={<MyBookings/>} />
        <Route path='/Profile'element={<Profile/>} />
        <Route path='/Review'element={<Review/>} />



      </Routes>
      
      {!hiderappbar && <Footer/>}
    </div>
  )
}

export default function App() {
  return (
    <div>
      <BrowserRouter>
      {/* <Header/>
      <Routes>
        <Route path='/Register'element={<Register/>} />
        <Route path='/Login'element={<Login/>} />
        <Route path='/About'element={<About/>} />
        <Route path='/Blog'element={<Blog/>} />
        <Route path='/Contact'element={<Contact/>} />
        <Route path='/Gallery'element={<Gallery/>} />


        <Route path='/'element={<Home/>} />
        <Route path='/hotels' element={<Hotels/>} />
        <Route path='/HotelDetails/:id'element={<HotelDetails/>} />
        <Route path='/Room'element={<Rooms/>} />
        <Route path='/RoomAvailability'element={<RoomAvailability/>} />
        <Route path='/Booking'element={<Booking/>} />
        <Route path='/Payment'element={<Payment/>} />
        <Route path='/MyBookings'element={<MyBookings/>} />
        <Route path='/Review'element={<Review/>} />



      </Routes>  
      <Footer/> */}
      <AppContent/>
      </BrowserRouter>
    </div>
  )
}
