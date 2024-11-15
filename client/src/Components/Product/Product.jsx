import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Product/product.css';
import Swal from "sweetalert2";
import { FaRegStar } from 'react-icons/fa'; // Thêm icon tùy chọn

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lấy token từ localStorage để xác thực khi gọi API
    const token = localStorage.getItem("token");

    // Hàm lấy sản phẩm từ API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8089/api/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Lỗi lấy sản phẩm:', error);
                Swal.fire('Lỗi', 'Không thể tải dữ liệu sản phẩm.', 'error');
            }
        };

        fetchProducts();
    }, [token]);

    // Hiển thị danh sách sản phẩm dưới dạng card
    if (loading) {
        return <div className="loading">Đang tải...</div>;
    }

    return (
        <div className="card-container">
            {/* <h1 className="card-title">Danh Sách Sản Phẩm</h1> */}
            <div className="card-list">
                {products.map((product) => (
                    <div key={product.productId} className="card">
                        <div className="card-image">
                            {/* Ghép đường dẫn đầy đủ cho hình ảnh */}
                            <img src={`http://localhost:8089${product.imageUrl}`} alt={product.name} />
                        </div>
                        <div className="card-info">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <div className="card-footer">
                                <span className="card-price">${product.price}</span>
                                <button className="btn btn-primary">
                                    <FaRegStar className="icon" />
                                    Thêm vào yêu thích
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
