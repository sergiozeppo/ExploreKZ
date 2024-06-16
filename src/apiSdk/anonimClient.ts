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

export const initAnonId = async () => {
    const anonID = crypto.randomUUID();
    localStorage.setItem('anonId', anonID);
};

const anonimUser = () => {
    const options: AnonymousAuthMiddlewareOptions = {
        host: import.meta.env.VITE_CTP_AUTH_URL,
        projectKey,
        credentials: {
            clientId: import.meta.env.VITE_CTP_CLIENT_ID,
            clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
            anonymousId: localStorage.getItem('anonId') || '',
        },
        scopes: [`manage_project:${projectKey}`],
        fetch,
        tokenCache: token,
    };

    return new ClientBuilder().withAnonymousSessionFlow(options).withHttpMiddleware(httpMiddlewareOptions).build();
};
export const anonUser = () => {
    return createApiBuilderFromCtpClient(anonimUser()).withProjectKey({ projectKey });
};
