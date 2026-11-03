import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ServicesManager from './pages/ServicesManager';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Menu điều hướng gắn với AuthContext */}
        <Navbar />

        <main>
          <Routes>
            {/* Trang chủ */}
            <Route path="/" element={<Home />} />

            {/* Trang quản lý dịch vụ (CRUD qua API) */}
            <Route path="/services" element={<ServicesManager />} />

            {/* Trang giới thiệu */}
            <Route path="/about-us" element={<AboutUs />} />

            {/* Trang đăng nhập */}
            <Route path="/login" element={<Login />} />

            {/* Trang đăng ký */}
            <Route path="/register" element={<Register />} />
            
            {/* 404 Not Found */}
            <Route path="*" element={
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <h2>404 - Không tìm thấy trang</h2>
                <p>Đường dẫn bạn truy cập không tồn tại.</p>
              </div>
            } />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
