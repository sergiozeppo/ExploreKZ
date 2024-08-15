import { render } from '@testing-library/react';
import CustomError from '../../components/Validation/error';
import '@testing-library/jest-dom';

describe('CustomError component', () => {
    it('renders the message when it is a string', () => {
        const errorMessage = 'Something went wrong';
        const { getByText } = render(<CustomError message={errorMessage} />);
        const errorSpan = getByText(errorMessage);
        expect(errorSpan).toBeInTheDocument();
    });

    it('does not render anything when message is undefined', () => {
        const { container } = render(<CustomError message={undefined} />);
        expect(container.firstChild).toBeNull();
    });
});
