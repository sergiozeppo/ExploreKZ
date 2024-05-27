import './index.css';

export default function ChangePassword() {
    return (
        <div className="conatinerChangePassword">
            <div className="windowsChangePassword">
                <form>
                    <fieldset>
                        <legend>Change Password</legend>
                        <input type="text" />
                        <button className="profile-btn" type="submit">
                            Request Password Change
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}
