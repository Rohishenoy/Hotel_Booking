import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();


  const handlelogout = () => {

    const confirmSignout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmSignout) {

      // Remove login token
      localStorage.removeItem("UserToken-1");

      // Remove user ID
      localStorage.removeItem("UserId");

      alert("Logout successful");

      // Go to login page
      navigate("/register");
    }
  };


  return (
    <div>

      <header>

        <div className="header">

          <div className="container">

            <div className="row">

              {/* Logo */}

              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">

                <div className="full">

                  <div className="center-desk">

                    <div className="logo">

                      <Link to="/">
                        <img
                          src="images/logo.png"
                          alt="Hotel Logo"
                        />
                      </Link>

                    </div>

                  </div>

                </div>

              </div>


              {/* Navigation */}

              <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">

                <nav className="navigation navbar navbar-expand-md navbar-dark">

                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExample04"
                    aria-controls="navbarsExample04"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >

                    <span className="navbar-toggler-icon" />

                  </button>


                  <div
                    className="collapse navbar-collapse"
                    id="navbarsExample04"
                  >

                    <ul className="navbar-nav mr-auto">


                      {/* Home */}

                      <li className="nav-item">

                        <Link
                          className="nav-link"
                          to="/"
                        >
                          Home
                        </Link>

                      </li>


                      {/* About */}

                      <li className="nav-item">

                        <Link
                          className="nav-link"
                          to="/About"
                        >
                          About
                        </Link>

                      </li>


                      {/* Room */}

                      <li className="nav-item">

                        <Link
                          className="nav-link"
                          to="/Room"
                        >
                           Room
                        </Link>

                      </li>


                      {/* Gallery */}

                      <li className="nav-item">

                        <Link
                          className="nav-link"
                          to="/Gallery"
                        >
                          Gallery
                        </Link>

                      </li>


                    

                      {/* Contact */}

                      <li className="nav-item">

                        <Link
                          className="nav-link"
                          to="/Contact"
                        >
                          Contact Us
                        </Link>

                      </li>


                      {/* Register */}

                      <li className="nav-item">

                        <Link
                          className="nav-link"
                          to="/Register"
                        >
                          Register
                        </Link>

                      </li>


                      {/* Logout */}

                      <li className="nav-item">

                        <button
                          className="nav-link btn btn-link"
                          onClick={handlelogout}
                          style={{
                            border: "none",
                            background: "none",
                            cursor: "pointer"
                          }}
                        >
                          Logout
                        </button>

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
  );
}