import React, { useState, useEffect } from 'react';
import { getServices, createService, updateService, deleteService } from '../services/api';

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State cho Form Thêm / Sửa
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Banking',
    fee: 0,
  });
  const [editingId, setEditingId] = useState(null);

  // 1. GET: Lấy danh sách dịch vụ từ API khi vào trang
  const fetchServices = async () => {
    try {
      setError(null);
      const data = await getServices();
      setServices(data);
    } catch (err) {
      console.error("Lỗi khi kết nối Back-end:", err);
      setError("Chưa kết nối được với Back-end ASP.NET Core (Hãy đảm bảo Back-end đang chạy ở port 5000).");
      // Dữ liệu mẫu dự phòng để giao diện không bị trống
      setServices([
        { id: 1, title: 'Chuyển tiền 24/7 (Offline)', description: 'Miễn phí chuyển khoản liên ngân hàng 24/7.', category: 'Chuyển tiền', fee: 0 },
        { id: 2, title: 'Bảo mật Sinh trắc học (Offline)', description: 'Bảo mật bằng vân tay và Face ID.', category: 'Bảo mật', fee: 0 },
        { id: 3, title: 'Gửi tiết kiệm Online (Offline)', description: 'Lãi suất hấp dẫn lên đến 7.5%/năm.', category: 'Tiết kiệm', fee: 0 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Xử lý thay đổi input trong Form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'fee' ? Number(value) : value,
    });
  };

  // 2. POST & PUT: Thêm mới hoặc Cập nhật dịch vụ
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert("Vui lòng điền đầy đủ Tên dịch vụ và Mô tả!");
      return;
    }

    try {
      if (editingId) {
        // Gửi PUT request cập nhật
        await updateService(editingId, { id: editingId, ...formData });
        alert("Cập nhật dịch vụ thành công!");
      } else {
        // Gửi POST request tạo mới
        await createService(formData);
        alert("Thêm dịch vụ mới thành công!");
      }

      // Reset form và load lại danh sách
      setFormData({ title: '', description: '', category: 'Banking', fee: 0 });
      setEditingId(null);
      fetchServices();
    } catch (err) {
      alert("Lỗi khi gửi dữ liệu sang Back-end: " + (err.response?.data?.message || err.message));
    }
  };

  // Chọn 1 dịch vụ để sửa (Đưa vào form)
  const handleEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category || 'Banking',
      fee: service.fee || 0,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. DELETE: Xóa dịch vụ
  const handleDelete = async (id) => {
    if (window.confirm(`Bạn có chắc muốn xóa dịch vụ ID: ${id}?`)) {
      try {
        await deleteService(id);
        alert("Đã xóa dịch vụ thành công!");
        fetchServices();
      } catch (err) {
        alert("Lỗi khi xóa dịch vụ: " + err.message);
      }
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ color: '#1a56db', textAlign: 'center', marginBottom: '8px' }}>
        Quản Lý Dịch Vụ Trực Tuyến (CRUD với API)
      </h1>
      <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '30px' }}>
        Tích hợp toàn diện 4 phương thức HTTP: <strong>GET, POST, PUT, DELETE</strong> kết nối tới ASP.NET Core Back-end.
      </p>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px' }}>
          ⚠️ {error}
        </div>
      )}

      {/* FORM THÊM / CẬP NHẬT DỊCH VỤ (POST & PUT) */}
      <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px', color: '#111827' }}>
          {editingId ? `Chỉnh sửa dịch vụ (ID: ${editingId}) [PUT]` : 'Thêm dịch vụ mới [POST]'}
        </h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Tên dịch vụ:</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange}
              placeholder="VD: Mở thẻ tín dụng Online"
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              required 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Danh mục:</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
            >
              <option value="Chuyển tiền">Chuyển tiền</option>
              <option value="Bảo mật">Bảo mật</option>
              <option value="Tiết kiệm">Tiết kiệm</option>
              <option value="Tín dụng">Tín dụng</option>
              <option value="Thanh toán hóa đơn">Thanh toán hóa đơn</option>
            </select>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Mô tả dịch vụ:</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              rows="3"
              placeholder="Nhập chi tiết mô tả dịch vụ..."
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              required 
            />
          </div>

          <div style={{ gridColumn: 'span 2', display: 'flex', gap: '12px' }}>
            <button 
              type="submit" 
              style={{ padding: '10px 24px', backgroundColor: editingId ? '#059669' : '#1a56db', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
            >
              {editingId ? 'Cập nhật thay đổi' : 'Gửi thêm mới (POST)'}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={() => { setEditingId(null); setFormData({ title: '', description: '', category: 'Banking', fee: 0 }); }}
                style={{ padding: '10px 20px', backgroundColor: '#9ca3af', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              >
                Hủy bỏ
              </button>
            )}
          </div>
        </form>
      </div>

      {/* DANH SÁCH DỊCH VỤ (GET & DELETE) */}
      <h3 style={{ marginBottom: '16px', color: '#111827' }}>
        Danh sách dịch vụ từ Database [GET] ({services.length})
      </h3>

      {loading ? (
        <p>Đang tải dữ liệu từ máy chủ...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {services.map((s) => (
            <div key={s.id} style={{ border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px', background: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.8rem', background: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>
                  {s.category || 'Dịch vụ'}
                </span>
                <h4 style={{ margin: '12px 0 8px 0', fontSize: '1.2rem', color: '#111827' }}>{s.title}</h4>
                <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.5 }}>{s.description}</p>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #f3f4f6', display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => handleEdit(s)}
                  style={{ flex: 1, padding: '8px', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}
                >
                  Sửa (PUT)
                </button>
                <button 
                  onClick={() => handleDelete(s.id)}
                  style={{ flex: 1, padding: '8px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}
                >
                  Xóa (DELETE)
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
