import { IUserInfo } from './typesProfile';

const UserInfo: React.FC<IUserInfo & { isEditing: boolean }> = ({ isEditing, ...props }) => {
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
                    <span className="user-info-name">{props[prop]}</span>
                </div>
            ))}
        </div>
    );
};

export default UserInfo;
