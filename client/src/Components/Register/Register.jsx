import React, { useState } from "react";
import './Register.css';
import '../../App.css';
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';
import Swal from 'sweetalert2';

import video from '../../LoginAssets/video.mp4';
import logo from '../../LoginAssets/logo.png';

import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

const Register = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        Axios.post('http://localhost:8089/api/auth/register', {
            username: userName,
            password: password
        })
            .then((response) => {
                console.log(response.data);
                const { jwt } = response.data;
                Swal.fire({
                    title: 'Đăng ký thành công!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    navigate('/');
                });
            })
            .catch((error) => {
                setMessage('Error: Could not create user.');
                console.error(error);
            });
    }

    return (
        <div className='registerPage flex'>
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
                        <span className="text">Bạn có tài khoản?</span>
                        <Link to={'/'}>
                            <button className="btn">Đăng nhập</button>
                        </Link>
                    </div>
                </div>
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image" />
                        <h3>Let Us Know You!</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="form grid">
                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Enter Username"
                                    value={userName}
                                    onChange={(event) => setUserName(event.target.value)}
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
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn flex">
                            <span>Register</span>
                            <AiOutlineSwapRight className='icon' />
                        </button>
                        <span className="forgotPassword">
                            Forgot your password? <a href="#">Click Here</a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
