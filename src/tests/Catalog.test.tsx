import { render, screen } from '@testing-library/react';
import Catalog from '../pages/catalog/Catalog';
import '@testing-library/jest-dom';

describe('Catalog component', () => {
    test('renders correct text on the page', () => {
        render(<Catalog />);
        const linkElement = screen.getByText('Catalog');
        expect(linkElement).toBeInTheDocument();
    });
});
