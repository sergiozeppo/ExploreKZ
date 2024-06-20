import { render } from '@testing-library/react';
import ChangePassword from '../pages/changePassword/index';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

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
// jest.mock('../apiSdk/LoginUser', () => ({
//     httpMiddlewareOptions: jest.fn().mockImplementation(() => ({
//         host: jest.fn().mockReturnThis(),
//         fetch: jest.fn().mockReturnThis(),
//     })),
//     projectKey: jest.fn().mockReturnThis(),
//     scopes: jest.fn().mockReturnThis(),
// }));

describe('ChangePassword component', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <BrowserRouter>
                <ChangePassword />
            </BrowserRouter>,
        );
        expect(container).toBeInTheDocument();
    });
});
