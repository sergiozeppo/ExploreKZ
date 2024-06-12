// import { ClientBuilder, TokenCache, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
// import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
// import fetch from 'node-fetch';

// const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

// const httpMiddlewareOptions: HttpMiddlewareOptions = {
//     host: import.meta.env.VITE_CTP_API_URL,
//     fetch,
// };

// type AnonymousAuthMiddlewareOptions = {
//     host: string;
//     projectKey: string;
//     credentials: {
//         clientId: string;
//         clientSecret: string;
//         anonymousId?: string;
//     };
//     scopes?: Array<string>;
//     oauthUri?: string;
//     fetch?: unknown;
//     tokenCache?: TokenCache;
// };

// const options: AnonymousAuthMiddlewareOptions = {
//     host: import.meta.env.VITE_CTP_AUTH_URL,
//     projectKey,
//     credentials: {
//         clientId: import.meta.env.VITE_CTP_CLIENT_ID,
//         clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
//         // anonymousId: crypto.randomUUID(),
//     },
//     // scopes: [`manage_project:${projectKey}`],
//     fetch,
// };

// const anonimUser = () => {
//     return new ClientBuilder().withAnonymousSessionFlow(options).withHttpMiddleware(httpMiddlewareOptions).build();
// };

// export const anonUser = () => {
//     return createApiBuilderFromCtpClient(anonimUser()).withProjectKey({ projectKey });
// };

//
import { ClientBuilder, TokenCache, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import fetch from 'node-fetch';
import { token } from './token';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_API_URL,
    fetch,
};

type AnonymousAuthMiddlewareOptions = {
    host: string;
    projectKey: string;
    credentials: {
        clientId: string;
        clientSecret: string;
        anonymousId?: string;
    };
    scopes?: Array<string>;
    oauthUri?: string;
    fetch?: unknown;
    tokenCache?: TokenCache;
};

const anonID = crypto.randomUUID();
const anonimUser = () => {
    localStorage.setItem('anonId', anonID);
    const options: AnonymousAuthMiddlewareOptions = {
        host: import.meta.env.VITE_CTP_AUTH_URL,
        projectKey,
        credentials: {
            clientId: import.meta.env.VITE_CTP_CLIENT_ID,
            clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
            anonymousId: anonID,
        },
        scopes: [`manage_project:${projectKey}`],
        fetch,
        tokenCache: token,
    };

    return new ClientBuilder().withAnonymousSessionFlow(options).withHttpMiddleware(httpMiddlewareOptions).build();
};
export const anonUser = () => {
    // const anonData = JSON.parse(localStorage.getItem('user-cart') || '');
    // console.log(anonData);
    return createApiBuilderFromCtpClient(anonimUser()).withProjectKey({ projectKey });
};
