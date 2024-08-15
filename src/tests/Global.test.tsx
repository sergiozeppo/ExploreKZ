import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlobalProvider, GlobalContext } from '../context/Global';

jest.mock('../apiSdk/BaseClient', () => ({
    authMiddlewareOptions: jest.fn().mockImplementation(() => ({
        projectKey: jest.fn().mockReturnThis(),
        host: jest.fn().mockReturnThis(),
        credentials: {
            clientId: jest.fn().mockReturnThis(),
            clientSecret: jest.fn().mockReturnThis(),
        },
        scopes: jest.fn().mockReturnThis(),
        fetch: jest.fn().mockReturnThis(),
    })),
    projectKey: jest.fn().mockReturnThis(),
    scopes: jest.fn().mockReturnThis(),
}));
jest.mock('../apiSdk/TokenClient', () => ({
    projectKey: jest.fn().mockReturnThis(),
    scopes: jest.fn().mockReturnThis(),
}));
jest.mock('../apiSdk/anonimClient', () => ({
    projectKey: jest.fn().mockReturnThis(),
    scopes: jest.fn().mockReturnThis(),
}));

describe('GlobalProvider component', () => {
    it('should render children', () => {
        const { getByText } = render(
            <GlobalProvider>
                <div>Test child</div>
            </GlobalProvider>,
        );
        expect(getByText('Test child')).toBeInTheDocument();
    });

    it('should set isLogin to true if localStorage contains "isLogin"', () => {
        localStorage.setItem('isLogin', 'true');
        let testIsLogin;
        render(
            <GlobalProvider>
                <GlobalContext.Consumer>
                    {({ isLogin }) => {
                        testIsLogin = isLogin;
                        return null;
                    }}
                </GlobalContext.Consumer>
            </GlobalProvider>,
        );
        expect(testIsLogin).toBe(true);
    });

    it('should set isLogin to false if localStorage does not contain "isLogin"', () => {
        localStorage.removeItem('isLogin');
        let testIsLogin;
        render(
            <GlobalProvider>
                <GlobalContext.Consumer>
                    {({ isLogin }) => {
                        testIsLogin = isLogin;
                        return null;
                    }}
                </GlobalContext.Consumer>
            </GlobalProvider>,
        );
        expect(testIsLogin).toBe(false);
    });
});
