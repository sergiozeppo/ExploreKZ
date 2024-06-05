import './index.css';
// import { baseClient } from '../../apiSdk/BaseClient';
import { ProfileApi } from '../profile/Profile';
import CustomError from '../../components/Validation/error';
import { CustomToast } from '../../components/Toast';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { validate } from '../../components/Validation';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../context/Global';
import { loginFn } from '../../apiSdk/LoginUser';
import { token as MyToken } from '../../apiSdk/token';
import { tokenClient } from '../../apiSdk/TokenClient';

interface Passwords {
    currentPassword: string;
    newPassword: string;
}

export default function ChangePassword() {
    const navigate = useNavigate();
    const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<Passwords>({
        mode: 'onChange',
    });
    const token = JSON.parse(localStorage.getItem('userToken') || '[]').token;
    const { setIsLogin } = useContext(GlobalContext);

    useEffect(() => {
        if (!token) {
            CustomToast('error', 'You need to login before change password');
            navigate('/');
        }
    });

    const handleSumbitChangePassword: SubmitHandler<Passwords> = (date) => {
        const userInfo = ProfileApi();
        userInfo.then((result) => {
            if (!(result instanceof Error)) {
                const api = tokenClient();
                api.customers()
                    .password()
                    .post({
                        body: {
                            id: result.id,
                            version: result.version,
                            currentPassword: date.currentPassword,
                            newPassword: date.newPassword,
                        },
                    })
                    .execute()
                    .then((response) => {
                        console.log(response);
                        const userToken = MyToken;
                        userToken.reset();
                        loginFn(response.body.email, date.newPassword)
                            .then((res) => {
                                console.log(res);
                                localStorage.setItem('isLogin', 'true');
                                localStorage.setItem('userToken', JSON.stringify(userToken.get()));
                                navigate('/profile');
                                setIsLogin(true);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        CustomToast('success', 'Password successfully changed');
                        // CustomToast('info', 'You need authorization again');
                        // setIsLogin(false);
                    })
                    .catch((error) => {
                        if (error.body) {
                            CustomToast('error', error.body.message);
                        } else {
                            CustomToast('error', 'An error occurred, please try again later');
                        }
                    });
            }
        });
    };

    return (
        <div className="conatiner-change-password">
            <div className="window-change-password">
                <form className="form-change-password" onSubmit={handleSubmit(handleSumbitChangePassword)}>
                    <div className="input-notice-container">
                        <div className="form-password-container">
                            <input
                                {...register('currentPassword', {
                                    required: 'This field is required',
                                    validate: validate.password,
                                })}
                                className="input-change-password"
                                placeholder="Current Password"
                                type={showPasswordCurrent ? 'text' : 'password'}
                            />
                            <div
                                className="toggle-password-visibility"
                                onClick={() => setShowPasswordCurrent(!showPasswordCurrent)}
                            >
                                {showPasswordCurrent ? <FiEye /> : <FiEyeOff />}
                            </div>
                        </div>
                        <CustomError message={errors.currentPassword?.message as string} />
                    </div>
                    <div className="input-notice-container">
                        <div className="form-password-container">
                            <input
                                {...register('newPassword', {
                                    required: 'This field is required',
                                    validate: validate.password,
                                })}
                                className="input-change-password"
                                placeholder="New Password"
                                type={showPasswordNew ? 'text' : 'password'}
                            />
                            <div
                                className="toggle-password-visibility"
                                onClick={() => setShowPasswordNew(!showPasswordNew)}
                            >
                                {showPasswordNew ? <FiEye /> : <FiEyeOff />}
                            </div>
                        </div>
                        <CustomError message={errors.newPassword?.message as string} />
                    </div>
                    <button className="btn change-password-btn" type="submit">
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
}
