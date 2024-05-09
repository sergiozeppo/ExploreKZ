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
        if (!(fields.email.length > 5)) {
            newErrors.email = 'Введите корректный email';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateFields();
        if (isValid) {
            console.log('Оправить');
        } else {
            console.log('Ошибка');
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
                    <div key={index}>
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
