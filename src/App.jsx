import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <main>
        <Routes>

          <Route path="/" element={<Home />} />


          <Route path="/about-us" element={<AboutUs />} />
          
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