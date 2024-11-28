import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../SideBar/SideBar.jsx';
import { getCustomerById, updateCustomers } from '../../API/index.jsx';

const ProfileSet = () => {
    const [state, setState] = useState({
        customer: null,
        loading: true,
        error: null,
    });

    const [editMode, setEditMode] = useState(false); // Chế độ chỉnh sửa
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        phone: '',
        email: '',
        address: '',
    });

    // Lấy thông tin khách hàng từ API
    useEffect(() => {
        const customerId = localStorage.getItem('customerId');

        if (!customerId) {
            setState({
                customer: null,
                loading: false,
                error: 'Customer ID not found in localStorage.',
            });
            return;
        }

        const fetchCustomerData = async () => {
            try {
                const data = await getCustomerById(customerId);
                setState({
                    customer: data,
                    loading: false,
                    error: null,
                });

                // Gán dữ liệu ban đầu vào form
                setFormData({
                    name: data.name,
                    username: data.username,
                    phone: data.phone,
                    email: data.email,
                    address: data.address,
                });
            } catch (err) {
                console.error('Failed to fetch customer:', err);
                setState({
                    customer: null,
                    loading: false,
                    error: 'Unable to fetch profile data. Please try again later.',
                });
            }
        };

        fetchCustomerData();
    }, []);

    // Hàm xử lý thay đổi dữ liệu trong form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Hàm cập nhật thông tin khách hàng
    const handleUpdateProfile = async () => {
        const customerId = localStorage.getItem('customerId');
        if (!customerId) {
            alert('Customer ID is missing.');
            return;
        }

        try {
            // Gọi API để cập nhật thông tin khách hàng
            const updatedData = await updateCustomers(customerId, formData);
            setState((prevState) => ({
                ...prevState,
                customer: updatedData,
            }));
            setEditMode(false); // Thoát chế độ chỉnh sửa
            alert('Profile updated successfully!');
        } catch (err) {
            console.error('Failed to update profile:', err);
            alert('Error updating profile. Please try again.');
        }
    };

    const { customer, loading, error } = state;

    return (
        <>
            <SideBar />
            <section className="profile-container">
                <div className="profile-details">
                    <h1 className="text-xl font-bold mb-4">Your Profile</h1>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="error-message text-red-500">{error}</p>
                    ) : (
                        <>
                            <div className="profile-image mb-4">
                                {customer.imageUrl ? (
                                    <img
                                        src={`http://localhost:8089${customer.imageUrl}`}
                                        alt="Profile"
                                        className="profile-picture rounded-full w-32 h-32 object-cover"
                                    />
                                ) : (
                                    <div className="placeholder-image rounded-full w-32 h-32 bg-gray-300 flex items-center justify-center">
                                        No Image
                                    </div>
                                )}
                            </div>
                            {editMode ? (
                                <div className="edit-form">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Name"
                                        className="form-input"
                                    />
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder="Username"
                                        className="form-input"
                                    />
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Phone"
                                        className="form-input"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        className="form-input"
                                    />
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Address"
                                        className="form-input"
                                    />
                                    <button
                                        onClick={handleUpdateProfile}
                                        className="animated-btn mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditMode(false)}
                                        className="animated-btn mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-4"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <p className="profile-loc">
                                        <strong>Name:</strong> {customer.name}
                                    </p>
                                    <p className="profile-loc">
                                        <strong>Username:</strong> {customer.username}
                                    </p>
                                    <p className="profile-loc">
                                        <strong>Phone:</strong> {customer.phone}
                                    </p>
                                    <p className="profile-loc">
                                        <strong>Email:</strong> {customer.email}
                                    </p>
                                    <p className="profile-loc">
                                        <strong>Address:</strong> {customer.address}
                                    </p>
                                    <p className="profile-loc">
                                        <strong>Member Since:</strong>{' '}
                                        {new Date(customer.createdDate).toLocaleDateString()}
                                    </p>
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="animated-btn mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Edit Profile
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default ProfileSet;
