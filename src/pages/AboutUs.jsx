import React from 'react';
export default function AboutUs() {
  return (
    <div className="about-page" style={{ padding: '60px 0', minHeight: '70vh' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1a56db', marginBottom: '20px' }}>
          Về Chúng Tôi
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '30px' }}>
          Chào mừng bạn đến với <strong>Digital Smart Wallet</strong> – Nền tảng công nghệ tài chính hiện đại hàng đầu. 
        
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '40px' }}>
          <div style={{ padding: '24px', background: '#f3f4f6', borderRadius: '12px' }}>
            <h3 style={{ color: '#111827', marginBottom: '10px' }}>Tầm Nhìn</h3>
            <p style={{ color: '#6b7280' }}>Ngân hàng số được yêu thích và tin dùng nhất</p>
          </div>
          <div style={{ padding: '24px', background: '#f3f4f6', borderRadius: '12px' }}>
            <h3 style={{ color: '#111827', marginBottom: '10px' }}>Sứ Mệnh</h3>
            <p style={{ color: '#6b7280' }}>Đơn giản hóa mọi giao dịch trực tuyến </p>
          </div>
        </div>
      </div>
    </div>
  );
}