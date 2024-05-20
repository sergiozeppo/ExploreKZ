import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import Home from '../pages/home';

describe('Test Home component', () => {
    it('renders Img component and titles', () => {
        render(
            <Router>
                <Home />
            </Router>,
        );

        expect(screen.getByText('It Matters Who You Travel With')).toBeInTheDocument();
        expect(
            screen.getByText('We want you to feel confident in the travel experience you will have with us.'),
        ).toBeInTheDocument();

        const imgElement = screen.getByAltText('gradient');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', 'images/img_rectangle.png');
    });
    test('renders all sprint2 links correctly', () => {
        render(
            <Router>
                <Home />
            </Router>,
        );

        const loginLink = screen.getByText('login');
        expect(loginLink).toBeInTheDocument();
        expect(loginLink.closest('a')).toHaveAttribute('href', '/login');

        const signUpLink = screen.getByText('register');
        expect(signUpLink).toBeInTheDocument();
        expect(signUpLink.closest('a')).toHaveAttribute('href', '/registration');

        const profileLink = screen.getByText('profile');
        expect(profileLink).toBeInTheDocument();
        expect(profileLink.closest('a')).toHaveAttribute('href', '/profile');

        const catalogLink = screen.getByText('catalog');
        expect(catalogLink).toBeInTheDocument();
        expect(catalogLink.closest('a')).toHaveAttribute('href', '/catalog');

        const cartLink = screen.getByText('cart');
        expect(cartLink).toBeInTheDocument();
        expect(cartLink.closest('a')).toHaveAttribute('href', '/cart');

        const aboutUsLink = screen.getByText('about us');
        expect(aboutUsLink).toBeInTheDocument();
        expect(aboutUsLink.closest('a')).toHaveAttribute('href', '/about');
    });
});
