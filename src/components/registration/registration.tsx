import { useState, ChangeEvent, FormEvent } from 'react';
import './registration.css';

interface FormFields {
    email: string;
    password: string;
    name: string;
    surname: string;
    date: string;
    street: string;
    city: string;
    postalcode: string;
    country: string;
    [key: string]: string;
}

function Registration() {
    const [fields, setFields] = useState<FormFields>({
        email: '',
        password: '',
        name: '',
        surname: '',
        date: '',
        street: '',
        city: '',
        postalcode: '',
        country: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
    };

    const validateFields = () => {
        const fieldsToCheck: {
            [key: string]: { regex?: RegExp; condition?: (value: string) => boolean; message: string };
        } = {
            password: {
                regex: /^(?=.*\d)(?=.*[a-zа-я])(?=.*[A-ZА-Я])[a-zA-Zа-яА-Я\d]{8,}$/,
                message:
                    'Пароль должен содержать не менее 8 символов, хотя бы одну цифру, одну строчную и одну заглавную букву',
            },
            street: {
                condition: (value: string) => value.length === 0,
                message: 'Укажите улицу.',
            },
            name: {
                regex: /^[a-zA-Zа-яА-Я]+$/u,
                message: 'Имя должно содержать только буквы.',
            },
            surname: {
                regex: /^[a-zA-Zа-яА-Я]+$/u,
                message: 'Фамилия должна содержать только буквы.',
            },
            city: {
                regex: /^[a-zA-Zа-яА-Я]+$/u,
                message: 'Город должен содержать только буквы.',
            },
            postalcode: {
                condition: (value: string) => value.length === 6,
                message: 'POST код должен содержать 6 цифр',
            },
        };
        let error = false;

        for (const field in fieldsToCheck) {
            const value = fields[field];
            const fieldToCheck = fieldsToCheck[field];

            if (fieldToCheck.regex && !fieldToCheck.regex.test(value)) {
                error = true;
            }

            if (fieldToCheck.condition && fieldToCheck.condition(value)) {
                error = true;
            }
        }

        return error;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateFields();
        if (!isValid) {
            console.log('Оправить Запрос');
        } else {
            throw new Error('Ошибка во введённых данных');
        }
    };

    const fieldInputs = [
        { name: 'email', type: 'email', placeholder: 'Почта' },
        { name: 'password', type: 'password', placeholder: 'Пароль' },
        { name: 'name', placeholder: 'Имя' },
        { name: 'surname', placeholder: 'Фамилия' },
        { name: 'date', type: 'date' },
        { name: 'street', placeholder: 'Улица' },
        { name: 'city', placeholder: 'Город' },
        { name: 'postalcode', placeholder: 'Почтовый Индекс' },
        { name: 'country', placeholder: 'Страна' },
    ];
    return (
        <form className="app-registration-form" onSubmit={handleSubmit}>
            <div className="registration-form-container">
                {fieldInputs.map((field, index) => (
                    <div key={index} className="registration-form-item">
                        <input
                            key={index}
                            className={`registration-${field.name} field`}
                            type={field.type || 'text'}
                            placeholder={field.placeholder}
                            name={field.name}
                            required
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </div>

            <button className="registration-btn-submit" type="submit">
                Отправить
            </button>
        </form>
    );
}

export default Registration;
