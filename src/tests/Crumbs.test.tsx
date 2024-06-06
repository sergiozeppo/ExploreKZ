import { render } from '@testing-library/react';
import Crumbs from '../components/Crumbs/Crumbs';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../apiSdk/BaseClient', () => ({
    location: jest.fn().mockReturnThis(),
}));

describe('Crumbs', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <BrowserRouter>
                <Crumbs />
            </BrowserRouter>,
        );
        expect(container).toBeInTheDocument();
    });

    it('renders correct breadcrumbs', () => {
        const breadcrumbs = [{ label: 'home', url: '/' }];

        const { getByText } = render(
            <BrowserRouter>
                <Crumbs />
            </BrowserRouter>,
        );
        breadcrumbs.forEach((breadcrumb) => {
            const link = getByText(breadcrumb.label);
            expect(link).toBeInTheDocument();
        });
    });
});
