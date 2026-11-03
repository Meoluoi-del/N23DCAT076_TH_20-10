import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Kiểm tra 4 điều kiện của mật khẩu theo thời gian thực
  const password = formData.password;
  const isLengthValid = password.length >= 12;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

  // Validate toàn bộ dữ liệu trước khi submit
  const validateForm = () => {
    const newErrors = {};

    // Validate Họ tên
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên.';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập địa chỉ email.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Email không đúng định dạng (VD: example@gmail.com).';
    }

    // Validate Password theo 4 quy tắc bắt buộc
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu.';
    } else if (!isLengthValid) {
      newErrors.password = 'Mật khẩu phải có ít nhất 12 ký tự.';
    } else if (!hasUpperCase) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất 1 chữ in hoa (A-Z).';
    } else if (!hasNumber) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất 1 chữ số (0-9).';
    } else if (!hasSpecialChar) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (!, @, #, $, %, ...).';
    }

    // Validate Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận lại mật khẩu.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không trùng khớp.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Xóa lỗi của trường đang gõ
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
      const res = await registerUser({
        email: formData.email.trim(),
        password: formData.password,
        fullName: formData.fullName.trim(),
      });

      setSuccessMsg(res.message || 'Đăng ký thành công! Đang chuyển đến trang đăng nhập...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.message || 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '460px', margin: '40px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '6px', background: '#fff', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', margin: '0 0 10px 0', fontSize: '22px', fontWeight: 'bold' }}>
        Đăng ký tài khoản
      </h2>
      <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', margin: '0 0 24px 0' }}>
        Nhập thông tin bên dưới để tạo tài khoản mới
      </p>

      {/* Thông báo lỗi từ Server */}
      {serverError && (
        <div style={{ background: '#f8d7da', border: '1px solid #f5c6cb', color: '#721c24', padding: '10px 14px', borderRadius: '4px', fontSize: '13px', marginBottom: '16px' }}>
          {serverError}
        </div>
      )}

      {/* Thông báo thành công */}
      {successMsg && (
        <div style={{ background: '#d4edda', border: '1px solid #c3e6cb', color: '#155724', padding: '10px 14px', borderRadius: '4px', fontSize: '13px', marginBottom: '16px' }}>
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Họ và tên */}
        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
            Họ và tên
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="VD: Nguyễn Văn A"
            style={{ width: '100%', padding: '9px 12px', border: `1px solid ${errors.fullName ? '#dc3545' : '#ccc'}`, borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
          />
          {errors.fullName && <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>{errors.fullName}</span>}
        </div>

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

        {/* Mật khẩu */}
        <div style={{ marginBottom: '14px' }}>
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

          {/* Bảng hướng dẫn & kiểm tra 4 quy tắc mật khẩu */}
          <div style={{ marginTop: '8px', padding: '10px 12px', background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '4px', fontSize: '12px' }}>
            <div style={{ fontWeight: '600', marginBottom: '6px', color: '#495057' }}>Yêu cầu mật khẩu:</div>
            <div style={{ color: isLengthValid ? '#198754' : '#6c757d', marginBottom: '3px' }}>
              {isLengthValid ? '✓' : '•'} Có ít nhất 12 ký tự ({password.length}/12)
            </div>
            <div style={{ color: hasUpperCase ? '#198754' : '#6c757d', marginBottom: '3px' }}>
              {hasUpperCase ? '✓' : '•'} Có ít nhất một chữ in hoa (A-Z)
            </div>
            <div style={{ color: hasNumber ? '#198754' : '#6c757d', marginBottom: '3px' }}>
              {hasNumber ? '✓' : '•'} Có ít nhất một chữ số (0-9)
            </div>
            <div style={{ color: hasSpecialChar ? '#198754' : '#6c757d' }}>
              {hasSpecialChar ? '✓' : '•'} Có ít nhất một ký tự đặc biệt (!, @, #, $, %, ...)
            </div>
          </div>
        </div>

        {/* Xác nhận mật khẩu */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu"
            style={{ width: '100%', padding: '9px 12px', border: `1px solid ${errors.confirmPassword ? '#dc3545' : '#ccc'}`, borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
          />
          {errors.confirmPassword && <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px', display: 'block' }}>{errors.confirmPassword}</span>}
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
          {loading ? 'Đang xử lý...' : 'Đăng ký tài khoản'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px', color: '#666' }}>
        Đã có tài khoản?{' '}
        <Link to="/login" style={{ color: '#0d6efd', textDecoration: 'none', fontWeight: '600' }}>
          Đăng nhập ngay
        </Link>
      </div>
    </div>
  );
}
