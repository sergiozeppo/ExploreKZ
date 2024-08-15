import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class Token implements TokenCache {
    private token: TokenStore;

    constructor() {
        this.token = {
            token: '',
            expirationTime: 0,
            refreshToken: '',
        };
    }

    public get(): TokenStore {
        return this.token;
    }

    public set(cache: TokenStore): void {
        this.token = cache;
    }
    public reset(): void {
        this.token = {
            token: '',
            expirationTime: 0,
            refreshToken: '',
        };
    }
}

export const token = new Token();
