import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ServicesManager from './pages/ServicesManager';

function App() {
  return (
    <BrowserRouter>
      {/* Menu cố định */}
      <Navbar />

      <main>
        <Routes>
          {/* Trang chủ */}
          <Route path="/" element={<Home />} />

          {/* Trang quản lý dịch vụ kết nối với Back-end API (GET, POST, PUT, DELETE) */}
          <Route path="/services" element={<ServicesManager />} />

          {/* Trang giới thiệu */}
          <Route path="/about-us" element={<AboutUs />} />
          
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
  );
}

export default App;
