import { render } from '@testing-library/react';
import BtnLoader from '../components/Loader/btnLoader';
import '@testing-library/jest-dom';

describe('BtnLoader component', () => {
    test('renders correctly', () => {
        const { container } = render(<BtnLoader />);
        const loaderElement = container.querySelector('.btn-loader-wrapper');
        expect(loaderElement).toBeInTheDocument();
        expect(loaderElement?.children.length).toBe(1);
    });
});
