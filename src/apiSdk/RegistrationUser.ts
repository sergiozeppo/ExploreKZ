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
    return new Promise((resolve, reject) => {
        baseClient()
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
            .execute()
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
