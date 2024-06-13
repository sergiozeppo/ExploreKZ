import { MyCartUpdateAction } from '@commercetools/platform-sdk';
import { tokenClient } from './TokenClient';
import { anonUser } from './anonimClient';

export const anonimCartCreate = async () => {
    const client = anonUser();
    const output = await client
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
            console.log(cartData);
            localStorage.setItem('user-cart', JSON.stringify(cartData));
        })
        .catch(console.error);
    return output;
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

export const cartIdIntegtarion = async (cartId: string, cartVersion: number) => {
    const client = anonUser();
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
        .execute()
        .then((res) => {
            const cartData = res.body;
            localStorage.setItem('user-cart', JSON.stringify(cartData));
        })
        .catch((err) => console.error(err));
    return output;
};

export const initCartState = async () => {
    const cartData = localStorage.getItem('user-cart');
    let parsedCartData = JSON.parse(cartData!);
    console.log('init-cart');
    if (!localStorage.getItem('isLogin')) {
        if (!cartData) {
            anonimCartCreate();
        } else {
            parsedCartData = JSON.parse(cartData!);
            cartIdIntegtarion(parsedCartData.id, parsedCartData.version);
        }
    }
};
