import { render } from '@testing-library/react';
import Loader from '../components/Loader/loader';
import '@testing-library/jest-dom';

describe('Loader component', () => {
    test('renders correctly', () => {
        const { container } = render(<Loader />);
        const loaderElement = container.querySelector('.loader-wrapper');
        expect(loaderElement).toBeInTheDocument();
        expect(loaderElement?.children.length).toBe(3);
    });
});
