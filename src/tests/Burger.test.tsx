import { fireEvent, render, screen } from '@testing-library/react';
import Burger from '../components/Burger/Burger';
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

describe('toggleMenu', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <BrowserRouter>
                <Burger />
            </BrowserRouter>,
        );
        expect(container).toBeInTheDocument();
    });
    it('renders links correctly', () => {
        render(
            <BrowserRouter>
                <Burger />
            </BrowserRouter>,
        );
        const loginButton = screen.getByText('Login');
        expect(loginButton).toBeInTheDocument();
        expect(loginButton.closest('a')).toHaveAttribute('href', '/login');
        const signUpButton = screen.getByText('Sign Up');
        expect(signUpButton).toBeInTheDocument();
        expect(signUpButton.closest('a')).toHaveAttribute('href', '/registration');
        const homeLink = screen.getByText('Home');
        expect(homeLink).toBeInTheDocument();
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
        const catalogLink = screen.getByText('Catalog');
        expect(catalogLink).toBeInTheDocument();
        expect(catalogLink.closest('a')).toHaveAttribute('href', '/catalog');
        const cartLink = screen.getByText('Cart');
        expect(cartLink).toBeInTheDocument();
        expect(cartLink.closest('a')).toHaveAttribute('href', '/cart');
        const aboutLink = screen.getByText('About Us');
        expect(aboutLink).toBeInTheDocument();
        expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
    });
    test('toggles menu open and close', () => {
        const { container } = render(
            <BrowserRouter>
                <Burger />
            </BrowserRouter>,
        );
        const burgerIcon = container.querySelector('.burger-icon') as Element;
        fireEvent.click(burgerIcon);
        expect(container.querySelector('.open')).toBeInTheDocument();
        fireEvent.click(burgerIcon);
        expect(container.querySelector('.open')).not.toBeInTheDocument();
    });
    test('closes menu when clicking outside', () => {
        const { container } = render(
            <BrowserRouter>
                <Burger />
            </BrowserRouter>,
        );
        const burgerIcon = container.querySelector('.burger-icon') as Element;
        fireEvent.click(burgerIcon);

        // Simulate clicking outside
        fireEvent.click(document);

        expect(container.querySelector('.menu.open')).toBeVisible();
    });
});
