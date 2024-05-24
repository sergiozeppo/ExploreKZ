import { IUserInfo } from './typesProfile';

const UserInfo: React.FC<
    IUserInfo & { isEditing: boolean; onChangeHandler: React.ChangeEventHandler<HTMLInputElement> }
> = ({ isEditing, onChangeHandler, ...props }) => {
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

    console.log(isEditing);
    return (
        <div className="profile-user-cols-container">
            {date.map((prop) => (
                <div key={prop} className="profile-user-col">
                    <span>{displayName(prop)}</span>
                    {isEditing ? (
                        <input defaultValue={props[prop]} className="user-addresses-input" onChange={onChangeHandler} />
                    ) : (
                        <span className="user-info-name">{props[prop]}</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default UserInfo;
