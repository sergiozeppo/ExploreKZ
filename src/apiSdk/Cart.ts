import { MyCartUpdateAction } from '@commercetools/platform-sdk';
import { tokenClient } from './TokenClient';
import { anonUser } from './anonimClient';
// export const anonimCartCreate = async () => {
//     const client = anonUser();
//     const output = await client
//         .carts()
//         .post({
//             body: {
//                 currency: 'USD',
//                 country: 'KZ',
//                 anonymousId: localStorage.getItem('anonId') || '',
//             },
//         })
//         .execute()
//         .then((res) => {
//             const cartData = res.body;
//             console.log(cartData);
//             localStorage.setItem('user-cart', JSON.stringify(cartData));
//         })
//         .catch(console.error);
//     return output;
// };

// export const getActualCart = async (id: string) => {
//     const currentClient = localStorage.getItem('isLogin') ? tokenClient() : anonUser();
//     let version;
//     // let actualVersion;
//     try {
//         version = await currentClient.carts().withId({ ID: id }).get().execute();
//         console.log(version);
//     } catch (err) {
//         console.log(err);
//     } finally {
//         // actualVersion = version?.version;
//         // localStorage.setItem('user-cart', JSON.stringify(version));
//         // console.log(version);
//     }
//     // return actualVersion;
//     // .then((res) => {
//     //     const cartData = res.body;
//     //     console.log(cartData);
//     //     localStorage.setItem('user-cart', JSON.stringify(cartData));
//     // })
//     // .catch(console.error);
// };

interface CartResponse {
    body: {
        id: string;
        version: number;
    };
}

export const getActualCart = async (id: string) => {
    const currentClient = localStorage.getItem('isLogin') ? tokenClient() : anonUser();
    // const currentClient = baseClient();

    try {
        const response = await currentClient.carts().withId({ ID: id }).get().execute();
        const version = response.body.version;
        localStorage.setItem('user-cart', JSON.stringify(response.body));

        return version;
    } catch (err) {
        console.error(err);
    }
};

export const anonimCartCreate = async () => {
    console.log(localStorage.getItem('anonId'));
    const client = anonUser();
    try {
        const output = await client
            .carts()
            .post({
                body: {
                    currency: 'USD',
                    country: 'KZ',
                    anonymousId: localStorage.getItem('anonId') || '',
                },
            })
            .execute();
        const cartData = output.body;
        localStorage.setItem('user-cart', JSON.stringify(cartData));
        return output;
    } catch (err) {
        console.error(err);
    }
};

export const cartAction = async (cartId: string, cartVersion: number, actions: MyCartUpdateAction[]) => {
    const userToken = localStorage.getItem('userToken');
    const client = localStorage.getItem('isLogin') && userToken ? tokenClient() : anonUser();
    const output = await client
        .me()
        .carts()
        .withId({ ID: cartId })
        .post({
            body: {
                version: cartVersion,
                actions,
            },
        })
        .execute();
    return output;
};

export const cartIdIntegtarion = async (cartId: string, cartVersion: number): Promise<CartResponse | undefined> => {
    const client = anonUser();

    try {
        const output = await client
            .carts()
            .withId({ ID: cartId })
            .post({
                body: {
                    version: cartVersion,
                    actions: [
                        {
                            action: 'setAnonymousId',
                            anonymousId: localStorage.getItem('anonId') || '',
                        },
                    ],
                },
            })
            .execute();

        const cartData = output.body;
        localStorage.setItem('user-cart', JSON.stringify(cartData));

        return output;
    } catch (err) {
        console.error(err);
    }
};

export const initCartState = async () => {
    const cartData = localStorage.getItem('user-cart');
    let parsedCartData = cartData ? JSON.parse(cartData) : null;

    if (!localStorage.getItem('isLogin')) {
        if (!cartData) {
            await anonimCartCreate();
        } else {
            parsedCartData = JSON.parse(cartData);
            await cartIdIntegtarion(parsedCartData.id, parsedCartData.version);
        }
    } else {
        tokenClient()
            .me()
            .activeCart()
            .get()
            .execute()
            .then((res) => {
                console.log(res);
                const cartDataS = res.body;
                localStorage.setItem('user-cart', JSON.stringify(cartDataS));
            })
            .catch(console.error);
    }
};
