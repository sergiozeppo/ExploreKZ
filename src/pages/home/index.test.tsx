import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import Home from '../home';

describe('Test Home component', () => {
    it('renders Img component and titles', () => {
        render(
            <Router>
                <Home />
            </Router>,
        );

        expect(screen.getByText('It Matters Who You Travel With')).toBeInTheDocument();
        expect(
            screen.getByText('We want you to feel confident in the travel experience you will have with us.'),
        ).toBeInTheDocument();

        const imgElement = screen.getByAltText('gradient');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', 'images/img_rectangle.png');
    });
});
