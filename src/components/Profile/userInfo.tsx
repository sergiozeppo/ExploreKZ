import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { UserParams } from '../../apiSdk/RegistrationUser';
// import validate from '../Validation';

interface IUserInfo {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
}

function Error({ message }: { message: string | undefined }) {
    if (typeof message === 'string') {
        return <span className="input-notice-register">{message}</span>;
    }
}

const UserInfo: React.FC<
    IUserInfo & {
        isEditing: boolean;
        onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
        errors: FieldErrors;
        register: UseFormRegister<UserParams>;
    }
> = ({ isEditing, onChangeHandler, errors, register, ...props }) => {
    const date = Object.keys(props) as Array<keyof IUserInfo>;

    const displayName = (prop: keyof IUserInfo): string => {
        switch (prop) {
            case 'email':
                return 'Email:';
            case 'firstName':
                return 'First Name:';
            case 'lastName':
                return 'Last Name:';
            case 'dateOfBirth':
                return 'Date of Birth:';
            default:
                return '';
        }
    };

    return (
        <div className="profile-user-cols-container">
            {date.map((field) => (
                <div key={field} className="profile-user-col">
                    <span>{displayName(field)}</span>
                    {isEditing ? (
                        <>
                            <input
                                {...register(field, {
                                    required: 'This field is required',
                                })}
                                defaultValue={props[field]}
                                name={field}
                                className="user-addresses-input"
                                onChange={onChangeHandler}
                            />
                            <Error message={errors.field?.message?.toString()} />
                        </>
                    ) : (
                        <span className="user-info-name">{props[field]}</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default UserInfo;
