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

    const fields = [
        { name: 'email', label: 'Почта' },
        { name: 'password', label: 'Имя' },
        { name: 'surname', label: 'Фамилия' },
    ];

    return (
        <form style={{ ...flexStyles, margin: '0 auto', maxWidth: '600px', gap: '5px' }}>
            <div style={{ ...flexStyles, gap: '5px' }}>
                {fields.map((field) => (
                    <div key={field.name}>
                        <label>
                            {field.label}:
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
            </div>

            <button className="registration-btn-submit" type="submit">
                Отправить
            </button>
        </form>
    );
}

export default Registration;
