import { render, screen } from '@testing-library/react';
import { Card } from '../components/ProductCard/Card';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Card', () => {
    it('renders correctly', () => {
        const product = {
            id: '1',
            name: 'Testname',
            description: 'Test description',
            images: '/test-image.jpg',
            price: 100,
            discount: 80,
        };

        render(
            <BrowserRouter>
                <Card {...product} />
            </BrowserRouter>,
        );

        const text1 = screen.getByText('Testname');
        const text2 = screen.getByText('Test description');
        const text3 = screen.getByAltText('discount');
        const text4 = screen.getByText('100');
        const text5 = screen.getByText('80');
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
        expect(text3).toHaveAttribute('src', '/images/icons8-discount-48.png');
        expect(text4).toBeInTheDocument();
        expect(text5).toBeInTheDocument();
    });
});
