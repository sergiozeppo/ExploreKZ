import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, TokenCache, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { token } from './token';

type PasswordAuthMiddlewareOptions = {
    host: string;
    projectKey: string;
    credentials: {
        clientId: string;
        clientSecret: string;
        user: {
            username: string;
            password: string;
        };
    };
    scopes?: Array<string>;
    tokenCache?: TokenCache;
    oauthUri?: string;
    fetch?: unknown;
    refreshToken?: string;
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_API_URL,
    fetch,
};
export const loginFn = (email: string, password: string) => {
    const userStorage = localStorage.getItem('userToken');
    const refreshTokenStoraged = userStorage ? JSON.parse(userStorage).refreshToken : '';

    const cartData = localStorage.getItem('user-cart');
    const parsedCartData = JSON.parse(cartData!);
    console.log(parsedCartData);
    token.reset();
    const options: PasswordAuthMiddlewareOptions = {
        host: import.meta.env.VITE_CTP_AUTH_URL,
        projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
        credentials: {
            clientId: import.meta.env.VITE_CTP_CLIENT_ID,
            clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
            user: {
                username: email,
                password,
            },
        },
        scopes: [`manage_project:${import.meta.env.VITE_CTP_PROJECT_KEY}`],
        tokenCache: token,
        refreshToken: refreshTokenStoraged || token.get().refreshToken,
    };
    const client = new ClientBuilder().withPasswordFlow(options).withHttpMiddleware(httpMiddlewareOptions).build();
    const api = createApiBuilderFromCtpClient(client)
        .withProjectKey({
            projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
        })
        .login()
        .post({
            body: {
                email,
                password,
                updateProductData: true,
                anonymousId: localStorage.getItem('anonId') || '',
                anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
                anonymousCart: { typeId: 'cart', id: parsedCartData.id },
            },
        })
        .execute();
    return api;
};

/// вторая функция, без привязки корзины, используем после смены пароля

export const loginFnAfterChangePassword = (email: string, password: string) => {
    const userStorage = localStorage.getItem('userToken');
    const refreshTokenStoraged = userStorage ? JSON.parse(userStorage).refreshToken : '';

    const cartData = localStorage.getItem('user-cart');
    const parsedCartData = JSON.parse(cartData!);
    console.log(parsedCartData);
    token.reset();
    const options: PasswordAuthMiddlewareOptions = {
        host: import.meta.env.VITE_CTP_AUTH_URL,
        projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
        credentials: {
            clientId: import.meta.env.VITE_CTP_CLIENT_ID,
            clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
            user: {
                username: email,
                password,
            },
        },
        scopes: [`manage_project:${import.meta.env.VITE_CTP_PROJECT_KEY}`],
        tokenCache: token,
        refreshToken: refreshTokenStoraged || token.get().refreshToken,
    };
    const client = new ClientBuilder().withPasswordFlow(options).withHttpMiddleware(httpMiddlewareOptions).build();
    const api = createApiBuilderFromCtpClient(client)
        .withProjectKey({
            projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
        })
        .login()
        .post({
            body: {
                email,
                password,
            },
        })
        .execute();
    return api;
};
