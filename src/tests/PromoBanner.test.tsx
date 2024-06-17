import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { CustomToast } from '../components/Toast/index';
import { PromoBanner } from '../components/promoBanner/PromoBanner';
import '@testing-library/jest-dom';

jest.mock('../components/Toast/index', () => ({ CustomToast: jest.fn() }));
Object.assign(navigator, {
    clipboard: {
        writeText: jest.fn(),
    },
});

describe('PromoBanner component', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <BrowserRouter>
                <PromoBanner />
            </BrowserRouter>,
        );
        expect(container).toBeInTheDocument();
    });

    it(' on click copies promocode to clipboard', () => {
        const { getByTitle } = render(<PromoBanner />);
        const promoCodeSpan = getByTitle('Click to copy promo-code!');
        fireEvent.click(promoCodeSpan);
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('summer-sale');
    });

    it('shows custom toast on promocode copy', () => {
        const { getByTitle } = render(<PromoBanner />);
        const promoCodeSpan = getByTitle('Click to copy promo-code!');
        fireEvent.click(promoCodeSpan);
        expect(CustomToast).toHaveBeenCalledWith('success', 'Copied!');
    });
});
