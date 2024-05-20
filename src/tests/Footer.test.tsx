import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer/Footer';
import '@testing-library/jest-dom';

describe('Footer component', () => {
    test('renders correct text on the page', () => {
        render(<Footer />);
        const linkElement = screen.getByText('Created by Scientia Appetitus team in 2024');
        expect(linkElement).toBeInTheDocument();
    });
});
