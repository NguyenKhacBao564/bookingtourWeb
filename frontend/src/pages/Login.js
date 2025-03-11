import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/login.scss";
import Validator from "../feature/validator";
import FormInput from '../components/FormInput';
import { loginApi } from '../feature/auth/services/authApi';
import Page from "../pages/Home";

function Login() {
    const navigate = useNavigate();
    
    useEffect(() => {
        document.body.style.overflow = "hidden"; // Ẩn thanh cuộn khi vào trang đăng nhập
        return () => {
            document.body.style.overflow = "auto"; // Hiện lại thanh cuộn khi rời trang đăng nhập
        };
    }, []);
    
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [msg, setMsg] = useState('');

    // Ô input
    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Nhập email",
            label: "Nhập email",
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Nhập mật khẩu",
            label: "Nhập mật khẩu",
        },
    ];


    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("[LOGIN] Form submitted with values ", values);
        try {
            const result = await loginApi(values.email, values.password);
            if (result.success) {
                setMsg(`Chào mừng ${result.user.full_name}, đang chuyển hướng...`);
                localStorage.setItem('token', result.token); // Lưu token
                setTimeout(() => {
                    navigate('/homeAfterlogin'); // Điều hướng sau khi đăng nhập thành công
                }, 1500);
            } else {
                setMsg(result.message || 'Đăng nhập thất bại');
            }
        } catch (err) {
            console.error(err);
            setMsg('Lỗi kết nối server');
        }
    }

    return (
        <div className="loginPage flex">
            <div className="containterLogin flex">
                <div className="introduceDiv flex">
                    <div className="introduceDiv--header">
                        <h1 className="title">Chào mừng đến với </h1>
                        <h2>Tour Guide</h2>
                        <p>Chào mừng bạn đến với hệ thống đặt tour du lịch số 1 PTIT! Hãy khám phá những chuyến đi tuyệt vời và lên kế hoạch cho hành trình sắp tới của bạn ngay hôm nay!</p>
                        <Link to="/register" className="btn--login">Đăng ký</Link>
                    </div>
                    <img src="/img1.png" alt="Illustration"/>
                </div>

                <div className="formDiv flex">
                    <div className="header--LoginForm">
                        <img src="./logo.png" alt="Logo" />
                        <h2>Đăng nhập</h2>
                    </div>
                    <form className="login-form grid" onSubmit={handleSubmit}>
                        {msg && <span className="login-msg">{msg}</span>}
                        {inputs.map((input) => (
                            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                        ))}
                        <a href="#" className="forgotPassword">Quên mật khẩu?</a>
                        <button type="submit" className="btn--login">Đăng nhập</button>
                        <span className="or">Hoặc</span>
                        <div className="footer--LoginForm">
                            <button className="btn--loginWithGoogle">
                                <img src="./google.png" className='icon-large' alt="Google Login"/>
                            </button>
                            <button className="btn--loginWithFacebook">
                                <img src="./facebook.png" className='icon-large' alt="Facebook Login"/>
                            </button>
                        </div>
                    </form>     
                </div>
            </div>
        </div>
    );
}

export default Login;
