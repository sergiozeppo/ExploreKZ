import { render, screen } from '@testing-library/react';
import About from '../pages/about/About';
import '@testing-library/jest-dom';

describe('About us component', () => {
    test('renders correct text on the page', () => {
        render(<About />);
        const linkElement = screen.getByText('About Us');
        expect(linkElement).toBeInTheDocument();
    });
});
