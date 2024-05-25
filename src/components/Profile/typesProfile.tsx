export interface IAddress {
    city: string;
    country: string;
    postalCode: string;
    streetName: string;
    id?: string;
}
export interface IUser {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    id: string;
    version: number;
    defaultShippingAddressId?: string;
    defaultBillingAddressId?: string;
    addresses: IAddress[];
}

export interface IErrorProfile {
    message: string;
    name: string;
    status?: number;
}
