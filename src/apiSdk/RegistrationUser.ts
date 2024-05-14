import { baseClient } from './BaseClient';

export async function registerFn(
    email: string,
    password: string,
    country: string,
    city: string,
    postalCode: string,
    streetName: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
) {
    const API = await baseClient()
        .customers()
        .post({
            body: {
                email,
                password,
                addresses: [
                    {
                        country,
                        city,
                        postalCode,
                        streetName,
                    },
                    {
                        country,
                        city,
                        postalCode,
                        streetName,
                    },
                ],
                defaultShippingAddress: 0,
                defaultBillingAddress: 1,
                firstName,
                lastName,
                dateOfBirth,
            },
        })
        .execute();

    return API;
}
