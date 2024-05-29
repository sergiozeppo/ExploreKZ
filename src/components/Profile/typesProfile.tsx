export interface UserPersonalInfo {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
}

export interface IUser extends UserPersonalInfo {
    id: string;
    version: number;
    defaultShippingAddressId?: string;
    defaultBillingAddressId?: string;
    addresses: IAddress[];
}
export interface IAddress {
    city: string;
    country: string;
    postalCode: string;
    streetName: string;
    id?: string;
}

export interface IErrorProfile {
    message: string;
    name: string;
    status?: number;
}
