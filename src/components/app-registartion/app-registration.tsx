import './app-registration.css';

function Form() {
    const fieldInputs = [
        { name: 'email', type: 'email', placeholder: 'Почта' },
        { name: 'password', type: 'password', placeholder: 'Почта' },
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
                        required
                    />
                ))}
            </div>

            <button className="registration-btn-submit" type="submit">
                Отправить
            </button>
        </form>
    );
}

export default Form;
