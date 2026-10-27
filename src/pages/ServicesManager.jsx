import React, { useState, useEffect } from 'react';
import { getServices, createService, updateService, deleteService } from '../services/api';

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Chuyển tiền',
    fee: 0,
  });
  const [editingId, setEditingId] = useState(null);

  const fetchServices = async () => {
    try {
      setError(null);
      const data = await getServices();
      setServices(data);
    } catch (err) {
      console.error("Lỗi khi kết nối Back-end:", err);
      setError("Không thể kết nối với máy chủ Back-end. Vui lòng đảm bảo Back-end đang chạy.");
      setServices([
        { id: 1, title: 'Chuyển tiền 24/7', description: 'Chuyển khoản liên ngân hàng miễn phí.', category: 'Chuyển tiền', fee: 0 },
        { id: 2, title: 'Bảo mật Sinh trắc học', description: 'Xác thực vân tay và nhận diện khuôn mặt.', category: 'Bảo mật', fee: 0 },
        { id: 3, title: 'Gửi tiết kiệm Online', description: 'Lãi suất ưu đãi theo kỳ hạn.', category: 'Tiết kiệm', fee: 0 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'fee' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      if (editingId) {
        await updateService(editingId, { id: editingId, ...formData });
      } else {
        await createService(formData);
      }
      setFormData({ title: '', description: '', category: 'Chuyển tiền', fee: 0 });
      setEditingId(null);
      fetchServices();
    } catch (err) {
      alert("Lỗi khi lưu dữ liệu: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category || 'Chuyển tiền',
      fee: service.fee || 0,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', category: 'Chuyển tiền', fee: 0 });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này không?")) {
      try {
        await deleteService(id);
        fetchServices();
      } catch (err) {
        alert("Lỗi khi xóa dịch vụ: " + err.message);
      }
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      
      {/* Tiêu đề trang đơn giản */}
      <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '16px', marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: 'bold' }}>Quản lý dịch vụ</h2>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          Danh sách và biểu mẫu cập nhật dữ liệu dịch vụ trực tuyến qua API
        </p>
      </div>

      {error && (
        <div style={{ background: '#f8f9fa', border: '1px solid #ddd', padding: '10px 14px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px', color: '#666' }}>
          {error}
        </div>
      )}

      {/* Biểu mẫu Thêm / Sửa */}
      <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '4px', padding: '20px', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>
          {editingId ? `Cập nhật dịch vụ (ID: ${editingId})` : 'Thêm dịch vụ mới'}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px', marginBottom: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Tên dịch vụ</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Nhập tên dịch vụ"
                style={{ width: '100%', padding: '8px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Danh mục</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
              >
                <option value="Chuyển tiền">Chuyển tiền</option>
                <option value="Bảo mật">Bảo mật</option>
                <option value="Tiết kiệm">Tiết kiệm</option>
                <option value="Thanh toán">Thanh toán</option>
                <option value="Tín dụng">Tín dụng</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Phí dịch vụ (VNĐ)</label>
              <input
                type="number"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                min="0"
                step="1000"
                style={{ width: '100%', padding: '8px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Mô tả chi tiết</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Nhập mô tả dịch vụ..."
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{
                padding: '8px 20px',
                backgroundColor: '#0d6efd',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              {editingId ? 'Lưu thay đổi' : 'Thêm mới'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Bảng danh sách dịch vụ (Table CRUD cơ bản) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
          Danh sách dịch vụ ({services.length})
        </h3>
        <button
          onClick={fetchServices}
          style={{
            padding: '6px 12px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          Làm mới
        </button>
      </div>

      {loading ? (
        <p style={{ color: '#666', fontSize: '14px' }}>Đang tải dữ liệu...</p>
      ) : (
        <div style={{ overflowX: 'auto', border: '1px solid #ddd', borderRadius: '4px', background: '#fff' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
                <th style={{ padding: '10px 12px', width: '50px' }}>ID</th>
                <th style={{ padding: '10px 12px', width: '200px' }}>Tên dịch vụ</th>
                <th style={{ padding: '10px 12px', width: '120px' }}>Danh mục</th>
                <th style={{ padding: '10px 12px' }}>Mô tả</th>
                <th style={{ padding: '10px 12px', width: '120px' }}>Phí (VNĐ)</th>
                <th style={{ padding: '10px 12px', width: '130px', textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, index) => (
                <tr key={s.id} style={{ borderBottom: index < services.length - 1 ? '1px solid #eee' : 'none' }}>
                  <td style={{ padding: '10px 12px', color: '#666' }}>{s.id}</td>
                  <td style={{ padding: '10px 12px', fontWeight: '600' }}>{s.title}</td>
                  <td style={{ padding: '10px 12px', color: '#555' }}>{s.category || 'Mặc định'}</td>
                  <td style={{ padding: '10px 12px', color: '#555', lineHeight: '1.4' }}>{s.description}</td>
                  <td style={{ padding: '10px 12px', color: '#333' }}>
                    {s.fee === 0 ? 'Miễn phí' : `${Number(s.fee).toLocaleString('vi-VN')} đ`}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                    <button
                      onClick={() => handleEdit(s)}
                      style={{
                        padding: '4px 8px',
                        marginRight: '6px',
                        border: '1px solid #0d6efd',
                        backgroundColor: '#fff',
                        color: '#0d6efd',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      style={{
                        padding: '4px 8px',
                        border: '1px solid #dc3545',
                        backgroundColor: '#fff',
                        color: '#dc3545',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
