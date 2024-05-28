import './registration.css';
import { useForm, RegisterOptions, SubmitHandler } from 'react-hook-form';
import { registerFn } from '../../apiSdk/RegistrationUser';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox, FormControlLabel, Switch } from '@mui/material';
import { useContext, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';
import { loginFn } from '../../apiSdk/LoginUser';
import { token } from '../../apiSdk/token';
import { GlobalContext } from '../../context/Global';
import { CustomToast } from '../../components/Toast';
import { UserParams } from '../../apiSdk/RegistrationUser';
import { validate } from '../../components/Validation';
import CustomError from '../../components/Validation/error';
import Loader from '../../components/Loader/loader';

interface AboutUser {
    name: string;
    placeholder?: string;
    validate?: RegisterOptions;
    type?: string;
}

function Registration() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<UserParams>({
        mode: 'onChange',
    });
    const navigate = useNavigate();
    const [checkBilling, setCheckBilling] = useState(false);
    const [checkDefaultShipping, setCheckDefaultShipping] = useState(false);
    const [checkDefaultBilling, setCheckDefaultBilling] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setIsLogin } = useContext(GlobalContext);
    const onSubmit: SubmitHandler<UserParams> = (userData) => {
        setLoading(true);
        registerFn({
            email: userData.email,
            password: userData.password,
            country: userData.country,
            city: userData.city,
            postalCode: userData.postalCode,
            streetName: userData.streetName,
            firstName: userData.firstName,
            lastName: userData.lastName,
            dateOfBirth: userData.dateOfBirth,
            countryBilling: userData.countryBilling,
            cityBilling: userData.cityBilling,
            postalCodeBilling: userData.postalCodeBilling,
            streetNameBilling: userData.streetNameBilling,
            defaultShipping: checkDefaultShipping,
            defaultBilling: checkDefaultBilling,
            alsoUseBilling: checkBilling,
        })
            .then((response) => {
                console.log('Registration successful:', response);
                setLoading(false);
                loginFn(userData.email, userData.password)
                    .then(() => {
                        navigate('/');
                        location.reload();
                        const userToken = token.get();
                        localStorage.setItem('isLogin', 'true');
                        localStorage.setItem('userToken', JSON.stringify(userToken));
                        setIsLogin(true);
                        CustomToast('success', 'Successful registration!');
                    })
                    .catch((err) => {
                        console.log('autologin is failed', err);
                    });
            })
            .catch((error) => {
                console.error('Registration failed:', error);
                setLoading(false);
                if (error.body) {
                    CustomToast('error', error.body.message);
                } else {
                    CustomToast('error', 'An error occurred, please try again later');
                }
            });
    };

    const calculateAge = (birthday: Date) => {
        const today = new Date();
        const diff = today.getTime() - birthday.getTime();
        const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.35));
        return age;
    };

    const fieldsAboutUser: AboutUser[] = [
        {
            name: 'email',
            placeholder: 'Email',
            type: 'email',
            validate: {
                validate: validate['email'],
            },
        },
        {
            name: 'password',
            placeholder: 'Password',
            type: showPassword ? 'text' : 'password',
            validate: {
                validate: validate['password'],
            },
        },
        {
            name: 'firstName',
            placeholder: 'First name',
            validate: {
                validate: validate['firstName'],
            },
        },
        {
            name: 'lastName',
            placeholder: 'Last name',
            validate: {
                validate: validate['lastName'],
            },
        },
        {
            name: 'dateOfBirth',
            type: 'date',
            placeholder: 'mm/dd/yyyy',
            validate: {
                validate: (value: string) => {
                    const selectedDate = new Date(value);
                    const age = calculateAge(selectedDate);
                    return age >= 13 ? true : 'You must be at least 13 years old to proceed';
                },
            },
        },
    ];

    return (
        <div className="registr-container">
            <form className="registration-wrapper flex-style" onSubmit={handleSubmit(onSubmit)}>
                {fieldsAboutUser.map((field) => (
                    <div key={field.name} className="registration-container">
                        {field.name === 'password' ? (
                            <div className="registration-password-container">
                                <input
                                    {...register(field.name as keyof UserParams, {
                                        required: 'This field is required',
                                        ...field.validate,
                                    })}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className={`registration-about-user ${errors?.[field.name as keyof UserParams] ? 'invalid-input' : ''}`}
                                />
                                <div
                                    className="toggle-password-visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FiEye /> : <FiEyeOff />}
                                </div>
                            </div>
                        ) : (
                            <input
                                {...register(field.name as keyof UserParams, {
                                    required: 'This field is required',
                                    ...field.validate,
                                })}
                                type={field.type}
                                placeholder={field.placeholder}
                                className={`registration-about-user ${errors?.[field.name as keyof UserParams] ? 'invalid-input' : ''}`}
                            />
                        )}
                        <CustomError message={errors?.[field.name as keyof UserParams]?.message} />
                    </div>
                ))}
                <fieldset className="registration-wrapper-delivery">
                    <legend>Delivery address</legend>
                    <div className="registration-container-pair">
                        <div>
                            <select
                                {...register('country', {
                                    required: 'This field is required',
                                })}
                                className={`registration-delivery ${errors?.country ? 'invalid-input' : ''}`}
                                defaultValue={''}
                            >
                                <option value="" disabled>
                                    Choose a country*
                                </option>
                                <option value="KZ">Kazakhstan</option>
                            </select>
                            <CustomError message={errors?.country?.message} />
                        </div>
                        <div>
                            <input
                                {...register('streetName', {
                                    required: 'This field is required',
                                    validate: validate['street'],
                                })}
                                placeholder="Street"
                                className={`registration-delivery ${errors?.streetName ? 'invalid-input' : ''}`}
                            />
                            <CustomError message={errors?.streetName?.message} />
                        </div>
                    </div>
                    <div className="registration-container-pair">
                        <div key="city">
                            <input
                                {...register('city', {
                                    required: 'This field is required',
                                    validate: validate['city'],
                                })}
                                placeholder="City"
                                className={`registration-delivery ${errors?.city ? 'invalid-input' : ''}`}
                            />
                            <CustomError message={errors?.city?.message} />
                        </div>
                        <div key="postalCode">
                            <input
                                {...register('postalCode', {
                                    required: 'This field is required',
                                    validate: validate['postalCode'],
                                })}
                                placeholder="Postal Code"
                                className={`registration-delivery ${errors?.postalCode ? 'invalid-input' : ''}`}
                            />
                            <CustomError message={errors?.postalCode?.message} />
                        </div>
                    </div>
                </fieldset>
                <div className="control-container">
                    <FormControlLabel
                        control={<Switch onChange={(e) => setCheckDefaultShipping(e.target.checked)} />}
                        label="Set as default address"
                        sx={{
                            '& .MuiSvgIcon-root': {
                                color: 'white',
                            },
                            color: 'white',
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(e) => {
                                    setCheckBilling(e.target.checked);
                                    e.target.checked === true ? setCheckDefaultBilling(false) : '';
                                }}
                            />
                        }
                        label="Also use as billing address"
                        sx={{
                            '& .MuiSvgIcon-root': {
                                color: 'white',
                            },
                            color: 'white',
                        }}
                    />
                </div>
                {!checkBilling && (
                    <>
                        <fieldset className="registration-wrapper-delivery">
                            <legend>Billing address</legend>
                            <div className="registration-container-pair">
                                <div>
                                    <select
                                        {...register('countryBilling', {
                                            required: 'This field is required',
                                        })}
                                        className={`registration-delivery ${errors?.countryBilling ? 'invalid-input' : ''}`}
                                        defaultValue={''}
                                    >
                                        <option value="" disabled>
                                            Choose a country*
                                        </option>
                                        <option value="KZ">Kazakhstan</option>
                                    </select>
                                    <CustomError message={errors?.countryBilling?.message} />
                                </div>
                                <div>
                                    <input
                                        {...register('streetNameBilling', {
                                            required: 'This field is required',
                                            validate: validate['street'],
                                        })}
                                        placeholder="Street"
                                        className={`registration-delivery ${errors?.streetNameBilling ? 'invalid-input' : ''}`}
                                    />
                                    <CustomError message={errors?.streetNameBilling?.message} />
                                </div>
                            </div>
                            <div className="registration-container-pair">
                                <div key="city">
                                    <input
                                        {...register('cityBilling', {
                                            required: 'This field is required',
                                            validate: validate['city'],
                                        })}
                                        placeholder="City"
                                        className={`registration-delivery ${errors?.cityBilling ? 'invalid-input' : ''}`}
                                    />
                                    <CustomError message={errors?.cityBilling?.message} />
                                </div>
                                <div key="postalCode">
                                    <input
                                        {...register('postalCodeBilling', {
                                            required: 'This field is required',
                                            validate: validate['postalCode'],
                                        })}
                                        placeholder="Postal Code"
                                        className={`registration-delivery ${errors?.postalCodeBilling ? 'invalid-input' : ''}`}
                                    />
                                    <CustomError message={errors?.postalCodeBilling?.message} />
                                </div>
                            </div>
                        </fieldset>
                        <div className="control-container">
                            <FormControlLabel
                                control={<Switch onChange={(e) => setCheckDefaultBilling(e.target.checked)} />}
                                label="Set as default address"
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        color: 'white',
                                    },
                                    color: 'white',
                                }}
                            />
                        </div>
                    </>
                )}

                <button className="button" type="submit">
                    Sign Up
                </button>
                {loading && <Loader />}
            </form>
            <div className="link-wrapper">
                Already have an account?
                <Link to="/login" className="signup-link">
                    Sign in!
                </Link>
            </div>
        </div>
    );
}

export default Registration;
