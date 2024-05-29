import { Switch, FormControlLabel } from '@mui/material';
import { useForm } from 'react-hook-form';
import { UserParams } from '../../apiSdk/RegistrationUser';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { validate } from '../Validation';
import CustomError from '../Validation/error';
import { IAddress } from './typesProfile';

interface UserAddresses {
    address: IAddress;
    defaultShippingAddressId: string;
    defaultBillingAddressId: string;
}

function UserAddresses({ address, defaultShippingAddressId, defaultBillingAddressId }: UserAddresses) {
    const {
        register,
        formState: { errors },
    } = useForm<UserParams>({
        mode: 'onChange',
    });
    console.log(validate, register);
    console.log(defaultBillingAddressId, address);

    return (
        <fieldset className="user-addresses-container">
            <FaEdit color="white" className="user-addresses-edit-icon" />
            <MdDelete color="white" className="user-addresses-delete-icon" />
            <legend>Address</legend>
            <div className="user-addresses-row">
                <div className="user-addresses-col">
                    <span>Country:</span>
                </div>
                <span>{address.country}</span>
                {/* <input
                    {...register('country', {
                        required: 'This field is required',
                    })}
                    className="user-addresses-input"
                /> */}
            </div>
            <CustomError message={errors.country?.message} />
            <div className="user-addresses-row">
                <div className="user-addresses-col">
                    <span>Street:</span>
                </div>
                <span>{address.streetName}</span>
                {/* <input
                    {...register('streetName', {
                        required: 'This field is required',
                        validate: validate['street'],
                    })}
                    className="user-addresses-input"
                /> */}
            </div>
            <CustomError message={errors.streetName?.message} />
            <div className="user-addresses-row">
                <div className="user-addresses-col">
                    <span>City:</span>
                </div>
                <span>{address.city}</span>
                {/* <input
                    {...register('city', {
                        required: 'This field is required',
                        validate: validate['city'],
                    })}
                    className="user-addresses-input"
                /> */}
            </div>
            <CustomError message={errors.city?.message} />
            <div className="user-addresses-row">
                <div className="user-addresses-col">
                    <span>Postal Code:</span>
                </div>
                <span>{address.postalCode}</span>
                {/* <input
                    {...register('postalCode', {
                        required: 'This field is required',
                        validate: validate['postalCode'],
                    })}
                    className="user-addresses-input"
                /> */}
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
                    disabled
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
                    disabled
                />
            </div>
        </fieldset>
    );
}

export default UserAddresses;
