// import { Switch, FormControlLabel } from '@mui/material';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
// import { IUser } from './typesProfile';
import { UserParams } from '../../apiSdk/RegistrationUser';

interface UserAddressesAttributes {
    errors: FieldErrors;
    register: UseFormRegister<UserParams>;
}

function UserAddresses({ errors, register }: UserAddressesAttributes) {
    console.log(errors, register);
    return (
        <fieldset className="user-addresses-container">
            <legend>Address</legend>
            <div className="user-addresses-row">
                <div className="user-addresses-col">
                    <span>Street</span>
                </div>
                <input name="dsds" className="user-addresses-input" />
            </div>
        </fieldset>
    );
}

export default UserAddresses;
