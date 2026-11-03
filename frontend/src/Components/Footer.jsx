import React from "react";
import { Link } from "react-router-dom";

const exploreLinks = [
  { to: "/", label: "Home" },
  { to: "/About", label: "About us" },
  { to: "/Room", label: "Our rooms" },
  { to: "/Gallery", label: "Gallery" },
  { to: "/Contact", label: "Contact" }
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__brand">
          <Link className="site-brand site-footer__logo" to="/" aria-label="Stay Haven home">
            <span className="site-brand__mark" aria-hidden="true">S</span>
            <span>
              <strong>STAY HAVEN</strong>
              <small>HOTELS &amp; RETREATS</small>
            </span>
          </Link>
          <p>Thoughtful stays, warm hospitality, and a little more room to feel at home.</p>
        </div>

        <div className="site-footer__column">
          <h2>Explore</h2>
          <ul>
            {exploreLinks.map(({ to, label }) => (
              <li key={to}><Link to={to}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="site-footer__column site-footer__contact">
          <h2>Get in touch</h2>
          <p><span aria-hidden="true">⌖</span> We’re here to help plan your stay.</p>
          <a href="tel:+011234569540"><span aria-hidden="true">☎</span> +01 1234569540</a>
          <a href="mailto:demo@gmail.com"><span aria-hidden="true">✉</span> demo@gmail.com</a>
          <Link to="/Contact" className="site-footer__contact-link">Contact our team <span aria-hidden="true">→</span></Link>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} Stay Haven. All rights reserved.</p>
        <Link to="/Room">Find your next stay <span aria-hidden="true">↑</span></Link>
      </div>
    </footer>
  );
}
