import './profile.css';
import { Img } from '../../components';

export default function Profile() {
    return (
        <div className="container-profile">
            <div className="profile-content">
                <div className="profile-user-info">
                    <Img src="images/avatar.jpg" alt="Simple Avatar Image" className="user-info-avatar"></Img>
                    <span className="user-info-name">First Name Last Name</span>
                    <span className="user-info-name">Date of birth</span>
                </div>
                <div className="profile-user-addresses"></div>
            </div>
        </div>
    );
}
