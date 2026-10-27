import React, { useState, useEffect } from 'react';
import { getServices, createService, updateService, deleteService } from '../services/api';

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState(null); // Thông báo thành công / thất bại

  // State quản lý Form Thêm mới / Cập nhật
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Chuyển tiền',
    fee: 0,
  });
  const [editingId, setEditingId] = useState(null);

  // Hiển thị thông báo trong 3 giây
  const showToast = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3500);
  };

  // 1. GET: Lấy danh sách dịch vụ từ API qua Axios (GET request)
  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await getServices();
      setServices(data);
      setIsConnected(true);
    } catch (err) {
      console.error("Lỗi khi kết nối Back-end:", err);
      setIsConnected(false);
      showToast("Không thể kết nối với Back-end (Hãy chạy 'dotnet run' tại port 5000).", "error");
      // Dữ liệu mẫu dự phòng khi chưa bật Back-end
      setServices([
        { id: 1, title: 'Chuyển tiền 24/7 (Offline)', description: 'Miễn phí giao dịch chuyển khoản liên ngân hàng 24/7.', category: 'Chuyển tiền', fee: 0 },
        { id: 2, title: 'Bảo mật Sinh trắc học (Offline)', description: 'Bảo mật tuyệt đối bằng nhận diện khuôn mặt và vân tay.', category: 'Bảo mật', fee: 0 },
        { id: 3, title: 'Gửi tiết kiệm Online (Offline)', description: 'Lãi suất hấp dẫn lên đến 7.5%/năm, rút gốc linh hoạt.', category: 'Tiết kiệm', fee: 0 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Xử lý thay đổi dữ liệu trong form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'fee' ? Number(value) : value,
    });
  };

  // 2. POST (Tạo mới) & PUT (Cập nhật) qua Axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      showToast("Vui lòng điền đầy đủ Tên dịch vụ và Mô tả!", "error");
      return;
    }

    try {
      if (editingId) {
        // Gửi HTTP PUT request đến: http://localhost:5000/api/services/{id}
        await updateService(editingId, { id: editingId, ...formData });
        showToast(`[PUT] Cập nhật thành công dịch vụ ID = ${editingId}!`, "success");
      } else {
        // Gửi HTTP POST request đến: http://localhost:5000/api/services
        const created = await createService(formData);
        showToast(`[POST] Thêm mới thành công dịch vụ "${created.title}" (ID: ${created.id})!`, "success");
      }

      // Reset form sau khi gửi thành công
      setFormData({ title: '', description: '', category: 'Chuyển tiền', fee: 0 });
      setEditingId(null);
      fetchServices(); // Tải lại danh sách mới nhất
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message;
      showToast(`Lỗi: ${errMsg}`, "error");
    }
  };

  // Nạp dữ liệu vào form khi bấm nút "Sửa (PUT)"
  const handleEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category || 'Chuyển tiền',
      fee: service.fee || 0,
    });
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // 3. DELETE (Xóa dịch vụ) qua Axios
  const handleDelete = async (id, title) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa dịch vụ: "${title}" (ID: ${id})?`)) {
      try {
        // Gửi HTTP DELETE request đến: http://localhost:5000/api/services/{id}
        await deleteService(id);
        showToast(`[DELETE] Đã xóa thành công dịch vụ ID = ${id}!`, "success");
        fetchServices(); // Tải lại danh sách sau khi xóa
      } catch (err) {
        showToast(`Lỗi khi xóa: ${err.message}`, "error");
      }
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Tiêu đề trang */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#1a56db', fontSize: '2.2rem', marginBottom: '8px' }}>
          Quản Lý Dịch Vụ Với Axios (CRUD)
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.05rem' }}>
          Minh họa kết nối Front-end ReactJS $\leftrightarrow$ Back-end ASP.NET Core qua 4 phương thức:
          <span style={{ margin: '0 6px', padding: '2px 8px', background: '#e0f2fe', color: '#0369a1', borderRadius: '4px', fontWeight: 600 }}>GET</span>
          <span style={{ margin: '0 6px', padding: '2px 8px', background: '#dcfce7', color: '#15803d', borderRadius: '4px', fontWeight: 600 }}>POST</span>
          <span style={{ margin: '0 6px', padding: '2px 8px', background: '#fef3c7', color: '#b45309', borderRadius: '4px', fontWeight: 600 }}>PUT</span>
          <span style={{ margin: '0 6px', padding: '2px 8px', background: '#fee2e2', color: '#b91c1c', borderRadius: '4px', fontWeight: 600 }}>DELETE</span>
        </p>

        {/* Trạng thái kết nối */}
        <div style={{ marginTop: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600, background: isConnected ? '#ecfdf5' : '#fef2f2', color: isConnected ? '#059669' : '#dc2626', border: `1px solid ${isConnected ? '#a7f3d0' : '#fecaca'}` }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: isConnected ? '#10b981' : '#ef4444' }}></span>
          {isConnected 
            ? 'Đã kết nối thành công với ASP.NET Core Back-end (http://localhost:5000/api)' 
            : 'Đang ở chế độ Offline (Hãy khởi động Back-end tại port 5000 để lưu trữ thật)'}
        </div>
      </div>

      {/* Thông báo dạng Toast Alert */}
      {message && (
        <div style={{
          padding: '14px 20px',
          borderRadius: '8px',
          marginBottom: '24px',
          fontWeight: 500,
          backgroundColor: message.type === 'success' ? '#ecfdf5' : '#fef2f2',
          color: message.type === 'success' ? '#065f46' : '#991b1b',
          border: `1px solid ${message.type === 'success' ? '#6ee7b7' : '#fca5a5'}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{message.type === 'success' ? '✅' : '⚠️'} {message.text}</span>
          <button onClick={() => setMessage(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: 'inherit' }}>✕</button>
        </div>
      )}

      {/* KHỐI FORM GỬI REQUEST: POST (Thêm mới) & PUT (Cập nhật) */}
      <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
          <h3 style={{ margin: 0, color: '#111827', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {editingId ? (
              <>
                <span style={{ background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>PUT</span>
                Chỉnh sửa dịch vụ (ID: {editingId})
              </>
            ) : (
              <>
                <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>POST</span>
                Thêm dịch vụ mới vào Database
              </>
            )}
          </h3>
          {editingId && (
            <button 
              type="button" 
              onClick={() => { setEditingId(null); setFormData({ title: '', description: '', category: 'Chuyển tiền', fee: 0 }); }}
              style={{ padding: '6px 14px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Hủy chế độ sửa
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>Tên dịch vụ:</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange}
              placeholder="VD: Mở tài khoản số đẹp"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.95rem' }}
              required 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>Danh mục:</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.95rem' }}
            >
              <option value="Chuyển tiền">Chuyển tiền</option>
              <option value="Bảo mật">Bảo mật</option>
              <option value="Tiết kiệm">Tiết kiệm</option>
              <option value="Thanh toán">Thanh toán</option>
              <option value="Thẻ tín dụng">Thẻ tín dụng</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>Phí dịch vụ (VNĐ):</label>
            <input 
              type="number" 
              name="fee" 
              value={formData.fee} 
              onChange={handleChange}
              min="0"
              step="1000"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ gridColumn: 'span 3' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>Mô tả chi tiết:</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              rows="3"
              placeholder="Nhập mô tả các lợi ích, tính năng của dịch vụ..."
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.95rem' }}
              required 
            />
          </div>

          <div style={{ gridColumn: 'span 3', display: 'flex', gap: '12px', marginTop: '6px' }}>
            <button 
              type="submit" 
              style={{ 
                padding: '12px 28px', 
                backgroundColor: editingId ? '#d97706' : '#1a56db', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '6px', 
                fontWeight: 600, 
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {editingId ? 'Cập nhật thay đổi (Gửi PUT)' : 'Thêm mới vào Database (Gửi POST)'}
            </button>
          </div>
        </form>
      </div>

      {/* DANH SÁCH DỊCH VỤ HIỂN THỊ: GET & DELETE */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#111827', fontSize: '1.35rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>GET</span>
          Danh sách dịch vụ hiện có ({services.length})
        </h3>
        <button 
          onClick={fetchServices} 
          style={{ padding: '8px 16px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 }}
        >
          🔄 Làm mới (Reload GET)
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
          Đang gọi API lấy danh sách dịch vụ qua Axios...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {services.map((item) => (
            <div key={item.id} style={{ 
              border: '1px solid #e5e7eb', 
              borderRadius: '12px', 
              padding: '22px', 
              background: '#ffffff', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.8rem', background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '20px', fontWeight: 600 }}>
                    {item.category || 'Dịch vụ'}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: item.fee === 0 ? '#059669' : '#d97706' }}>
                    {item.fee === 0 ? 'Miễn phí' : `${Number(item.fee).toLocaleString('vi-VN')} đ`}
                  </span>
                </div>
                <h4 style={{ margin: '8px 0', fontSize: '1.25rem', color: '#111827', fontWeight: 700 }}>
                  {item.title}
                </h4>
                <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.6, margin: '8px 0 16px 0' }}>
                  {item.description}
                </p>
              </div>

              {/* Các nút hành động kích hoạt request PUT và DELETE */}
              <div style={{ display: 'flex', gap: '10px', paddingTop: '14px', borderTop: '1px solid #f3f4f6' }}>
                <button 
                  onClick={() => handleEdit(item)}
                  style={{ 
                    flex: 1, 
                    padding: '9px 0', 
                    background: '#eff6ff', 
                    border: '1px solid #bfdbfe', 
                    color: '#1d4ed8', 
                    borderRadius: '6px', 
                    cursor: 'pointer', 
                    fontWeight: 600,
                    fontSize: '0.9rem' 
                  }}
                >
                  Sửa (PUT)
                </button>
                <button 
                  onClick={() => handleDelete(item.id, item.title)}
                  style={{ 
                    flex: 1, 
                    padding: '9px 0', 
                    background: '#fef2f2', 
                    border: '1px solid #fecaca', 
                    color: '#dc2626', 
                    borderRadius: '6px', 
                    cursor: 'pointer', 
                    fontWeight: 600,
                    fontSize: '0.9rem' 
                  }}
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
