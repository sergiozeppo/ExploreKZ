import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('./apiSdk/TokenClient', () => ({
    tokenClient: jest.fn().mockImplementation(() => ({
        me: jest.fn().mockReturnThis(),
        carts: jest.fn().mockReturnThis(),
        get: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({}),
    })),
}));

jest.mock('./apiSdk/BaseClient', () => ({
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
}));

jest.mock('./apiSdk/LoginUser', () => ({
    httpMiddlewareOptions: jest.fn().mockImplementation(() => ({
        host: jest.fn().mockReturnThis(),
        fetch: jest.fn().mockReturnThis(),
    })),
}));

jest.mock('./apiSdk/anonimClient', () => ({
    anonUser: jest.fn().mockImplementation(() => ({
        customers: jest.fn().mockReturnThis(),
        get: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({}),
    })),
}));

describe('App component', () => {
    beforeEach(() => {
        render(<App />);
    });

    test('renders Login button', () => {
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('renders Sign Up button', () => {
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });

    test('renders Home link', () => {
        expect(screen.getByText('Home')).toBeInTheDocument();
    });
});
