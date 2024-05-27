import { Switch, FormControlLabel } from '@mui/material';
import { IUser } from './typesProfile';

function UserAddresses({
    user,
    addressIdProp,
    isEditing,
    onChangeHandler,
}: {
    user: IUser;
    addressIdProp: number;
    isEditing: boolean;
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
}) {
    let addressId = addressIdProp;
    if (user.addresses.length === 1 && addressId === 1) {
        addressId = 0;
    }

    return (
        <fieldset className="user-addresses-container">
            <FormControlLabel
                control={
                    <Switch
                        defaultChecked={
                            (addressIdProp === 0 && user.defaultShippingAddressId) ||
                            (addressIdProp === 1 && user.defaultBillingAddressId)
                                ? true
                                : false
                        }
                    />
                }
                label="Default address"
                sx={{
                    '& .MuiSvgIcon-root': {
                        color: 'white',
                    },
                    color: 'white',
                }}
                disabled={isEditing ? false : true}
            />
            <legend>{addressIdProp === 0 ? 'Delivery address' : 'Billing address'}</legend>
            {Object.entries(user.addresses[addressId])
                .filter(([key]) => key !== 'key' && key !== 'id')
                .map(([key, value]) => {
                    return (
                        <div className="user-addresses-row" key={key}>
                            <div className="user-addresses-col">
                                <span>
                                    {key == 'streetName' ? 'Street:' : key.charAt(0).toUpperCase() + key.slice(1) + ':'}
                                </span>
                            </div>
                            {isEditing && value !== 'KZ' ? (
                                <input
                                    defaultValue={value}
                                    name={addressIdProp === 0 ? key : key + 'Billing'}
                                    className="user-addresses-input"
                                    onChange={onChangeHandler}
                                />
                            ) : (
                                <span>{value}</span>
                            )}
                        </div>
                    );
                })}
        </fieldset>
    );
}

export default UserAddresses;
