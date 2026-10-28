import { useContext } from 'react'
import adminAvatar from '../assets/images/avatar/avatar.jpg'
import { DataContainer } from '../Context/MyContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {

  const Navigate=useNavigate()
  const{theme,setTheme}=useContext(DataContainer)
 const handlelogout = () => {
  const confirmSignout = window.confirm("Are you sure you want to logout?");

  if (confirmSignout) {
    localStorage.removeItem("admin-token");
    alert("Logout successful");
    Navigate("/Adminlogin");
  }
};
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
         <button className="icon-button theme-toggle" onClick={()=>setTheme(theme ==='dark'? 'light':'dark')} type="button" data-theme-toggle aria-label="Switch color theme" title="Switch color theme">
            {/* <i className="bi bi-moon-stars" data-theme-icon aria-hidden="true" /> */}
            <i className={theme === 'dark'?'bi bi-moon-stars': 'bi bi-sun'}></i>
          </button>
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
              <li><button className="dropdown-item" onClick={handlelogout} > Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    </div>
  )
}
