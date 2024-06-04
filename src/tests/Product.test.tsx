import { render } from '@testing-library/react';
import Product from '../pages/product/Product';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../apiSdk/TokenClient', () => ({
    projectKey: jest.fn().mockReturnThis(),
}));
jest.mock('../apiSdk/anonimClient', () => ({
    projectKey: jest.fn().mockReturnThis(),
}));

it('renders without crashing', () => {
    const { container } = render(
        <BrowserRouter>
            <Product />
        </BrowserRouter>,
    );
    expect(container).toBeInTheDocument();
});
