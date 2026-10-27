import axios from 'axios';

// Địa chỉ cổng của ASP.NET Core API
const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. GET: Lấy toàn bộ danh sách dịch vụ từ Back-end
export const getServices = async () => {
  const response = await apiClient.get('/services');
  return response.data;
};

// 2. GET: Lấy chi tiết 1 dịch vụ theo ID
export const getServiceById = async (id) => {
  const response = await apiClient.get(`/services/${id}`);
  return response.data;
};

// 3. POST: Gửi dữ liệu từ Front-end để Back-end tạo dịch vụ mới
export const createService = async (serviceData) => {
  const response = await apiClient.post('/services', serviceData);
  return response.data;
};

// 4. PUT: Cập nhật thông tin dịch vụ theo ID
export const updateService = async (id, updatedData) => {
  const response = await apiClient.put(`/services/${id}`, updatedData);
  return response.data;
};

// 5. DELETE: Xóa dịch vụ theo ID
export const deleteService = async (id) => {
  const response = await apiClient.delete(`/services/${id}`);
  return response.data;
};

export default apiClient;
