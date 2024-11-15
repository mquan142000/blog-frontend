import React, { useState } from "react";
import './Login.css';
import '../../App.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import video from '../../LoginAssets/video.mp4';
import logo from '../../LoginAssets/logo.png';

import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8089/api/auth/login', {
                username: userName,
                password: password,
            });

            console.log('Đăng nhập thành công:', response.data);

            if (response.data && response.data.token) {
                const token = response.data.token;
                
                // Lưu token vào localStorage
                localStorage.setItem('token', token);

                // Giải mã token (jwt) và lấy thông tin tên từ payload
                const decodedToken = JSON.parse(atob(token.split('.')[1]));  // Giải mã phần payload của token
                const firstName = decodedToken.name;  // Lấy tên từ token

                // Lưu tên vào localStorage để sử dụng cho các component khác
                localStorage.setItem('firstName', firstName);

                Swal.fire({
                    title: 'Đăng nhập thành công!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    navigate('/product');
                });
            }
        } catch (error) {
            if (error.response) {
                console.error('Lỗi đăng nhập:', error.response.data);
                Swal.fire('Lỗi đăng nhập', error.response.data.message || 'Tên đăng nhập hoặc mật khẩu không chính xác', 'error');
            } else {
                console.error('Lỗi:', error.message);
                Swal.fire('Lỗi kết nối', 'Không thể kết nối đến máy chủ', 'error');
            }
        }
    };

    return (
        <div className='loginPage flex'>
            <div className="container flex">
                <div className="videoDiv">
                    <div className="video-container">
                        <video src={video} autoPlay muted loop></video>
                    </div>
                    <div className="textDiv">
                        <h2 className="title">Học IT Dễ Dàng – Cung cấp kiến thức căn bản và nâng cao trong lĩnh vực Công Nghệ Thông Tin.</h2>
                        <p>Chia sẻ tri thức, kết nối đam mê công nghệ.</p>
                    </div>
                    <div className="footerDiv flex">
                        <span className="text">Bạn chưa có tài khoản?</span>
                        <Link to={'/register'}>
                            <button className="btn">Đăng ký</button>
                        </Link>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image" />
                        <h3>Welcome Back!</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="form grid">
                        <span className="showMessage">Login Status will go here</span>
                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Enter Username"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn flex">
                            <span>Login</span>
                            <AiOutlineSwapRight className='icon' />
                        </button>

                        <span className="forgotPassword">
                            Forgot your password? <a href="">Click Here</a>
                        </span>

                    </form>

                </div>

            </div>
        </div>
    );
}

export default Login;
