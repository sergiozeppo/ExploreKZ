import { FieldErrors, UseFormRegister } from 'react-hook-form';
import CustomError from '../Validation/error';
import { validate } from '../Validation';
import { UserPersonalInfo } from './typesProfile';

interface UserInfoProps extends UserPersonalInfo {
    isEditing: boolean;
    errors: FieldErrors;
    register: UseFormRegister<UserPersonalInfo>;
}

const displayName: { [key in keyof UserPersonalInfo]: string } = {
    email: 'Email:',
    firstName: 'First Name:',
    lastName: 'Last Name:',
    dateOfBirth: 'Date of Birth:',
};

const UserInfo: React.FC<UserInfoProps> = ({ isEditing, errors, register, ...props }) => {
    return (
        <div className="profile-user-cols-container">
            {(Object.keys(props) as Array<keyof UserPersonalInfo>).map((field) => (
                <div key={field} className="profile-user-col">
                    <span>{displayName[field]}</span>
                    {isEditing ? (
                        <div>
                            <input
                                {...register(field, {
                                    required: 'This field is required',
                                    validate: validate[field],
                                })}
                                defaultValue={props[field]}
                                name={field}
                                className="user-addresses-input"
                                type={field === 'dateOfBirth' ? 'date' : 'text'}
                            />
                            <CustomError message={errors[field]?.message as string} />
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
