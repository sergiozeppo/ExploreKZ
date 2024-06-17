import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

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
jest.mock('../apiSdk/LoginUser', () => ({
    httpMiddlewareOptions: jest.fn().mockImplementation(() => ({
        host: jest.fn().mockReturnThis(),
        fetch: jest.fn().mockReturnThis(),
    })),
    projectKey: jest.fn().mockReturnThis(),
    scopes: jest.fn().mockReturnThis(),
}));

describe('App component', () => {
    render(
        <Router>
            <App />
        </Router>,
    );
    test('renders Login button', () => {
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('renders Sign Up button', () => {
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });

    // test('renders Home link', () => {
    //     expect(screen.getByText('Home')).toBeInTheDocument();
    // });
});
