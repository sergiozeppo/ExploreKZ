import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './login.css';
import { loginFn } from '../../apiSdk/LoginUser';
import { baseClient } from '../../apiSdk/BaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { token } from '../../apiSdk/token';

type Inputs = {
    email: string;
    password: string;
};

export default function Login() {
    const isUserExist = localStorage.getItem('isLogin');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        trigger,
    } = useForm<Inputs>({ mode: 'onChange' });
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<Inputs> = (userData) => {
        setLoading(true);
        loginFn(userData.email, userData.password)
            .then(() => {
                setLoginError('');
                setPasswordError('');
                setLoading(false);
                navigate('/');
                const userToken = token.get();
                localStorage.setItem('isLogin', 'true');
                localStorage.setItem('userToken', JSON.stringify(userToken));
            })
            .catch((err) => {
                console.error(err);
                baseClient()
                    .customers()
                    .get({ queryArgs: { where: `email="${userData.email}"` } })
                    .execute()
                    .then((res) => {
                        console.log(res);
                        if (res.body.count > 0) {
                            setPasswordError('Invalid password!');
                            setLoginError('');
                        } else {
                            setLoginError('Email not found in system!');
                            setPasswordError('');
                        }
                        setLoading(false);
                    })
                    .catch((err) => console.error(err));
            });
    };
    useEffect(() => {
        if (isUserExist) {
            navigate('/');
        }
    });
    return (
        <div className="login-form-wrapper">
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <label>
                    <span className="label-title">Email</span>
                    <input
                        className={`login-input-email ${errors?.email ? 'invalid-input' : ''}`}
                        {...register('email', {
                            required: 'Mandatory field!',
                            validate: {
                                noWhitespace: (value) =>
                                    value.trim() === value ||
                                    'Email address must not contain leading or trailing whitespace',
                                hasAtSymbol: (value) =>
                                    value.includes('@') ||
                                    'Email address must contain an "@" symbol separating local part and domain name',
                                hasDomainName: (value) =>
                                    /^.+@.+\..+$/.test(value) ||
                                    'Email address must contain a domain name (e.g., example.com)',
                                isEmail: (value) =>
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ||
                                    'Email address must be properly formatted (e.g., user@example.com)',
                            },
                        })}
                        onBlur={() => trigger('password')}
                    />
                    {errors?.email && <span className="input-notice">{errors?.email?.message || 'Error'}</span>}
                    {loginError && <span className="input-notice">{loginError}</span>}
                </label>
                <label>
                    <span className="label-title">Password</span>
                    <div className="login-input-psw">
                        <input
                            className={`login-input-psw ${errors?.password ? 'invalid-input' : ''}`}
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                                required: 'Mandatory field!',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long',
                                },
                                validate: {
                                    hasUpperCase: (value) =>
                                        /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                                    hasLowerCase: (value) =>
                                        /[a-z]/.test(value) || 'Password must contain at least one lowercase letter',
                                    hasNumber: (value) =>
                                        /\d/.test(value) || 'Password must contain at least one digit (0-9)',
                                    hasSpecialCharacter: (value) =>
                                        /[!@#$%^&*]/.test(value) ||
                                        'Password must contain at least one special character (!@#$%^&*)',
                                    noWhitespace: (value) =>
                                        !/\s/.test(value) || 'No leading or trailing whitespace allowed',
                                },
                            })}
                            onBlur={() => trigger('email')}
                        />
                        <div className="psw-eye" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FiEye /> : <FiEyeOff />}
                        </div>
                    </div>
                    {errors.password && <span className="input-notice">{errors.password.message}</span>}
                    {passwordError && <span className="input-notice">{passwordError}</span>}
                </label>
                <button type="submit" disabled={!isValid}>
                    Login
                </button>
                {loading && (
                    <div className="loader-wrapper">
                        <div className="loader"></div>
                    </div>
                )}
            </form>
            <div className="link-wrapper">
                Haven't registered yet?
                <Link to="/registration" className="signup-link">
                    Sign up!
                </Link>
            </div>
        </div>
    );
}
