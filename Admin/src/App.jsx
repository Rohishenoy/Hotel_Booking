import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation
} from "react-router-dom";

import AddHotel from "./Components/AddHotel";
import AddLocation from "./Components/AddLocation";
import AdminDashboard from "./Components/AdminDashboard";
import AdminLogin from "./Components/AdminLogin";
import Layout from "./Components/Layout";
import ManageHotel from "./Components/ManageHotel";
import ManageLocation from "./Components/ManageLocation";
import ManageUser from "./Components/ManageUser";
import UpdateHotel from "./Components/UpdateHotel";
import UpdateLocation from "./Components/UpdateLocation";
import UpdateRoom from "./Components/UpdateRoom";
import AddRoom from "./Components/AddRoom";
import ManageRoom from "./Components/ManageRoom";
import ManageBooking from "./Components/ManageBooking";
import ManagePayment from "./Components/ManagePayment";
import ManageReview from "./Components/ManageReview";
import ManageContact from "./Components/ManageContact";


function AppContent() {
  const location = useLocation();

  const hiderappbar =
    location.pathname === "/AdminLogin" ||
    location.pathname === "/Adminlogin";

  return (
    <div>
      <Routes>
        
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/AdminLogin" replace />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/AddLocation" element={<AddLocation />}  />
          <Route path="/ManageLocation" element={<ManageLocation />}/>
          <Route path="/UpdateLocation/:lid" element={<UpdateLocation />}/>
          <Route path="/ManageUser" element={<ManageUser />} />
          <Route path="/AddHotel" element={<AddHotel />} />
          <Route path="/ManageHotel" element={<ManageHotel />}  />
          <Route path="/UpdateHotel/:hid" element={<UpdateHotel />}  />
          <Route path="/AddRoom" element={<AddRoom />}/>
          <Route path="/ManageRoom" element={<ManageRoom />}/>
          <Route path="/UpdateRoom/:rid" element={<UpdateRoom />}/>
          <Route path="/ManageBooking" element={<ManageBooking />}/>
          <Route path="/ManagePayment" element={<ManagePayment />}/>
          <Route path="/ManageReview"element={<ManageReview />}/>
          <Route path="/ManageContact" element={<ManageContact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}