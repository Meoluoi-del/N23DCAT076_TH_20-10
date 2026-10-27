import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-container">
        <div className="logo">
          <NavLink to="/">
            Smart<span>Wallet</span>
          </NavLink>
        </div>

        <nav className="nav-menu">
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Trang chủ
          </NavLink>

          <NavLink 
            to="/services" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Dịch vụ
          </NavLink>

          <NavLink 
            to="/about-us" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Giới thiệu
          </NavLink>
        </nav>

        <div className="nav-action">
          <a href="#login" className="btn-login">Đăng nhập</a>
          <a href="#register" className="btn btn-signup">Đăng ký</a>
        </div>
      </div>
    </header>
  );
}
