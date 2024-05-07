import './app-registration.css';

const RegistrationLayout = () => {
    return (
        <form className="app-registration-form">
            <div className="registration-form-container">
                <div className="registration-client-info">
                    <input className="registration-email field" type="email" placeholder="Почта" required />
                    <input className="registration-email field" type="password" placeholder="Пароль" required />
                    <input className="registration-name field" placeholder="Имя" required />
                    <input className="registration-surname field" placeholder="Фамилия" required />
                    <input className="registration-birthday field" type="date" placeholder="Дата рождения" required />
                </div>

                <div className="registration-address-fields">
                    <input className="registration-street field" placeholder="Улица" required />
                    <input className="registration-city field" placeholder="Город" required />
                    <input className="registration-postalcode field" placeholder="Почтовый Индекс" required />
                    <input className="registration-country field" placeholder="Страна" required />
                </div>
            </div>

            <button className="registration-btn-submit" type="submit">
                Отправить
            </button>
        </form>
    );
};

export default RegistrationLayout;
