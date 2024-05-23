import { IUserInfo } from './typesProfile';

const UserInfo: React.FC<IUserInfo> = (props) => {
    const date = Object.keys(props) as Array<keyof IUserInfo>;

    console.log(date);
    return (
        <div className="profile-user-cols-container">
            {date.map((prop) => (
                <div className="profile-user-col">
                    <span>{prop}</span>
                    <span className="user-info-name">{props[prop]}</span>
                </div>
            ))}
        </div>
    );
};

export default UserInfo;
