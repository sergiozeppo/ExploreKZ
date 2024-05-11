import './registration.css';
import { useForm, RegisterOptions } from 'react-hook-form';

interface AboutUser {
    name: string;
    placeholder: string;
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
        { name: 'email', placeholder: 'Почта', type: 'email' },
        {
            name: 'password',
            placeholder: 'Пароль',
            validate: { pattern: /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Zа-яА-Я\d]{8,}$/ },
        },
        {
            name: 'name',
            placeholder: 'Имя',
            validate: { pattern: /^[a-zA-Zа-яА-Я]+$/ },
        },
        { name: 'surname', placeholder: 'Фамилия', validate: { pattern: /^[a-zA-Zа-яА-Я]+$/ } },
        {
            name: 'date',
            placeholder: 'Дата Рождения',
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
                            required: 'Поле обязательно к заполнению',
                            ...field.validate,
                        })}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="registration-about-user"
                    />
                </div>
            ))}
            <fieldset className="registration-wrapper-delivery">
                <legend>Адрес доставки</legend>
                <div className="registration-conatiner-pair">
                    <select
                        {...register('country', {
                            required: 'Поле обязательно к заполнению',
                        })}
                        className="registration-delivery"
                    >
                        <option value="Выберите страну*" disabled selected>
                            Выберите страну*
                        </option>
                        <option value="Kazahstan">Kazahstan</option>
                    </select>
                    <input
                        {...register('street', {
                            required: 'Поле обязательно к заполнению',
                            minLength: 1,
                        })}
                        placeholder="Улица"
                        className="registration-delivery"
                    />
                </div>
                <div className="registration-conatiner-pair">
                    <div key="city">
                        <input
                            {...register('city', {
                                required: 'Поле обязательно к заполнению',
                                pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                                minLength: 1,
                            })}
                            placeholder="Город"
                            className="registration-delivery"
                        />
                    </div>
                    <div key="postalCode">
                        <input
                            {...register('postalCode', {
                                required: 'Поле обязательно к заполнению',
                                minLength: 6,
                                maxLength: 6,
                            })}
                            placeholder="Post Код"
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
