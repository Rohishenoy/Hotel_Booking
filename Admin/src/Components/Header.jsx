import adminAvatar from '../assets/images/avatar/avatar.jpg'
import { Link } from 'react-router-dom'

export default function Header() {

  return (
    <div >
      <nav className="navbar admin-navbar navbar-expand bg-white">
      <div className="container-fluid px-3 px-lg-4">
        <button className="sidebar-toggle" type="button" data-sidebar-toggle aria-controls="adminSidebar" aria-expanded="true" aria-label="Toggle sidebar">
          <span />
          <span />
          <span />
        </button>
        <form className="d-none d-md-flex ms-3 flex-grow-1" role="search">
          <input className="form-control search-input" type="search" placeholder="Search users, orders, reports" aria-label="Search" />
        </form>
        <div className="navbar-actions ms-auto">
        
          <div className="dropdown">
            <button className="icon-button" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Notifications">
              <span className="notification-dot" />
              <i className="bi bi-bell" aria-hidden="true" />
            </button>
            <div className="dropdown-menu dropdown-menu-end notification-menu">
              <div className="dropdown-header fw-bold text-body">Notifications</div>
              <Link className="dropdown-item" to="/ManageUser">
                <span className="notification-title">New user registered</span>
                <span className="notification-time">4 minutes ago</span>
              </Link>
              <Link className="dropdown-item" to="/admindashboard">
                <span className="notification-title">Revenue target reached</span>
                <span className="notification-time">32 minutes ago</span>
              </Link>
              <Link className="dropdown-item" to="/ManageHotel">
                <span className="notification-title">Security review completed</span>
                <span className="notification-time">1 hour ago</span>
              </Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="profile-button dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img className="avatar-img avatar-sm" src={adminAvatar} alt="Admin" />
              <span className="profile-name d-none d-sm-inline">Admin</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><Link className="dropdown-item" to="/ManageUser">Manage users</Link></li>
              <li><Link className="dropdown-item" to="/ManageHotel">Manage hotels</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    </div>
  )
}
