import { render, screen } from '@testing-library/react';
import { Profile } from '../pages/profile/Profile';
import '@testing-library/jest-dom';

describe('Profile component', () => {
    test('renders correct text on the page', () => {
        render(<Profile />);
        const linkElement = screen.getByText('Profile');
        expect(linkElement).toBeInTheDocument();
    });
});
