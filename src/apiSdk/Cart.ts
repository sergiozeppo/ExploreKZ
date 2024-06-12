import { MyCartUpdateAction } from '@commercetools/platform-sdk';
import { tokenClient } from './TokenClient';
import { anonUser } from './anonimClient';

export const anonimCartCreate = () => {
    const client = anonUser();
    client
        .carts()
        .post({
            body: {
                currency: 'USD',
                country: 'KZ',
                anonymousId: localStorage.getItem('anonId') || '',
            },
        })
        .execute()
        .then((res) => {
            const cartData = res.body;
            localStorage.setItem('user-cart', JSON.stringify(cartData));
        })
        .catch(console.error);
};

export const cartAction = (cartId: string, cartVersion: number, actions: MyCartUpdateAction[]) => {
    const userToken = localStorage.getItem('userToken');
    const client = localStorage.getItem('isLogin') && userToken ? tokenClient() : anonUser();
    client
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
};

export const cartIdIntegtarion = (cartId: string, cartVersion: number) => {
    const client = anonUser();
    client
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
        .execute()
        .then((res) => {
            const cartData = res.body;
            localStorage.setItem('user-cart', JSON.stringify(cartData));
        })
        .catch((err) => console.error(err));
};

export const initCartState = () => {
    const cartData = localStorage.getItem('user-cart');
    let parsedCartData = JSON.parse(cartData!);
    console.log('init-cart');
    if (!cartData) {
        anonimCartCreate();
        // cartIdIntegtarion(parsedCartData.id, parsedCartData.version);
    } else {
        parsedCartData = JSON.parse(cartData);
        cartIdIntegtarion(parsedCartData.id, parsedCartData.version);
    }
};
