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

    const fieldsAboutDelivery = [
        { name: 'street', label: 'Улица' },
        { name: 'city', label: 'Город' },
        { name: 'postalCode', label: 'Post Код' },
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
                    {fieldsAboutDelivery.map((field) => (
                        <div key={field.name}>
                            <label>
                                {field.label}
                                <input
                                    {...register(field.name, {
                                        required: 'Поле обязательно к заполнению',
                                    })}
                                    style={inputItems}
                                />
                            </label>
                        </div>
                    ))}

                    <select
                        {...register('city', {
                            required: 'Поле обязательно к заполнению',
                        })}
                        style={inputItems}
                    >
                        <option value="Kazahstan">Kazahstan</option>
                    </select>
                </fieldset>
            </div>

            <button className="registration-btn-submit" type="submit">
                Отправить
            </button>
        </form>
    );
}

export default Registration;
