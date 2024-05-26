import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { UserParams } from '../../apiSdk/RegistrationUser';
import Error from '../Validation/error';
import { validateRules } from '../Validation';

interface UserInfo {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
}

interface UserInfoProps extends UserInfo {
    isEditing: boolean;
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
    errors: FieldErrors;
    register: UseFormRegister<UserParams>;
}

const displayName: { [key in keyof UserInfo]: string } = {
    email: 'Email:',
    firstName: 'First Name:',
    lastName: 'Last Name:',
    dateOfBirth: 'Date of Birth:',
};

const UserInfo: React.FC<UserInfoProps> = ({ isEditing, onChangeHandler, errors, register, ...props }) => {
    return (
        <div className="profile-user-cols-container">
            {(Object.keys(props) as Array<keyof UserInfo>).map((field) => (
                <div key={field} className="profile-user-col">
                    <span>{displayName[field]}</span>
                    {isEditing ? (
                        <div>
                            <input
                                {...register(field, {
                                    required: 'This field is required',
                                    validate: validateRules[field],
                                })}
                                defaultValue={props[field]}
                                name={field}
                                className="user-addresses-input"
                                onChange={onChangeHandler}
                            />
                            <Error message={errors[field]?.message as string} />
                        </div>
                    ) : (
                        <span className="user-info-name">{props[field]}</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default UserInfo;
