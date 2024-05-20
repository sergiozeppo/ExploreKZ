import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, HttpMiddlewareOptions, TokenCache } from '@commercetools/sdk-client-v2';

type RefreshAuthMiddlewareOptions = {
    host: string;
    projectKey: string;
    credentials: {
        clientId: string;
        clientSecret: string;
    };
    refreshToken: string;
    tokenCache?: TokenCache;
    oauthUri?: string;
    fetch?: unknown;
};

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
let refreshUserToken: string | null = null;
const userToken = localStorage.getItem('userToken');
let parsedTokenCache;

if (userToken) {
    parsedTokenCache = JSON.parse(userToken);
    refreshUserToken = parsedTokenCache.refreshToken;
}

const options: RefreshAuthMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
        clientId: import.meta.env.VITE_CTP_CLIENT_ID,
        clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
    },
    refreshToken: refreshUserToken || '',
    fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_API_URL,
    fetch,
};

const client = new ClientBuilder().withRefreshTokenFlow(options).withHttpMiddleware(httpMiddlewareOptions).build();

export const tokenClient = () => {
    return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};
