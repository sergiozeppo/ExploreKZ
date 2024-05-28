import './index.css';
import { baseClient } from '../../apiSdk/BaseClient';
import { ProfileApi } from '../profile/Profile';
import CustomError from '../../components/Validation/error';
import { CustomToast } from '../../components/Toast';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { validate } from '../../components/Validation';

interface Passwords {
    currentPassword: string;
    newPassword: string;
}

export default function ChangePassword() {
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<Passwords>({
        mode: 'onChange',
    });

    const handleSumbitChangePassword: SubmitHandler<Passwords> = (date) => {
        const userInfo = ProfileApi();
        userInfo.then((result) => {
            if (!(result instanceof Error)) {
                const api = baseClient();
                try {
                    api.customers()
                        .password()
                        .post({
                            body: {
                                id: result.id,
                                version: result.version,
                                currentPassword: date.currentPassword,
                                newPassword: date.newPassword,
                            },
                        })
                        .execute()
                        .then((response) => {
                            CustomToast('success', 'Password successfully changed');
                            navigate('/profile');
                            console.log(response);
                        })
                        .catch((error) => {
                            if (error.body) {
                                CustomToast('error', error.body.message);
                            } else {
                                CustomToast('error', 'An error occurred, please try again later');
                            }
                        });
                } catch (error) {
                    return error as Error;
                }
            }
        });
    };

    return (
        <div className="conatiner-change-password">
            <div className="window-change-password">
                <form className="form-change-password" onSubmit={handleSubmit(handleSumbitChangePassword)}>
                    <fieldset className="fieldset--change-password">
                        <legend>Change Password</legend>
                        <input
                            {...register('currentPassword', {
                                required: 'This field is required',
                                validate: validate.password,
                            })}
                            className="input-change-password"
                            placeholder="Current Password"
                            type="password"
                        />
                        <CustomError message={errors.currentPassword?.message as string} />
                        <input
                            {...register('newPassword', {
                                required: 'This field is required',
                                validate: validate.password,
                            })}
                            className="input-change-password"
                            placeholder="New Password"
                            type="password"
                        />
                        <CustomError message={errors.newPassword?.message as string} />
                        <button className="btn change-password-btn" type="submit">
                            Change Password
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}
