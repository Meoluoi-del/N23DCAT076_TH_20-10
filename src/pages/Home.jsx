import React, { useState, useEffect } from 'react';
import './Home.css';
import { getServices } from '../services/api';

export default function Home() {
  const [services, setServices] = useState([
    { id: 1, title: 'Chuyển tiền 24/7', description: 'Miễn phí toàn bộ giao dịch chuyển khoản liên ngân hàng nhanh chóng và bảo mật.' },
    { id: 2, title: 'Bảo mật Sinh trắc học', description: 'Xác thực bằng khuôn mặt và vân tay với công nghệ mã hóa tối tân chuẩn quốc tế.' },
    { id: 3, title: 'Gửi tiết kiệm Online', description: 'Lãi suất ưu đãi vượt trội, linh hoạt rút tiền và tất toán ngay trên ứng dụng di động.' }
  ]);

  // Tự động gọi API GET từ Back-end khi mở trang chủ
  useEffect(() => {
    getServices()
      .then((data) => {
        if (data && data.length > 0) {
          setServices(data);
        }
      })
      .catch((err) => {
        // Nếu chưa bật Back-end thì vẫn dùng dữ liệu mặc định để giao diện không bị lỗi
        console.log("Back-end chưa kết nối, sử dụng dữ liệu tĩnh.");
      });
  }, []);

  return (
    <div className="home-wrapper">
      <section className="hero">
        <div className="container">
          <div className="hero__inner">
            <div className="hero__content">
              <span className="label">Digital Smart Wallet</span>
              <h1 className="hero__heading">Giải Pháp Thanh Toán Trực Tuyến Thế Hệ Mới</h1>
              <p className="hero__desc">
                Trải nghiệm dịch vụ ngân hàng số hiện đại, an toàn, bảo mật tuyệt đối và thực hiện các giao dịch chuyển tiền chỉ trong vài giây.
              </p>
              <div className="hero__action">
                <a href="#services" className="btn">Khám phá</a>
                <a href="/services" className="btn btn-outline">Quản lý dịch vụ (API)</a>
              </div>
            </div>

            <div className="hero__media">
              <img 
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=60" 
                alt="Mobile Banking Banner" 
                className="hero__image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dịch vụ trực tuyến lấy dữ liệu từ Back-end API */}
      <section className="features" id="services">
        <div className="container">
          <h2 className="features__title">Dịch Vụ Trực Tuyến Nổi Bật</h2>
          <div className="features__grid">
            {services.map((item) => (
              <div key={item.id} className="feature-card">
                <h3 className="feature-card__title">{item.title}</h3>
                <p className="feature-card__desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
