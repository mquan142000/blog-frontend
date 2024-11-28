import axios from "axios";

export const getOrders = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8089/api/products", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getOrders:", error);
        return { products: [] };
    }
};

export const getProduct = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8089/api/products", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getProduct:", error);
        return { products: [] };
    }
};

export const addProduct = async (productData) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn chưa đăng nhập. Vui lòng đăng nhập trước khi thêm sản phẩm.");
            return null;
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        };

        if (!productData.name || !productData.categoryId) {
            alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
            return null;
        }

        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("description", productData.description || "Không có mô tả");
        formData.append("price", productData.price || 0);
        formData.append("quantity", productData.quantity || 0);
        formData.append("categoryId", productData.categoryId);
        formData.append("isActive", productData.isActive !== undefined ? productData.isActive : true);
        if (productData.image) {
            formData.append("image", productData.image);
        } else {
            console.warn("Không có hình ảnh gửi kèm sản phẩm.");
        }

        const response = await axios.post("http://localhost:8089/api/products", formData, { headers });

        alert("Sản phẩm đã được thêm thành công!");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API thêm sản phẩm:", error);
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    alert("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.");
                    break;
                case 401:
                    alert("Bạn không có quyền thực hiện thao tác này. Vui lòng đăng nhập lại.");
                    break;
                case 403:
                    alert("Bạn không có quyền truy cập tài nguyên này.");
                    break;
                case 500:
                    alert("Lỗi từ server. Vui lòng thử lại sau.");
                    break;
                default:
                    alert("Đã xảy ra lỗi không xác định.");
            }
        } else {
            alert("Không thể kết nối tới server. Vui lòng kiểm tra kết nối mạng.");
        }

        return null;
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return { error: "Token không tồn tại" };
        }

        if (!productId || productId <= 0) {
            return { error: "ID sản phẩm không hợp lệ" };
        }

        const response = await axios.put(`http://localhost:8089/api/products/${productId}`, productData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API cập nhật sản phẩm:", error);
        return { error: "Lỗi khi cập nhật sản phẩm" };
    }
};

export const deleteProduct = async (productId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`http://localhost:8089/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.status === 204;
    } catch (error) {
        console.error("Lỗi khi gọi API xóa sản phẩm:", error);
        return { error: "Lỗi khi xóa sản phẩm" };
    }
};

export const getCategories = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8089/api/categories", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getCategories:", error);
        return [];
    }
};

export const getCustomers = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8089/api/customers", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getCustomers:", error);
        return [];
    }
};

export const getCustomerById = async () => {
    try {
        const token = localStorage.getItem("token");
        const customerId = localStorage.getItem("customerId");
        if (!customerId) {
            throw new Error("Không tìm thấy customerId trong localStorage");
        }

        const response = await axios.get(`http://localhost:8089/api/customers/${customerId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getCustomerById:", error);
        return { error: error.message || "Lỗi khi lấy thông tin khách hàng" };
    }
};

export const updateCustomers = async (customerId, updatedCustomerData) => {
    try {
        // Lấy token từ localStorage
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Token không tồn tại");
        }

        // Kiểm tra dữ liệu khách hàng trước khi gửi yêu cầu
        if (!updatedCustomerData || Object.keys(updatedCustomerData).length === 0) {
            throw new Error("Dữ liệu khách hàng không hợp lệ");
        }

        // Gửi yêu cầu PUT đến API
        const response = await axios.put(
            `http://localhost:8089/api/customers/${customerId}`,
            updatedCustomerData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'  // Đảm bảo gửi đúng định dạng JSON
                }
            }
        );

        // Trả về dữ liệu khách hàng đã được cập nhật
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API updateCustomers:", error);

        // Kiểm tra lỗi từ phản hồi của API
        if (error.response) {
            // Lỗi phản hồi từ API (ví dụ: mã lỗi 400, 404, 500)
            console.error("Lỗi từ API:", error.response.data);
            throw new Error(error.response.data.message || "Có lỗi xảy ra khi cập nhật khách hàng");
        } else if (error.request) {
            // Lỗi không nhận được phản hồi từ API
            console.error("Không nhận được phản hồi từ API:", error.request);
            throw new Error("Không nhận được phản hồi từ API");
        } else {
            // Lỗi trong quá trình gửi yêu cầu
            console.error("Lỗi trong quá trình gửi yêu cầu:", error.message);
            throw new Error(error.message || "Có lỗi xảy ra");
        }
    }
};
