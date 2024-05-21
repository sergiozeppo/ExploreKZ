import './profile.css';
import { Img } from '../../components';

export default function Profile() {
    return (
        <div className="container-profile">
            <div className="profile-content">
                <div className="profile-user-info profile-user-container">
                    <Img src="images/avatar.jpg" alt="Simple Avatar Image" className="user-info-avatar"></Img>
                    <span className="user-info-name">First Name Last Name</span>
                    <span className="user-info-name">Date of birth</span>
                </div>
                <div className="profile-user-addresses profile-user-container">
                    <fieldset className="user-addresses-container">
                        <legend>Delivery address</legend>
                        <div className="user-addresses-row">
                            <div className="user-addresses-col">
                                <span>Country:</span>
                            </div>
                            <span>KZ</span>
                        </div>
                        <div className="user-addresses-row">
                            <div className="user-addresses-col">
                                <span>City:</span>
                            </div>
                            <span>KZ</span>
                        </div>
                        <div className="user-addresses-row">
                            <div className="user-addresses-col">
                                <span>Street:</span>
                            </div>
                            <span>KZ</span>
                        </div>
                        <div className="user-addresses-row">
                            <div className="user-addresses-col">
                                <span>Postal Code:</span>
                            </div>
                            <span>KZ</span>
                        </div>
                    </fieldset>
                    <fieldset className="user-addresses-container">
                        <legend>Billing address</legend>
                        <div className="user-addresses-row">
                            <div className="user-addresses-col">
                                <span>Country:</span>
                            </div>
                            <span>KZ</span>
                        </div>
                        <div className="user-addresses-row">
                            <div className="user-addresses-col">
                                <span>City:</span>
                            </div>
                            <span>KZ</span>
                        </div>
                        <div className="user-addresses-row">
                            <div className="user-addresses-col">
                                <span>Street:</span>
                            </div>
                            <span>KZ</span>
                        </div>
                        <div className="user-addresses-row">
                            <div className="user-addresses-col">
                                <span>Postal Code:</span>
                            </div>
                            <span>KZ</span>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}
