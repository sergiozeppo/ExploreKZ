import './registration.css';
import { useForm, RegisterOptions } from 'react-hook-form';

interface AboutUser {
    name: string;
    placeholder?: string;
    validate?: RegisterOptions;
    type?: string;
}

function Registration() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: object) => {
        console.log(JSON.stringify(data));
    };

    const calculateAge = (birthday: Date) => {
        const today = new Date();
        const diff = today.getTime() - birthday.getTime();
        const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        return age;
    };

    const fieldsAboutUser: AboutUser[] = [
        { name: 'email', placeholder: 'Email', type: 'email' },
        {
            name: 'password',
            placeholder: 'Password',
            validate: { pattern: /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Zа-яА-Я\d]{8,}$/ },
        },
        {
            name: 'name',
            placeholder: 'First name',
            validate: { pattern: /^[a-zA-Zа-яА-Я]+$/ },
        },
        { name: 'surname', placeholder: 'Last name', validate: { pattern: /^[a-zA-Zа-яА-Я]+$/ } },
        {
            name: 'date',
            type: 'date',
            validate: {
                validate: (value: string) => {
                    const selectedDate = new Date(value);
                    const age = calculateAge(selectedDate);
                    return age >= 13;
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
                </div>
            ))}
            <fieldset className="registration-wrapper-delivery">
                <legend>Delivery address</legend>
                <div className="registration-conatiner-pair">
                    <select
                        {...register('country', {
                            required: 'This field is required',
                        })}
                        className="registration-delivery"
                        defaultValue={'Choose a country*'}
                    >
                        <option value="Choose a country*" disabled>
                            Choose a country*
                        </option>
                        <option value="Kazahstan">Kazahstan</option>
                    </select>
                    <input
                        {...register('street', {
                            required: 'This field is required',
                            minLength: 1,
                        })}
                        placeholder="Street"
                        className="registration-delivery"
                    />
                </div>
                <div className="registration-conatiner-pair">
                    <div key="city">
                        <input
                            {...register('city', {
                                required: 'This field is required',
                                pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                                minLength: 1,
                            })}
                            placeholder="City"
                            className="registration-delivery"
                        />
                    </div>
                    <div key="postalCode">
                        <input
                            {...register('postalCode', {
                                required: 'This field is required',
                                minLength: 6,
                                maxLength: 6,
                            })}
                            placeholder="Postal Code"
                            className="registration-delivery"
                        />
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
