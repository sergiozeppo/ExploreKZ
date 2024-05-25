import './profile.css';
import { useState, useEffect, useRef } from 'react';
import { Img } from '../../components';
import { baseClient } from '../../apiSdk/BaseClient';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UserAddresses from '../../components/Profile/userAddresses';
import UserInfo from '../../components/Profile/userInfo';
import { IUserAddresses, IErrorProfile } from '../../components/Profile/typesProfile';
import { CustomerUpdateAction } from '../../components/Profile/typesAction';
import { CustomToast } from '../../components/Toast';
async function ProfileApi(): Promise<IUserAddresses | Error> {
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
        return response.body as IUserAddresses;
    } catch (error) {
        return error as Error;
    }
}

export default function Profile() {
    const [user, setUser] = useState<IUserAddresses | null>(null);
    const [error, setError] = useState<IErrorProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formDate, setFormDate] = useState({
        email: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        streetName: '',
        streetNameBilling: '',
        postalCode: '',
        postalCodeBilling: '',
        city: '',
        cityBilling: '',
        defaultShipping: false,
        defaultBilling: false,
    });
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
                    setFormDate({
                        email: result.email,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        dateOfBirth: result.dateOfBirth,
                        streetName: result.addresses[0]?.streetName || '',
                        streetNameBilling:
                            result.addresses.length === 1
                                ? result.addresses[0]?.streetName
                                : result.addresses[1]?.streetName,
                        postalCode: result.addresses[0]?.postalCode || '',
                        postalCodeBilling:
                            result.addresses.length === 1
                                ? result.addresses[0]?.postalCode
                                : result.addresses[1]?.postalCode,
                        city: result.addresses[0]?.city || '',
                        cityBilling:
                            result.addresses.length === 1 ? result.addresses[0]?.city : result.addresses[1]?.city,
                        defaultShipping: result.defaultShippingAddressId ? true : false,
                        defaultBilling: result.defaultBillingAddressId ? true : false,
                    });
                }
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

    const handleInputChangeEditing = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsEditing(!isEditing);
    };

    const handleInputChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormDate({
            ...formDate,
            [name]: value,
        });
        console.log(formDate);
    };

    const handleSumbitDate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsEditing(!isEditing);
        if (!user?.id && !user?.version) {
            return;
        }

        const {
            firstName,
            lastName,
            dateOfBirth,
            city,
            postalCode,
            streetName,
            cityBilling,
            postalCodeBilling,
            streetNameBilling,
        } = formDate;

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
                action: 'changeAddress',
                addressId: user.addresses[0]?.id || '',
                address: {
                    city,
                    country: 'KZ',
                    postalCode,
                    streetName,
                },
            },
            {
                action: 'changeAddress',
                addressId: user.addresses[1]?.id || user.addresses[0]?.id || '',
                address: {
                    city: cityBilling,
                    country: 'KZ',
                    postalCode: postalCodeBilling,
                    streetName: streetNameBilling,
                },
            },
            {
                action: 'setDefaultShippingAddress',
                addressId: user.addresses[0]?.id || '',
            },
            {
                action: 'setDefaultBillingAddress',
                addressId: user.addresses[1]?.id || user.addresses[0]?.id || '',
            },
        ];

        const api = baseClient();
        api.customers()
            .withId({ ID: user?.id })
            .post({ body: { version: user.version, actions: updateActions } })
            .execute()
            .then((response) => {
                const responseDate = response.body as IUserAddresses;
                setUser(responseDate);
                CustomToast('success', 'Profile updated successfully');
            })
            .catch((err) => {
                console.log('Change is failed', err);
                CustomToast('error', 'An error occurred, please try again later');
            });
    };

    if (!user) {
        return;
    }

    return (
        <form className="container-profile" onSubmit={handleSumbitDate}>
            <div className="profile-content">
                <div className="profile-user-info profile-user-container">
                    <Img src="images/avatar.jpg" alt="Simple Avatar Image" className="user-info-avatar"></Img>
                    <UserInfo
                        email={user.email}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        dateOfBirth={user.dateOfBirth}
                        isEditing={isEditing}
                        onChangeHandler={handleInputChangeDate}
                    />
                </div>
                <div className="profile-user-addresses profile-user-container">
                    <UserAddresses
                        user={user}
                        addressIdProp={0}
                        isEditing={isEditing}
                        onChangeHandler={handleInputChangeDate}
                    />
                    <UserAddresses
                        user={user}
                        addressIdProp={1}
                        isEditing={isEditing}
                        onChangeHandler={handleInputChangeDate}
                    />
                </div>
            </div>
            {isEditing ? (
                <button className="profile-btn sumbit" type="submit">
                    Submit Changes
                </button>
            ) : (
                <button className="profile-btn" type="button" onClick={handleInputChangeEditing}>
                    Edit profile
                </button>
            )}
        </form>
    );
}
