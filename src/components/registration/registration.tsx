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

    const [errors, setErrors] = useState<Partial<FormFields>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: undefined,
        }));
    };

    const validateFields = () => {
        const newErrors: Partial<FormFields> = {};

        if (!(fields.password.length >= 8)) {
            newErrors.password = 'Длинна пароля должна быть не менее 8 символов';
        }

        if (!/\d/.test(fields.password)) {
            newErrors.password = 'Должен содержать минимум одну цифру';
        }

        if (!/[a-zа-я]/.test(fields.password)) {
            newErrors.password = 'Должен содержать минимум одну строчную букву';
        }

        if (!/[A-ZА-Я]/.test(fields.password)) {
            newErrors.password = 'Должен содержать минимум одну заглавную букву';
        }

        if (fields.street.length === 0) {
            newErrors.street = 'Должно содержать хотя бы один символ';
        }

        const noSpecSymbolsAndNumbersRegex = /^[a-zA-Zа-яА-Я]+$/u;
        const requiredFields = ['name', 'surname', 'city'];
        requiredFields.forEach((field) => {
            if (!noSpecSymbolsAndNumbersRegex.test(fields[field])) {
                newErrors[field] = 'Должно содержать хотя бы один символ и не содержать специальных символов или цифр';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateFields();
        if (isValid) {
            console.log('Оправить');
        }
    };

    const fieldInputs = [
        { name: 'email', type: 'email', placeholder: 'Почта', error: errors.email },
        { name: 'password', type: 'password', placeholder: 'Пароль', error: errors.password },
        { name: 'name', placeholder: 'Имя', error: errors.name },
        { name: 'surname', placeholder: 'Фамилия', error: errors.surname },
        { name: 'date', type: 'date', error: errors.date },
        { name: 'street', placeholder: 'Улица', error: errors.street },
        { name: 'city', placeholder: 'Город', error: errors.city },
        { name: 'postalcode', placeholder: 'Почтовый Индекс', error: errors.postalcode },
        { name: 'country', placeholder: 'Страна', error: errors.country },
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
                        {field.error && <span className="registration-error">{field.error}</span>}
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
