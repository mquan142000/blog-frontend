import { useState, useEffect } from 'react';
import SideBar from '../SideBar/SideBar';
import { Link } from 'react-router-dom';
import "../Profile/profile.css";
import { getCustomerById } from "../../API/index.jsx"; // Sử dụng hàm getCustomerById từ API

const Profile = () => {
    const [customer, setCustomer] = useState(null); // Lưu trữ toàn bộ dữ liệu khách hàng
    const [loading, setLoading] = useState(true); // Hiển thị trạng thái khi đang tải
    const [error, setError] = useState(null); // Quản lý lỗi khi gọi API

    useEffect(() => {
        // Lấy customerId từ localStorage
        const customerId = localStorage.getItem('customerId');

        // Kiểm tra customerId trong localStorage
        console.log("customerId from localStorage:", customerId); // In ra để kiểm tra

        if (!customerId) {
            setError("Customer ID not found in localStorage.");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                // Gọi API để lấy thông tin khách hàng
                const data = await getCustomerById(customerId);
                setCustomer(data); // Lưu toàn bộ dữ liệu khách hàng
            } catch (err) {
                console.error("Failed to fetch customer:", err);
                setError("Unable to fetch profile data. Please try again later.");
            } finally {
                setLoading(false); // Dừng loading bất kể thành công hay thất bại
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <SideBar />
            <section>
                <section className="profile-container">
                    <section className="profile-details">
                        <h1>Your Profile</h1>
                        {loading ? (
                            <p>Loading...</p> // Hiển thị loading
                        ) : error ? (
                            <p className="error-message">{error}</p> // Hiển thị lỗi nếu có
                        ) : (
                            <>
                                <div className="profile-image">
                                    <img
                                        src={`http://localhost:8089${customer.imageUrl}`} // Gắn URL ảnh từ API
                                        alt="Profile"
                                        className="profile-picture"
                                    />
                                </div>
                                <p className="profile-loc">Name: {customer.name}</p>
                                <p className="profile-loc">Username: {customer.username}</p>
                                <p className="profile-loc">Phone: {customer.phone}</p>
                                <p className="profile-loc">Email: {customer.email}</p>
                                <p className="profile-loc">Address: {customer.address}</p>
                                <p className="profile-loc">Member Since: {customer.createdDate}</p>
                            </>
                        )}
                        <Link to="/settings">
                            <button className="animated-btn mt-6">Update profile</button>
                        </Link>
                    </section>
                </section>
            </section>
        </>
    );
};

export default Profile;
