import './registration.css';
import { useForm, RegisterOptions } from 'react-hook-form';

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
    } = useForm();

    const onSubmit = (data: object) => {
        console.log(JSON.stringify(data));
    };

    const calculateAge = (birthday: Date) => {
        const today = new Date();
        const diff = today.getTime() - birthday.getTime();
        const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        return age;
    };

    function Error({ message, name }: { message: string | undefined; name: string | undefined }) {
        if (typeof message === 'string' && typeof name === 'string') {
            return errors?.[name] && <span className="input-notice-register">{message}</span>;
        }
    }

    const fieldsAboutUser: AboutUser[] = [
        {
            name: 'email',
            placeholder: 'Email',
            type: 'email',
            validate: {
                validate: {
                    noWhitespace: (value) =>
                        value.trim() === value || 'Email address must not contain leading or trailing whitespace',
                    hasAtSymbol: (value) =>
                        value.includes('@') ||
                        'Email address must contain an "@" symbol separating local part and domain name',
                    hasDomainName: (value) =>
                        /^.+@.+\..+$/.test(value) || 'Email address must contain a domain name (e.g., example.com)',
                    isEmail: (value) =>
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ||
                        'Email address must be properly formatted (e.g., user@example.com)',
                },
            },
        },
        {
            name: 'password',
            placeholder: 'Password',
            validate: {
                minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                },
                validate: {
                    hasUpperCase: (value) =>
                        /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                    hasLowerCase: (value) =>
                        /[a-z]/.test(value) || 'Password must contain at least one lowercase letter',
                    hasNumber: (value) => /\d/.test(value) || 'Password must contain at least one digit (0-9)',
                    hasSpecialCharacter: (value) =>
                        /[!@#$%^&*]/.test(value) || 'Password must contain at least one special character (!@#$%^&*)',
                    noWhitespace: (value) => value.trim() === value || 'No leading or trailing whitespace allowed',
                },
            },
        },
        {
            name: 'name',
            placeholder: 'First name',
            validate: {
                minLength: {
                    value: 1,
                    message: 'First Name must contain at least one character',
                },
                validate: {
                    noSpecialCharacter: (value) =>
                        /^[^\W\d_]+$/.test(value) || 'First name must contain not special characters and numbers',
                },
            },
        },
        {
            name: 'surname',
            placeholder: 'Last name',
            validate: {
                minLength: {
                    value: 1,
                    message: 'Last name must contain at least one character',
                },
                validate: {
                    noSpecialCharacter: (value) =>
                        /^[^\W\d_]+$/.test(value) || 'Last name must contain not special characters and numbers',
                },
            },
        },
        {
            name: 'date',
            type: 'date',
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
        <form className="registration-wrapper flex-style" onSubmit={handleSubmit(onSubmit)}>
            {fieldsAboutUser.map((field) => (
                <div key={field.name} className="registration-container">
                    <input
                        {...register(field.name, {
                            required: 'This field is required',
                            ...field.validate,
                        })}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="registration-about-user"
                    />
                    <Error message={errors?.[field.name]?.message?.toString()} name={field.name} />
                </div>
            ))}
            <fieldset className="registration-wrapper-delivery">
                <legend>Delivery address</legend>
                <div className="registration-conatiner-pair">
                    <div>
                        <select
                            {...register('country', {
                                required: 'This field is required',
                                validate: {
                                    notHasInitValue: (value) =>
                                        value !== 'Choose a country*' ? '' : 'Country must contain country',
                                },
                            })}
                            className="registration-delivery"
                            defaultValue={'Choose a country*'}
                        >
                            <option value="Choose a country*" disabled>
                                Choose a country*
                            </option>
                            <option value="Kazahstan">Kazahstan</option>
                        </select>
                        <Error message={errors?.country?.message?.toString()} name="country" />
                    </div>
                    <div>
                        <input
                            {...register('street', {
                                required: 'This field is required',
                                minLength: {
                                    value: 1,
                                    message: 'Street must contain at least one character',
                                },
                            })}
                            placeholder="Street"
                            className="registration-delivery"
                        />
                        <Error message={errors?.street?.message?.toString()} name="street" />
                    </div>
                </div>
                <div className="registration-conatiner-pair">
                    <div key="city">
                        <input
                            {...register('city', {
                                required: 'This field is required',
                                minLength: {
                                    value: 1,
                                    message: 'City must contain at least one character',
                                },
                                validate: {
                                    noSpecialCharacter: (value) =>
                                        /^[^\W\d_]+$/.test(value) ||
                                        'City must contain not special characters and numbers',
                                },
                            })}
                            placeholder="City"
                            className="registration-delivery"
                        />
                        <Error message={errors?.city?.message?.toString()} name="city" />
                    </div>
                    <div key="postalCode">
                        <input
                            {...register('postalCode', {
                                required: 'This field is required',
                                validate: {
                                    only6Numbers: (value) =>
                                        /^\d{6}$/.test(value) || 'Postal code in KZ must contain only 6 nubmers',
                                },
                            })}
                            placeholder="Postal Code"
                            className="registration-delivery"
                        />
                        <Error message={errors?.postalCode?.message?.toString()} name="postalCode" />
                    </div>
                </div>
            </fieldset>

            <button className="registration-btn-submit" type="submit">
                Отправить
            </button>
        </form>
    );
}

export default Registration;
