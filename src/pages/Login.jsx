import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Email không đúng định dạng.';
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setServerError('');

      // Gọi API đăng nhập Back-end (Query DB)
      const res = await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      });

      // Lưu user vào Context và Local Storage
      login(res.user);

      // Chuyển về trang chủ
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Email hoặc mật khẩu không chính xác!';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '6px', background: '#fff', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', margin: '0 0 10px 0', fontSize: '22px', fontWeight: 'bold' }}>
        Đăng nhập
      </h2>
      <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', margin: '0 0 24px 0' }}>
        Nhập thông tin tài khoản để tiếp tục
      </p>

      {/* Thông báo lỗi */}
      {serverError && (
        <div style={{ background: '#f8d7da', border: '1px solid #f5c6cb', color: '#721c24', padding: '10px 14px', borderRadius: '4px', fontSize: '13px', marginBottom: '16px' }}>
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
            Địa chỉ Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            style={{ width: '100%', padding: '9px 12px', border: `1px solid ${errors.email ? '#dc3545' : '#ccc'}`, borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
          />
          {errors.email && <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>{errors.email}</span>}
        </div>

        {/* Password */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
            style={{ width: '100%', padding: '9px 12px', border: `1px solid ${errors.password ? '#dc3545' : '#ccc'}`, borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
          />
          {errors.password && <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>{errors.password}</span>}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#0d6efd',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px', color: '#666' }}>
        Chưa có tài khoản?{' '}
        <Link to="/register" style={{ color: '#0d6efd', textDecoration: 'none', fontWeight: '600' }}>
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
}
