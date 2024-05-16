import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../components/Header';

describe('Testing Header component', () => {
    it('renders logo and navigation links and buttons', () => {
        render(
            <Router>
                <Header />
            </Router>,
        );

        const logo = screen.getByAltText('header logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', '/images/header_logo.svg');
        expect(logo.closest('a')).toHaveAttribute('href', '/');

        const homeLink = screen.getByText('Home');
        expect(homeLink).toBeInTheDocument();
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');

        const loginButton = screen.getByText('Login');
        expect(loginButton).toBeInTheDocument();
        expect(loginButton.closest('a')).toHaveAttribute('href', '/login');

        const signUpButton = screen.getByText('Sign Up');
        expect(signUpButton).toBeInTheDocument();
        expect(signUpButton.closest('a')).toHaveAttribute('href', '/registration');
    });
});
