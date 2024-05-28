import './index.css';

export default function ChangePassword() {
    return (
        <div className="conatiner-change-password">
            <div className="window-change-password">
                <form className="form-change-password">
                    <fieldset className="fieldset--change-password">
                        <legend>Change Password</legend>
                        <input className="input-change-password" placeholder="Current Password" type="password" />
                        <input className="input-change-password" placeholder="New Password" type="password" />
                        <button className="btn change-password-btn" type="submit">
                            Change Password
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}
