import {
    ClientBuilder,
    TokenCache,
    type AuthMiddlewareOptions,
    type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import fetch from 'node-fetch';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const scopes = import.meta.env.VITE_CTP_SCOPES.split(' ');

const authMiddlewareOptions: AuthMiddlewareOptions = {
    projectKey,
    host: import.meta.env.VITE_CTP_AUTH_URL,
    credentials: {
        clientId: import.meta.env.VITE_CTP_CLIENT_ID,
        clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
    },
    scopes,
    fetch,
};

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

const options: AnonymousAuthMiddlewareOptions = {
    // host: import.meta.env.VITE_CTP_AUTH_URL,
    host: 'test-project-key',
    projectKey,
    credentials: {
        clientId: import.meta.env.VITE_CTP_CLIENT_ID,
        clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
        anonymousId: crypto.randomUUID(),
    },
    scopes: [`manage_project:${projectKey}`],
    fetch,
};

const anonimUser = () => {
    return new ClientBuilder().withAnonymousSessionFlow(options).withHttpMiddleware(httpMiddlewareOptions).build();
};

const authUser = () => {
    return new ClientBuilder()
        .withClientCredentialsFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();
};

export const clientBuilder = (type: string) => {
    let apiRoot;
    if (type === 'anon') {
        apiRoot = anonimUser();
    }
    if (type === 'auth') {
        apiRoot = authUser();
    }
    return createApiBuilderFromCtpClient(apiRoot).withProjectKey({ projectKey });
};
