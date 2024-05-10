import './registration.css';
import { useForm } from 'react-hook-form';

function Registration() {
    const { register } = useForm();

    const fieldsAboutUser = [
        { name: 'email', placeholder: 'Почта' },
        { name: 'password', placeholder: 'Имя' },
        { name: 'surname', placeholder: 'Фамилия' },
        { name: 'date', placeholder: 'Дата Рождения', type: 'date' },
    ];

    return (
        <form className="registration-wrapper flex-style">
            {fieldsAboutUser.map((field) => (
                <div key={field.name} className="registration-container">
                    <input
                        {...register(field.name, {
                            required: 'Поле обязательно к заполнению',
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
                        {...register('region', {
                            required: 'Поле обязательно к заполнению',
                        })}
                        placeholder="Регион"
                        className="registration-delivery"
                    />
                </div>
                <div className="registration-conatiner-pair">
                    <div key="city">
                        <input
                            {...register('city', {
                                required: 'Поле обязательно к заполнению',
                            })}
                            placeholder="Город"
                            className="registration-delivery"
                        />
                    </div>
                    <div key="postalCode">
                        <input
                            {...register('postalCode', {
                                required: 'Поле обязательно к заполнению',
                            })}
                            placeholder="Post Код"
                            className="registration-delivery"
                        />
                    </div>
                </div>
                <div key="street">
                    <input
                        {...register('address', {
                            required: 'Поле обязательно к заполнению',
                        })}
                        placeholder="Адрес"
                        className="registration-delivery"
                    />
                </div>
            </fieldset>

            <button className="registration-btn-submit" type="submit">
                Отправить
            </button>
        </form>
    );
}

export default Registration;
