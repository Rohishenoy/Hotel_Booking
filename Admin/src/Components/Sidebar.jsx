import adminAvatar from '../assets/images/avatar/avatar.jpg'
import { Link, NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <>
      <div className="sidebar-backdrop" data-sidebar-close />
      <aside className="admin-sidebar" id="adminSidebar" aria-label="Main navigation">
        <div className="sidebar-header">
          <Link className="brand-mark" to="/admindashboard" aria-label="Hotel management dashboard">
            <span className="brand-icon"><i className="bi bi-grid-1x2-fill" aria-hidden="true" /></span>
            <span className="brand-copy">
              <span className="brand-title">HOTEL ADMIN</span>
              <span className="brand-subtitle">Management</span>
            </span>
          </Link>
        </div>
        <nav className="sidebar-nav">
          <NavLink className="nav-link" to="/admindashboard" end>
            <span className="nav-icon"><i className="bi bi-speedometer2" aria-hidden="true" /></span>
            <span className="nav-text">Dashboard</span>
          </NavLink>
          <NavLink className="nav-link" to="/ManageUser">
            <span className="nav-icon"><i className="bi bi-people" aria-hidden="true" /></span>
            <span className="nav-text">Users</span>
          </NavLink>
          <NavLink className="nav-link" to="/ManageHotel">
            <span className="nav-icon"><i className="bi bi-building" aria-hidden="true" /></span>
            <span className="nav-text">Hotels</span>
          </NavLink>
          <NavLink className="nav-link" to="/ManageLocation">
            <span className="nav-icon"><i className="bi bi-geo-alt" aria-hidden="true" /></span>
            <span className="nav-text">Locations</span>
          </NavLink>
          <NavLink className="nav-link" to="/ManageRoom">
            <span className="nav-icon"><i className="bi bi-plus-square" aria-hidden="true" /></span>
            <span className="nav-text">Rooms</span>
          </NavLink>
             <NavLink className="nav-link" to="/ManageBooking">
            <span className="nav-icon"><i className="bi bi-geo" aria-hidden="true" /></span>
            <span className="nav-text">Booking</span>
          </NavLink>
             <NavLink className="nav-link" to="/ManagePayment">
            <span className="nav-icon"><i className="bi bi-geo" aria-hidden="true" /></span>
            <span className="nav-text">Payment</span>
          </NavLink>
             <NavLink className="nav-link" to="/ManageReview">
            <span className="nav-icon"><i className="bi bi-geo" aria-hidden="true" /></span>
            <span className="nav-text">Review</span>
          </NavLink>
             <NavLink className="nav-link" to="/ManageContact">
               <span className="nav-icon"><i className="bi bi-chat-left-text" aria-hidden="true" /></span>
               <span className="nav-text">Contact Messages</span>
             </NavLink>
        </nav>
        <div className="sidebar-user">
          <img className="avatar-img avatar-md sidebar-user-avatar" src={adminAvatar} alt="Admin" />
          <strong>Admin</strong>
          <small>Active Workspace</small>
        </div>
        <div className="sidebar-footer">
          <span className="status-dot" />
          <span className="sidebar-footer-text">System running smoothly</span>
        </div>
      </aside>
    </>
  )
}
