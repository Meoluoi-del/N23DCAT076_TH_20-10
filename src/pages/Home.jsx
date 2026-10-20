import React from 'react';
import './Home.css';
export default function Home() {
  return (
    <div className="home-wrapper">
      <section className="hero">
        <div className="container">
          <div className="hero__inner">
            <div className="hero__content">
              <span className="label">Digital Smart Wallet</span>
              <h1 className="hero__heading">Giải Pháp Thanh Toán Trực Tuyến Thế Hệ Mới</h1>
              <p className="hero__desc">
                Trải nghiệm dịch vụ ngân hàng số hiện đại, an toàn, bảo mật tuyệt đối và thực hiện các giao dịch chuyển tiền chỉ trong vài giây
              </p>
              <div className="hero__action">
                <a href="#services" className="btn">Khám phá </a>
                <a href="#about" className="btn btn-outline">Tìm hiểu </a>
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

      <section className="features" id="services">
        <div className="container">
          <h2 className="features__title">Dịch Vụ Trực Tuyến Nổi Bật</h2>
          <div className="features__grid">
            <div className="feature-card">
              <h3 className="feature-card__title">Chuyển tiền 24/7</h3>
              <p className="feature-card__desc">##</p>
            </div>
            <div className="feature-card">
              <h3 className="feature-card__title">Bảo mật Sinh trắc học</h3>
              <p className="feature-card__desc">##</p>
            </div>
            <div className="feature-card">
              <h3 className="feature-card__title">Gửi tiết kiệm Online</h3>
              <p className="feature-card__desc">##</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}