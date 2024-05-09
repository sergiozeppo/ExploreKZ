import { useState, ChangeEvent } from 'react';
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
}

function Registration() {
    const [, setFields] = useState<FormFields>({
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
        <form className="app-registration-form">
            <div className="registration-form-container">
                {fieldInputs.map((field, index) => (
                    <input
                        key={index}
                        className={`registration-${field.name} field`}
                        type={field.type || 'text'}
                        placeholder={field.placeholder}
                        name={field.name}
                        required
                        onChange={handleChange}
                    />
                ))}
            </div>

            <button className="registration-btn-submit" type="submit">
                Отправить
            </button>
        </form>
    );
}

export default Registration;
