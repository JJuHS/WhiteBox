import "../../styles/auth/login.css";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { Helmet } from 'react-helmet';
import ClipLoader from "react-spinners/ClipLoader";

function Login() {
    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();
    const { login, getUser, getAccessToken } = useAuthStore();

    const [user, setUser] = useState({
        id: "",
        password: "",
    });

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user, [name]: value,
        });
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        const response = await login({...user});
        if (response.isSuccess) {
            const nickname = response.nickname;
            navigate(`/auth/profile/${nickname}`);
            setIsLoading(false)
            window.location.reload(true);
        } else {
            setIsLoading(false)
            alert("등록되지 않은 사용자이거나, 비밀번호가 일치하지 않습니다.");
            return;
        }
    };

    return (
        <div className={`login-container ${isLoading ? 'blur' : ''}`}>
            <Helmet>
                <title>White Box | 로그인</title>
            </Helmet>
            <div className="login-title">로그인</div>
            <div className="login-description">White Box에 로그인 하시면 다양한 서비스를 이용하실 수 있습니다.</div>
            <div className="login-modal">
                <form className="login-form-container" onSubmit={handleOnSubmit}>
                    <div className="login-form-group">
                        <label htmlFor="id">이메일</label>
                        <input type="email" id="id" name="id" value={user.id} onChange={handleOnChange} required disabled={isLoading}/>
                    </div>
                    <div className="login-form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input type="password" id="password" name="password" value={user.password} onChange={handleOnChange} required disabled={isLoading}/>
                    </div>

                    <button className="login-button" type="submit" disabled={isLoading}>로그인</button>
                </form>
            </div>
            {isLoading && (
                <div className="login-clip-loader">
                    <ClipLoader />
                </div>
            )}
        </div>
    );
};

export default Login;