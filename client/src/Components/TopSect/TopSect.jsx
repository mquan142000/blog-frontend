import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "../TopSect/topsect.css";
import { useLocation } from 'react-router-dom';

const TopSect = ({ setShow, size }) => {
  const [firstName, setFirstName] = useState('');
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');

  const location = useLocation();

  useEffect(() => {
    // Debug: Kiểm tra giá trị trong localStorage
    const storedFirstName = localStorage.getItem('firstName');
    const storedToken = localStorage.getItem('token');

    console.log('Stored FirstName:', storedFirstName);
    console.log('Stored Token:', storedToken);

    // Lấy firstName và token từ URL hoặc localStorage
    setFirstName(storedFirstName || '');
    setToken(storedToken || '');

    if (storedToken) {
      try {
        // Giải mã token (nếu có) để lấy tên người dùng
        const decodedToken = JSON.parse(atob(storedToken.split('.')[1])); // Giải mã JWT đơn giản mà không dùng thư viện ngoài
        setUserName(decodedToken.name || storedFirstName); // Gán tên người dùng nếu có từ decodedToken hoặc từ firstName
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
      }
    }
  }, [location]);

  return (
      <div className="topsect-container">
        <div className="topsect-header">
          {/* Hiển thị tên người dùng nếu có */}
          <p className="user-greeting">Hello {userName || firstName} 👋</p>
        </div>

        <div className="topsect-actions">
          <p onClick={() => setShow(true)} className="store-link">Store</p>
          <span className="cart-icon" onClick={() => setShow(false)}>
                    <FaShoppingCart className="icon" />
                </span>
          <p className="cart-size">{size}</p>
        </div>
      </div>
  );
};

export default TopSect;
