import './index.css';

export default function ChangePassword() {
    return (
        <div className="conatiner-change-password">
            <div className="window-change-password">
                <form className="form-change-password">
                    <fieldset className="fieldset--change-password">
                        <legend>Change Password</legend>
                        <input className="input-change-password" placeholder="Input Code" type="text" disabled />
                        <button className="profile-btn" type="submit">
                            Request Password Change
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}
