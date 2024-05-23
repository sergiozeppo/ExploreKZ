interface IAddress {
    city: string;
    country: string;
    postalCode: string;
    streetName: string;
}
export interface IUserAddresses {
    addresses: IAddress[];
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    defaultShippingAddressId?: string;
    defaultBillingAddressId?: string;
}

export interface IUserInfo {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
}

export interface IErrorProfile {
    message: string;
    name: string;
    status?: number;
}
