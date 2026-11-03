import React, { createContext, useContext, useState } from 'react';

// Tạo Context cho Authentication
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Khởi tạo state trực tiếp từ Local Storage của trình duyệt (Lazy initialization)
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (err) {
      console.error("Lỗi khi đọc user từ Local Storage:", err);
      return null;
    }
  });

  // Hàm đăng nhập: Lưu vào State của Context và lưu vào Local Storage của browser
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  // Hàm đăng xuất: Xóa khỏi State của Context và xóa khỏi Local Storage của browser
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để các Component dễ dàng sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
  }
  return context;
};

export default AuthContext;
