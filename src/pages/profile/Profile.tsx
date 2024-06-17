import './profile.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import { Img } from '../../components';
import { baseClient } from '../../apiSdk/BaseClient';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UserAddresses from '../../components/Profile/userAddresses';
import UserInfo from '../../components/Profile/userInfo';
import { IUser, IErrorProfile } from '../../components/Profile/typesProfile';
import { CustomerUpdateAction } from '../../components/Profile/typesAction';
import { CustomToast } from '../../components/Toast';
import { UserPersonalInfo } from '../../components/Profile/typesProfile';
import { token } from '../../apiSdk/token';

export async function ProfileApi(): Promise<IUser | Error> {
    const myToken = token.get().token;

    const api = baseClient();
    // const api = tokenClient();
    try {
        const response = await api
            .me()
            .get({
                headers: {
                    Authorization: `Bearer ${myToken}`,
                },
            })
            .execute();
        return response.body as IUser;
    } catch (error) {
        return error as Error;
    }
}

export function Profile() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<UserPersonalInfo>({
        mode: 'onChange',
    });
    const [user, setUser] = useState<IUser | null>(null);
    const [error, setError] = useState<IErrorProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [defaultBillingAddressId, setDefaultBillingAddressId] = useState<string | undefined>('');
    const [defaultShippingAddressId, setDefaultShippingAddressId] = useState<string | undefined>('');

    const loadingRef = useRef<ReturnType<typeof toast.loading> | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await ProfileApi();
                if (result instanceof Error) {
                    setError(result);
                } else {
                    setUser(result);
                    setDefaultBillingAddressId(user?.defaultBillingAddressId);
                    setDefaultShippingAddressId(user?.defaultShippingAddressId);
                }
            } catch {
                throw new Error('Error detected');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [user?.defaultBillingAddressId, user?.defaultShippingAddressId]);

    useEffect(() => {
        if (loading) {
            loadingRef.current = toast.loading('Loading...');
        } else {
            if (loadingRef.current) {
                if (error?.status === 401) {
                    toast.update(loadingRef.current, {
                        render: 'You need to login before checking your profile',
                        type: 'error',
                        isLoading: false,
                        autoClose: 1000,
                    });
                    navigate('/login');
                } else if (error) {
                    toast.update(loadingRef.current, {
                        render: `Error: ${error.message}`,
                        type: error ? 'error' : 'success',
                        isLoading: false,
                        autoClose: 1000,
                    });
                } else {
                    toast.dismiss(loadingRef.current);
                }
            }
        }
    }, [loading, error, navigate]);

    const handleInputChangeEditing = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsEditing(!isEditing);
    };

    if (!user) {
        return;
    }

    const handleSumbitChanges: SubmitHandler<UserPersonalInfo> = (data) => {
        setIsEditing(!isEditing);

        const { firstName, lastName, dateOfBirth, email } = data;

        const updateActions: CustomerUpdateAction[] = [
            {
                action: 'setFirstName',
                firstName,
            },
            {
                action: 'setLastName',
                lastName,
            },
            {
                action: 'setDateOfBirth',
                dateOfBirth,
            },
            {
                action: 'changeEmail',
                email,
            },
        ];

        const api = baseClient();
        api.customers()
            .withId({ ID: user.id })
            .post({ body: { version: user.version, actions: updateActions } })
            .execute()
            .then((response) => {
                const responseDate = response.body as IUser;
                setUser(responseDate);
                CustomToast('success', 'Profile updated successfully');
                console.log(responseDate);
            })
            .catch((err) => {
                console.log('Change is failed', err);
                CustomToast('error', 'An error occurred, please try again later');
            });
    };

    const handleRemoveAddress = (addressId: string) => {
        const updatedAddresses = user.addresses.filter((addr) => addr.id !== addressId);
        setUser((prevUser) => {
            if (!prevUser) return prevUser;
            return {
                ...prevUser,
                addresses: updatedAddresses,
            };
        });
    };

    const handleNewAddress = () => {
        const emptyAddress = { country: 'KZ', city: '', streetName: '', postalCode: '', id: crypto.randomUUID() };

        setUser((prevUser) => {
            if (!prevUser) return prevUser;
            return {
                ...prevUser,
                addresses: [...prevUser.addresses, emptyAddress],
            };
        });
    };

    return (
        <div className="container-profile">
            <div className="profile-content">
                <form className="profile-user-info profile-user-container" onSubmit={handleSubmit(handleSumbitChanges)}>
                    <Img src="images/avatar.jpg" alt="Simple Avatar Image" className="user-info-avatar"></Img>
                    <UserInfo
                        email={user.email}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        dateOfBirth={user.dateOfBirth}
                        isEditing={isEditing}
                        errors={errors}
                        register={register}
                    />

                    {isEditing ? (
                        <>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="btn sumbit" type="submit">
                                    Submit Changes
                                </button>
                                <button className="btn" type="button" onClick={handleInputChangeEditing}>
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <button className="btn" type="button" onClick={handleInputChangeEditing}>
                                Edit Personal Info
                            </button>
                        </>
                    )}
                </form>
                <div className="profile-user-addresses profile-user-container">
                    <div className="addresses-container">
                        {user.addresses.map((_, index) => (
                            <UserAddresses
                                key={index}
                                userInfo={user}
                                address={user.addresses[index]}
                                onRemoveAddress={handleRemoveAddress}
                                setUser={setUser}
                                defaultBillingAddressId={defaultBillingAddressId}
                                defaultShippingAddressId={defaultShippingAddressId}
                                setDefaultBillingAddressId={setDefaultBillingAddressId}
                                setDefaultShippingAddressId={setDefaultShippingAddressId}
                                isNewAddress={Boolean(!user.addresses[index].city)}
                            />
                        ))}
                    </div>
                    <button className="btn" type="button" onClick={handleNewAddress}>
                        Add new address
                    </button>
                </div>
            </div>
            <button className="btn" type="button" onClick={() => navigate('/changePassword')}>
                Change Password
            </button>
        </div>
    );
}
