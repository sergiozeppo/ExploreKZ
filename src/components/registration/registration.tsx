import { CSSProperties } from 'react';
import { useForm } from 'react-hook-form';

function Registration() {
    const { register } = useForm();

    const flexStyles = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    } as CSSProperties;

    return (
        <form style={{ ...flexStyles, margin: '0 auto', maxWidth: '600px' }}>
            <div>
                <label style={flexStyles}>
                    Имя:
                    <input
                        {...register('Имя', {
                            required: true,
                        })}
                    />
                </label>
                <select name="country">
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
