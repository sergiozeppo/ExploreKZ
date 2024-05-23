import './profile.css';
import { useState, useEffect, useRef } from 'react';
import { Img } from '../../components';
import { baseClient } from '../../apiSdk/BaseClient';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Switch, FormControlLabel } from '@mui/material';
interface Address {
    city: string;
    country: string;
    postalCode: string;
    streetName: string;
}
interface User {
    addresses: Address[];
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    defaultShippingAddressId?: string;
    defaultBillingAddressId?: string;
}

interface ErrorProfile {
    message: string;
    name: string;
    status?: number;
}

type ProfileApiResponse = User;

async function ProfileApi(): Promise<ProfileApiResponse | Error> {
    const token = JSON.parse(localStorage.getItem('userToken') || '[]').token;

    const api = baseClient();
    try {
        const response = await api
            .me()
            .get({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .execute();
        return response.body as ProfileApiResponse;
    } catch (error) {
        return error as Error;
    }
}

function UserAddresses({
    user,
    addressIdProp,
    isEditing,
}: {
    user: ProfileApiResponse;
    addressIdProp: number;
    isEditing: boolean;
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
                disabled={true}
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
                            {isEditing ? (
                                <input type="text" defaultValue={value} className="user-addresses-input" />
                            ) : (
                                <span>{value}</span>
                            )}
                        </div>
                    );
                })}
        </fieldset>
    );
}

export default function Profile() {
    const [user, setUser] = useState<ProfileApiResponse | null>(null);
    const [error, setError] = useState<ErrorProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
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
                }
                console.log(result);
            } catch {
                throw new Error('Error detected');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

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
                    navigate('/');
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

    const handleInputChange = () => {
        setIsEditing(!isEditing);
        console.log('yes');
    };

    if (!user) {
        return;
    }

    return (
        <div className="container-profile">
            <div className="profile-content">
                <div className="profile-user-info profile-user-container">
                    <Img src="images/avatar.jpg" alt="Simple Avatar Image" className="user-info-avatar"></Img>
                    <div className="profile-user-col">
                        <span>First Name:</span>
                        <span className="user-info-name">{user.firstName}</span>
                    </div>
                    <div className="profile-user-col">
                        <span>Last Name:</span>
                        <span className="user-info-name">{user.lastName}</span>
                    </div>
                    <div className="profile-user-col">
                        <span>Date of Birth:</span>
                        <span className="user-info-name">{user.dateOfBirth}</span>
                    </div>
                </div>
                <div className="profile-user-addresses profile-user-container">
                    <UserAddresses user={user} addressIdProp={0} isEditing={isEditing} />
                    <UserAddresses user={user} addressIdProp={1} isEditing={isEditing} />
                </div>
            </div>
            <button className="profile-btn" onClick={handleInputChange}>
                Edit profile
            </button>
        </div>
    );
}
