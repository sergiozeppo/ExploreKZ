import { render, screen } from '@testing-library/react';
import Cart from '../pages/cart/Cart';
import '@testing-library/jest-dom';

describe('Cart component', () => {
    test('renders correct text on the page', () => {
        render(<Cart />);
        const linkElement = screen.getByText('Cart');
        expect(linkElement).toBeInTheDocument();
    });
});
