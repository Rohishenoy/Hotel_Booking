import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AddHotel from './Components/AddHotel'
import AddLocation from './Components/AddLocation'
import AdminDashboard from './Components/AdminDashboard'
import AdminLogin from './Components/AdminLogin'
import Layout from './Components/Layout'
import ManageHotel from './Components/ManageHotel'
import ManageLocation from './Components/ManageLocation'
import ManageUser from './Components/ManageUser'
import UpdateHotel from './Components/UpdateHotel'
import UpdateLocation from './Components/UpdateLocation'
import UpdateRoom from './Components/UpdateRoom'
import AddRoom from './Components/AddRoom'
import ManageRoom from './Components/ManageRoom'
import ManageBooking from './Components/ManageBooking'
import ManagePayment from './Components/ManagePayment'
import ManageReview from './Components/ManageReview'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Adminlogin" element={<AdminLogin />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/admindashboard" replace />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/AddLocation" element={<AddLocation />} />
          <Route path="/ManageLocation" element={<ManageLocation />} />
          <Route path="/UpdateLocation/:lid" element={<UpdateLocation />} />
          <Route path="/ManageUser" element={<ManageUser />} />
          <Route path="/AddHotel" element={<AddHotel />} />
          <Route path="/ManageHotel" element={<ManageHotel />} />
          <Route path="/UpdateHotel/:hid" element={<UpdateHotel />} />
          <Route path="/UpdateRoom/:rid" element={<UpdateRoom />} />
          <Route path="/AddRoom" element={<AddRoom />} />
          <Route path="/ManageRoom" element={<ManageRoom />} />
          <Route path="/ManageBooking" element={<ManageBooking />} />
          <Route path="/ManagePayment" element={<ManagePayment />} />
          <Route path="/ManageReview" element={<ManageReview />} />
        </Route>
        <Route path="*" element={<Navigate to="/admindashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
