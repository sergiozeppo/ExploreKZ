import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';
import '@testing-library/jest-dom';

describe('DestinationCard component', () => {
    const destCardProps = {
        dest: '/destination',
        divClass: 'destination-div',
        image: 'image-url',
        imageClass: 'image-class',
        name: 'Destination Name',
        place: 'Destination Place',
    };

    it('renders correctly with mock props', () => {
        const { getByText, getByAltText } = render(
            <Router>
                <DestinationCard {...destCardProps} />
            </Router>,
        );

        expect(getByAltText(destCardProps.name)).toBeInTheDocument();
        expect(getByText(destCardProps.name)).toBeInTheDocument();
        expect(getByText(destCardProps.place)).toBeInTheDocument();
    });

    it('navigates to correct destination on click', () => {
        const { getByRole } = render(
            <Router>
                <DestinationCard {...destCardProps} />
            </Router>,
        );

        expect(getByRole('link')).toHaveAttribute('href', destCardProps.dest);
    });
});
