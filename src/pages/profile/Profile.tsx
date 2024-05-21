import './profile.css';
import { useState, useEffect } from 'react';
import { Img } from '../../components';
import { baseClient } from '../../apiSdk/BaseClient';

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

export default function Profile() {
    const [user, setUser] = useState<ProfileApiResponse | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const result = await ProfileApi();
            if (result instanceof Error) {
                setError(result);
            } else {
                setUser(result);
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!user) {
        return <div>No user data found</div>;
    }

    return (
        <div className="container-profile">
            <div className="profile-content">
                <div className="profile-user-info profile-user-container">
                    <Img src="images/avatar.jpg" alt="Simple Avatar Image" className="user-info-avatar"></Img>
                    <span className="user-info-name">{`${user.firstName} ${user.lastName}`}</span>
                    <span className="user-info-name">{user.dateOfBirth}</span>
                </div>
                <div className="profile-user-addresses profile-user-container">
                    <fieldset className="user-addresses-container">
                        <legend>Delivery address</legend>
                        {Object.entries(user.addresses[0])
                            .filter(([key]) => key !== 'key' && key !== 'id')
                            .map(([key, value]) => {
                                return (
                                    <div className="user-addresses-row" key={key}>
                                        <div className="user-addresses-col">
                                            <span>
                                                {key == 'streetName'
                                                    ? 'Street'
                                                    : key.charAt(0).toUpperCase() + key.slice(1)}
                                            </span>
                                        </div>
                                        <span>{value}</span>
                                    </div>
                                );
                            })}
                    </fieldset>
                    <fieldset className="user-addresses-container">
                        <legend>Billing address</legend>
                        <div className="user-addresses-row">
                            <div className="user-addresses-col">
                                <span>Country:</span>
                            </div>
                            <span>KZ</span>
                        </div>
                        <div className="user-addresses-row">
                            <div className="user-addresses-col">
                                <span>City:</span>
                            </div>
                            <span>KZ</span>
                        </div>
                        <div className="user-addresses-row">
                            <div className="user-addresses-col">
                                <span>Street:</span>
                            </div>
                            <span>KZ</span>
                        </div>
                        <div className="user-addresses-row">
                            <div className="user-addresses-col">
                                <span>Postal Code:</span>
                            </div>
                            <span>KZ</span>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}
