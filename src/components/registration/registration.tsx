import './registration.css';
import { CSSProperties } from 'react';
import { useForm } from 'react-hook-form';

function Registration() {
    const { register } = useForm();

    const flexStyles = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    } as CSSProperties;

    const inputItems = {
        ...flexStyles,
        height: '26px',
        width: '100%',
    } as CSSProperties;

    const fieldsAboutUser = [
        { name: 'email', label: 'Почта' },
        { name: 'password', label: 'Имя' },
        { name: 'surname', label: 'Фамилия' },
        { name: 'date', label: 'Дата Рождения', type: 'date' },
    ];

    return (
        <form style={{ ...flexStyles, margin: '0 auto', maxWidth: '600px', gap: '5px' }}>
            <div style={{ ...flexStyles, gap: '5px' }}>
                {fieldsAboutUser.map((field) => (
                    <div key={field.name}>
                        <label>
                            {field.label}:
                            <input
                                {...register(field.name, {
                                    required: 'Поле обязательно к заполнению',
                                })}
                                style={inputItems}
                                type={field.type}
                            />
                        </label>
                    </div>
                ))}
                <fieldset>
                    <legend>Адрес доставки</legend>
                    <div className="registration-conatiner-pair">
                        <select
                            {...register('city', {
                                required: 'Поле обязательно к заполнению',
                            })}
                            style={inputItems}
                            defaultValue="Выберите страну*"
                        >
                            <option value="Выберите страну*" disabled>
                                Выберите страну*
                            </option>
                            <option value="Kazahstan">Kazahstan</option>
                        </select>
                        <label>
                            Регион
                            <input
                                {...register('region', {
                                    required: 'Поле обязательно к заполнению',
                                })}
                                style={inputItems}
                            />
                        </label>
                    </div>
                    <div className="registration-conatiner-pair">
                        <div key="city">
                            <label>
                                Город
                                <input
                                    {...register('city', {
                                        required: 'Поле обязательно к заполнению',
                                    })}
                                    style={inputItems}
                                />
                            </label>
                        </div>
                        <div key="postalCode">
                            <label>
                                Post Код
                                <input
                                    {...register('postalCode', {
                                        required: 'Поле обязательно к заполнению',
                                    })}
                                    style={inputItems}
                                />
                            </label>
                        </div>
                    </div>
                    <div key="street">
                        <label>
                            Адрес
                            <input
                                {...register('address', {
                                    required: 'Поле обязательно к заполнению',
                                })}
                                style={inputItems}
                            />
                        </label>
                    </div>
                </fieldset>
            </div>

            <button className="registration-btn-submit" type="submit">
                Отправить
            </button>
        </form>
    );
}

export default Registration;
