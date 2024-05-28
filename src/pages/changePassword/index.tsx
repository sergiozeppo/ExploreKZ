import './index.css';
import { useState } from 'react';
import { baseClient } from '../../apiSdk/BaseClient';
import { ProfileApi } from '../profile/Profile';

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSumbitChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userInfo = ProfileApi();
        userInfo.then((result) => {
            if (!(result instanceof Error)) {
                const api = baseClient();
                try {
                    api.customers()
                        .password()
                        .post({
                            body: {
                                id: result.id,
                                version: result.version,
                                currentPassword: currentPassword,
                                newPassword: newPassword,
                            },
                        })
                        .execute()
                        .then((response) => console.log(response))
                        .catch((error) => console.error(error));
                } catch (error) {
                    return error as Error;
                }
            }
        });
    };

    return (
        <div className="conatiner-change-password">
            <div className="window-change-password">
                <form className="form-change-password" onSubmit={handleSumbitChangePassword}>
                    <fieldset className="fieldset--change-password">
                        <legend>Change Password</legend>
                        <input
                            className="input-change-password"
                            placeholder="Current Password"
                            type="password"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <input
                            className="input-change-password"
                            placeholder="New Password"
                            type="password"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button className="btn change-password-btn" type="submit">
                            Change Password
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}
