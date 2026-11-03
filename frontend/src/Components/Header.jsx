import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem("UserId"));

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("UserToken-1");
    localStorage.removeItem("UserId");
    closeMenu();
    navigate("/Login", { replace: true });
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/About", label: "About" },
    { to: "/Room", label: "Rooms" },
    { to: "/Gallery", label: "Gallery" },
    { to: "/Contact", label: "Contact" }
  ];

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-brand" to="/" onClick={closeMenu} aria-label="Stay Haven home">
          <span className="site-brand__mark" aria-hidden="true">S</span>
          <span>
            <strong>STAY HAVEN</strong>
            <small>HOTELS &amp; RETREATS</small>
          </span>
        </Link>

        <button
          className="site-header__toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-nav${menuOpen ? " site-nav--open" : ""}`} aria-label="Main navigation">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              className={`site-nav__link${location.pathname === to ? " site-nav__link--active" : ""}`}
              to={to}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
          {isLoggedIn ? (
            <>
              <Link className="site-nav__link" to="/MyBookings" onClick={closeMenu}>
                My bookings
              </Link>
              <Link className="site-nav__link" to="/Profile" onClick={closeMenu}>
                Manage profile
              </Link>
              <button className="site-nav__action site-nav__action--outline" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="site-nav__link" to="/Register" onClick={closeMenu}>Register</Link>
              <Link className="site-nav__action" to="/Login" onClick={closeMenu}>Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
