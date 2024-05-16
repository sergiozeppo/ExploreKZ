import { baseClient } from './BaseClient';

interface RegisterFnParams {
    email: string;
    password: string;
    country: string;
    city: string;
    postalCode: string;
    streetName: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    countryBilling?: string;
    cityBilling?: string;
    postalCodeBilling?: string;
    streetNameBilling?: string;
}

export async function registerFn(params: RegisterFnParams) {
    const {
        email,
        password,
        country,
        city,
        postalCode,
        streetName,
        firstName,
        lastName,
        dateOfBirth,
        countryBilling,
        cityBilling,
        postalCodeBilling,
        streetNameBilling,
    } = params;

    const addresses = [
        {
            country,
            city,
            postalCode,
            streetName,
        },
    ];

    if (countryBilling && cityBilling && postalCodeBilling && streetNameBilling) {
        addresses.push({
            country: countryBilling,
            city: cityBilling,
            postalCode: postalCodeBilling,
            streetName: streetNameBilling,
        });
    }

    const API = await baseClient()
        .customers()
        .post({
            body: {
                email,
                password,
                addresses,
                defaultShippingAddress: 0,
                defaultBillingAddress: addresses.length > 1 ? 1 : 0,
                firstName,
                lastName,
                dateOfBirth,
            },
        })
        .execute();

    return API;
}
