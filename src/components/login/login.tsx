import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './login.css';

type Inputs = {
    email: string;
    password: string;
};

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm<Inputs>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        // Здесь будет вызываться метод для отправки данныз юзера на сервак
        console.log(data);
    };
    console.log('render');
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <label>
                Email:
                <input
                    className="login-input-email"
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
                />
                <div>{errors?.email && <span>{errors?.email?.message || 'Error'}</span>}</div>
            </label>
            <label>
                Password:
                <div className="login-input-psw">
                    <input
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
                                    value.trim() === value || 'No leading or trailing whitespace allowed',
                            },
                        })}
                    />
                    <div className="psw-eye" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                </div>
                {errors.password && <span>{errors.password.message}</span>}
            </label>
            <button type="submit" disabled={!isValid}>
                LOGIN
            </button>
        </form>
    );
}
