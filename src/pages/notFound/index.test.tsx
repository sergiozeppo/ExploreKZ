import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import NotFound from '../notFound';
import './notFound.css';

describe('NotFound', () => {
    it('renders NotFound page and Link to the Main Page', () => {
        render(
            <Router>
                <NotFound />
            </Router>,
        );

        expect(screen.getByText('Page not found!')).toBeInTheDocument();
        expect(screen.getByText('404')).toBeInTheDocument();
        expect(screen.getByText("Oops! Looks like the page you're looking for does not exist.")).toBeInTheDocument();

        const homeLink = screen.getByText('Home');
        expect(homeLink).toBeInTheDocument();
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    });
});
