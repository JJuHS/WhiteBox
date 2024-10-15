import "../../styles/auth/sign-up.css";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { Helmet } from 'react-helmet';
import ClipLoader from "react-spinners/ClipLoader";

function SignUp() {
    const navigate = useNavigate();
    const { checkEmail, checkNickname, signUp, login} = useAuthStore();
    const [ nicknameLengthError, setNicknameLengthError ] = useState('');
    const [ passwordConfirmError, setPasswordConfirmError ] = useState('');
    const [ isCanSubmit, setIsCanSubmit ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    const [user, setUser] = useState({
        id: "",
        nickname: "",
        password: "",
        passwordConfirm: "",
    });

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        const updatedUser = { ...user, [name]: value}
        setUser(updatedUser)

        // 닉네임 글자 수 제한
        if (name === 'nickname' && value.length >= 10) {
            setNicknameLengthError('닉네임은 10글자를 초과할 수 없습니다.');
            return;
        } else {
            setNicknameLengthError('');
        }

        // 비밀번호 확인
        if (updatedUser.password && updatedUser.passwordConfirm && updatedUser.password !== updatedUser.passwordConfirm) {
            setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
            setIsCanSubmit(false);
        }
        if (updatedUser.password && updatedUser.passwordConfirm && updatedUser.password === updatedUser.passwordConfirm) {
            setPasswordConfirmError('');
            setIsCanSubmit(true);
        }
    };

    const validatePassword = (password) => {
        // 비밀번호는 최소 8자 이상, 숫자와 문자를 포함해야 함
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regex.test(password);
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        if (!isCanSubmit) {
            alert("입력한 정보를 확인해주세요.");
            setIsLoading(false);
            return;
        }
        
        if (!validatePassword(user.password)) {
            alert("비밀번호는 최소 8자 이상이며, 숫자와 문자를 포함해야 합니다.");
            setIsLoading(false);
            return;
        }

        if (user.password !== user.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            setIsLoading(false);
            return;
        }

        try {
            const emailCheck = await checkEmail({id: user.id});
            if (!emailCheck.isSuccess) {
                alert("이미 가입한 이메일입니다.");
                setIsLoading(false);
                return;
            }

            const nicknameCheck = await checkNickname({nickname: user.nickname});
            if (!nicknameCheck.isSuccess) {
                alert("이미 사용 중인 닉네임입니다.");
                setIsLoading(false);
                return;
            } 

            await signUp(user);
            await login(user);
            // 메인 페이지로 이동
            navigate(`/auth/profile/${user.nickname}`);
            setIsLoading(false);
        } catch (error) {
            alert("회원가입 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            setIsLoading(false);
        }
        setIsLoading(false);
    };

    return (
        <div className={`signup-container ${isLoading ? 'blur' : ''}`}>
            <Helmet>
                <title>White Box | 회원가입</title>
            </Helmet>
            <div className="title-signup">회원가입{isLoading? '참':"거짓"}</div>
            <div className="description-signup">White Box의 회원이 되시면 다양한 서비스를 이용하실 수 있습니다.</div>
            <div className="signup-modal">
                <form className='signup-form-container' onSubmit={handleOnSubmit}>
                    <div className="signup-form-group">
                        <label htmlFor="id">이메일</label>
                        <input type="email" id="id" name="id" value={user.id} onChange={handleOnChange} required/>
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="nickname">닉네임</label>
                        <input type="text" id="nickname" name="nickname" value={user.nickname} onChange={handleOnChange} maxLength={10} required/>
                    </div>
                    {nicknameLengthError && <div className="error-message"><p className="text-red-500">{nicknameLengthError}</p></div>}
                    <div className="signup-form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input type="password" id="password" name="password" value={user.password} onChange={handleOnChange} required/>
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="passwordConfirm">비밀번호 확인</label>
                        <input type="password" id="passwordConfirm" name="passwordConfirm" value={user.passwordConfirm} onChange={handleOnChange} required/>
                    </div>
                    {passwordConfirmError && <div className="error-message"><br /><p className="text-red-500">{passwordConfirmError}</p></div>}
                    <button className={`button-signup ${isCanSubmit ? '' : 'disabled'}`} type="submit">회원가입</button>
                </form>
            </div>
            {isLoading && (
                <div className="signup-clip-loader">
                    <ClipLoader />
                </div>
            )}
        </div>
    );
};

export default SignUp;
