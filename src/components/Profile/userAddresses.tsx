import { Switch, FormControlLabel } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
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
import { CustomToast } from '../Toast';
import { UpdateAction } from '@commercetools/sdk-client-v2';

interface UserAddresses {
    address: IAddress;
    userInfo: IUser;
    onRemoveAddress: (addressId: string) => void;
    setUser: React.Dispatch<IUser>;
    setDefaultBillingAddressId: React.Dispatch<string | undefined>;
    setDefaultShippingAddressId: React.Dispatch<string | undefined>;
    defaultBillingAddressId: string | undefined;
    defaultShippingAddressId: string | undefined;
    isNewAddress: boolean;
}

type ActionHandler = (body: IUser) => void;
type ErrorHandler = (error: unknown) => void;

interface ApiClient {
    customers: () => {
        withId: (params: { ID: string }) => {
            post: (params: { body: { version: number; actions: UpdateAction[] } }) => {
                execute: () => Promise<{ body: IUser }>;
            };
        };
    };
}

function UserAddresses({
    address,
    userInfo,
    onRemoveAddress,
    setUser,
    defaultBillingAddressId,
    defaultShippingAddressId,
    setDefaultShippingAddressId,
    setDefaultBillingAddressId,
    isNewAddress,
}: UserAddresses) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<UserParams>({
        mode: 'onChange',
    });

    const { version, id } = userInfo;
    const [isChange, setIsChange] = useState(address.city === '' ? true : false);
    const isDefaultBilling = defaultBillingAddressId === address.id;
    const isDefaultShipping = defaultShippingAddressId === address.id;

    const executeApiAction = async (
        api: ApiClient,
        id: string,
        version: number,
        actions: UpdateAction[],
        onSuccess: ActionHandler,
        onError: ErrorHandler,
    ) => {
        try {
            const response = await api.customers().withId({ ID: id }).post({ body: { version, actions } }).execute();
            onSuccess(response.body);
        } catch (error) {
            onError(error);
        }
    };

    const onError = () => CustomToast('error', 'An error occurred, please try again later');

    const onSuccessChangesAddress = (body: IUser) => {
        setUser(body);
        setIsChange(false);
        CustomToast('success', 'Success change address');
    };

    const handleRemoveAddress = () => {
        const api = baseClient() as ApiClient;
        const actions = [{ action: 'removeAddress', addressId: address.id }];

        const onSuccess = (body: IUser) => {
            onRemoveAddress(address.id || '');
            CustomToast('success', 'Success remove address');
            setUser(body);
        };

        executeApiAction(api, id, version, actions, onSuccess, onError);
    };

    const handleSaveChangesAddress: SubmitHandler<IAddress> = (date) => {
        const { city, country, postalCode, streetName } = date;
        const api = baseClient() as ApiClient;
        const actions = [
            {
                action: 'changeAddress',
                addressId: address.id,
                address: { city, country, postalCode, streetName },
            },
            {
                action: 'setDefaultShippingAddress',
                addressId: defaultShippingAddressId,
            },
            {
                action: 'setDefaultBillingAddress',
                addressId: defaultBillingAddressId,
            },
        ];

        executeApiAction(api, id, version, actions, onSuccessChangesAddress, onError);
    };

    const handleNewAddress: SubmitHandler<IAddress> = (date) => {
        const { city, country, postalCode, streetName } = date;
        const api = baseClient() as ApiClient;
        const actions = [
            {
                action: 'addAddress',
                address: {
                    city,
                    country,
                    postalCode,
                    streetName,
                },
            },
        ];

        executeApiAction(api, id, version, actions, onSuccessChangesAddress, onError);
    };

    const handleDefaultAddress = (action: 'shipping' | 'billing', addressId: string | undefined) => {
        if (action === 'shipping') {
            setDefaultShippingAddressId(addressId);
        } else {
            setDefaultBillingAddressId(addressId);
        }
    };

    return (
        <fieldset className="user-addresses-container">
            {isChange ? (
                <>
                    <GiConfirmed
                        color="white"
                        className="user-addresses-confirmed-icon icons"
                        onClick={
                            !isNewAddress ? handleSubmit(handleNewAddress) : handleSubmit(handleSaveChangesAddress)
                        }
                    />
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
                            validate: (text) => text === 'KZ' || 'Country must be only KZ',
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
                    control={
                        <Switch
                            checked={isDefaultShipping}
                            onChange={(e) =>
                                handleDefaultAddress('shipping', e.target.checked === true ? address.id : undefined)
                            }
                        />
                    }
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
                    disabled={isChange && isNewAddress ? false : true}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={isDefaultBilling}
                            onChange={(e) =>
                                handleDefaultAddress('billing', e.target.checked === true ? address.id : undefined)
                            }
                        />
                    }
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
                    disabled={isChange && isNewAddress ? false : true}
                />
            </div>
        </fieldset>
    );
}

export default UserAddresses;
