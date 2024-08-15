import { render, screen } from '@testing-library/react';
import { Profile } from '../pages/profile/Profile';
import { BrowserRouter as Router } from 'react-router-dom';

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

describe('Profile component', () => {
    test('renders correct text on the page', () => {
        render(
            <Router>
                <Profile />
            </Router>,
        );
        const linkElement = screen.getByText('Profile');
        expect(linkElement).toBeInTheDocument();
    });
});
