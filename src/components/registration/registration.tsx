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

    const currentDate = new Date().toISOString().split('T')[0];

    const currentDateMinus13Years = new Date();
    currentDateMinus13Years.setFullYear(currentDateMinus13Years.getFullYear() - 13);

    const formattedDateMinus13Years = currentDateMinus13Years.toISOString().split('T')[0];

    const fieldsAboutUser: AboutUser[] = [
        { name: 'email', placeholder: 'Почта' },
        {
            name: 'password',
            placeholder: 'Пароль',
            validate: { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ },
        },
        {
            name: 'name',
            placeholder: 'Имя',
            validate: { pattern: /^[a-zA-Z]+$/ },
        },
        { name: 'surname', placeholder: 'Фамилия', validate: { pattern: /^[a-zA-Z]+$/ } },
        {
            name: 'date',
            placeholder: 'Дата Рождения',
            type: 'date',
            validate: { min: formattedDateMinus13Years, max: currentDate },
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
