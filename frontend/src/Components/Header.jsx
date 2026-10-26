import React from 'react'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <div>
     
  <header>
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
            <div className="full">
              <div className="center-desk">
                <div className="logo">
                  <a href="index.html"><img src="images/logo.png" alt="#" /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
            <nav className="navigation navbar navbar-expand-md navbar-dark ">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarsExample04">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item ">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/About">About</Link>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/Room">Our room</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Gallery">Gallery</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Blog">Blog</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Contact">Contact Us</Link>
                  </li>
                   <li className="nav-item">
                    <Link className="nav-link" to="/Register">Register</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
  
    </div>
  )
}
