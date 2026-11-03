import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '14px', color: '#333' }}>
                Xin chào, <strong>{user?.fullName || user?.email}</strong>
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  color: '#333',
                  fontWeight: '500',
                }}
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link to="/login" className="btn-login" style={{ textDecoration: 'none', color: '#333', fontSize: '14px', fontWeight: '500' }}>
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="btn btn-signup"
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#0d6efd',
                  color: '#fff',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '600',
                }}
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
