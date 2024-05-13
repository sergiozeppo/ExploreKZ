import { baseClient } from './BaseClient';

export const registerFn = (
    email: string,
    password: string,
    country: string,
    city: string,
    postalCode: string,
    streetName: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
) => {
    baseClient()
        .customers()
        .post({
            body: {
                email: email,
                password: password,
                addresses: [
                    {
                        country: country,
                        city: city,
                        postalCode: postalCode,
                        streetName: streetName,
                    },
                    {
                        country: country,
                        city: city,
                        postalCode: postalCode,
                        streetName: streetName,
                    },
                ],
                defaultShippingAddress: 0,
                defaultBillingAddress: 1,
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: dateOfBirth,
            },
        })
        .execute();
};
