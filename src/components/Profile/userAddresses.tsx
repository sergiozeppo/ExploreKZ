import { Switch, FormControlLabel } from '@mui/material';
import { useForm } from 'react-hook-form';
import { UserParams } from '../../apiSdk/RegistrationUser';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { validate } from '../Validation';
import { IAddress } from './typesProfile';
import { IUser } from './typesProfile';
import { useState } from 'react';
import { GiConfirmed } from 'react-icons/gi';
import { MdCancel } from 'react-icons/md';
import { baseClient } from '../../apiSdk/BaseClient';
import CustomError from '../Validation/error';

interface UserAddresses {
    address: IAddress;
    userInfo: IUser;
    onRemoveAddress: (addressId: string) => void;
}

function UserAddresses({ address, userInfo }: UserAddresses) {
    const {
        register,
        formState: { errors },
    } = useForm<UserParams>({
        mode: 'onChange',
    });
    const [isChange, setIsChange] = useState(false);

    const { id, version, defaultBillingAddressId, defaultShippingAddressId } = userInfo;

    const handleRemoveAddress = () => {
        const api = baseClient();
        try {
            api.customers()
                .withId({ ID: id })
                .post({ body: { version, actions: [{ action: 'removeAddress', addressId: address.id }] } })
                .execute()
                .then(() => handleRemoveAddress())
                .catch();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <fieldset className="user-addresses-container">
            {isChange ? (
                <>
                    <GiConfirmed color="white" className="user-addresses-confirmed-icon icons" />
                    <MdCancel
                        color="white"
                        className="user-addresses-cancel-icon icons"
                        onClick={() => setIsChange(false)}
                    />
                </>
            ) : (
                <FaEdit color="white" className="user-addresses-edit-icon icons" onClick={() => setIsChange(true)} />
            )}
            <MdDelete color="white" className="user-addresses-delete-icon icons" onClick={handleRemoveAddress} />
            <legend>Address</legend>
            <div className="user-addresses-row">
                <div className="user-addresses-col">
                    <span>Country:</span>
                </div>
                {isChange ? (
                    <input
                        {...register('country', {
                            required: 'This field is required',
                        })}
                        className="user-addresses-input"
                        defaultValue={address.country}
                    />
                ) : (
                    <span>{address.country}</span>
                )}
            </div>
            <CustomError message={errors.country?.message} />
            <div className="user-addresses-row">
                <div className="user-addresses-col">
                    <span>Street:</span>
                </div>
                {isChange ? (
                    <input
                        {...register('streetName', {
                            required: 'This field is required',
                            validate: validate['street'],
                        })}
                        className="user-addresses-input"
                        defaultValue={address.streetName}
                    />
                ) : (
                    <span>{address.streetName}</span>
                )}
            </div>
            <CustomError message={errors.streetName?.message} />
            <div className="user-addresses-row">
                <div className="user-addresses-col">
                    <span>City:</span>
                </div>
                {isChange ? (
                    <input
                        {...register('city', {
                            required: 'This field is required',
                            validate: validate['city'],
                        })}
                        className="user-addresses-input"
                        defaultValue={address.city}
                    />
                ) : (
                    <span>{address.city}</span>
                )}
            </div>
            <CustomError message={errors.city?.message} />
            <div className="user-addresses-row">
                <div className="user-addresses-col">
                    <span>Postal Code:</span>
                </div>
                {isChange ? (
                    <input
                        {...register('postalCode', {
                            required: 'This field is required',
                            validate: validate['postalCode'],
                        })}
                        className="user-addresses-input"
                        defaultValue={address.postalCode}
                    />
                ) : (
                    <span>{address.postalCode}</span>
                )}
            </div>
            <CustomError message={errors.postalCode?.message} />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
                <FormControlLabel
                    control={<Switch defaultChecked={defaultShippingAddressId === address.id ? true : false} />}
                    label="Set as default shipping"
                    sx={{
                        '& .MuiSvgIcon-root': {
                            color: 'white',
                        },
                        '.Mui-disabled': {
                            color: 'white',
                        },
                        color: 'white',
                    }}
                    disabled={isChange ? false : true}
                />
                <FormControlLabel
                    control={<Switch defaultChecked={defaultBillingAddressId === address.id ? true : false} />}
                    label="Set as default billing"
                    sx={{
                        '& .MuiSvgIcon-root': {
                            color: 'white',
                        },
                        '.Mui-disabled': {
                            color: 'white',
                        },
                        color: 'white',
                    }}
                    disabled={isChange ? false : true}
                />
            </div>
        </fieldset>
    );
}

export default UserAddresses;
