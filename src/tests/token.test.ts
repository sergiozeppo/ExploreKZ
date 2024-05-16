import { token } from '../apiSdk/token';

describe('token component from apiSdk', () => {
    it('can create a new component with empty token', () => {
        const testToken1 = token;
        expect(testToken1.get()).toEqual({
            token: '',
            expirationTime: 0,
            refreshToken: '',
        });
    });

    it('can set and get token', () => {
        const testToken2 = token;
        const newToken = {
            token: 'new-token',
            expirationTime: 123,
            refreshToken: 'new-refresh-token',
        };
        testToken2.set(newToken);
        expect(testToken2.get()).toEqual(newToken);
    });
});
