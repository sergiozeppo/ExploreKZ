import { render } from '@testing-library/react';
import About from '../pages/about/About';
import '@testing-library/jest-dom';

describe('About us component', () => {
    test('renders correct text on the page', () => {
        const { container } = render(<About />);
        const contElement = container.querySelector('.about');
        expect(contElement).toBeInTheDocument();
    });
    test('renders correct heading on the page', () => {
        const { container } = render(<About />);
        const headingElement = container.querySelector('.h2');
        expect(headingElement).toBeInTheDocument();
        expect(headingElement?.textContent).toBe('About us');
    });
    test('renders correct description of the team on the page', () => {
        const { container } = render(<About />);
        const teamElement = container.querySelector('.team');
        expect(teamElement).toBeInTheDocument();
        expect(teamElement?.children.length).toBe(2);
    });
    test('renders correct number of devs on the page', () => {
        const { container } = render(<About />);
        const devsElement = container.querySelector('.devs-wrapper');
        expect(devsElement).toBeInTheDocument();
        expect(devsElement?.children.length).toBe(3);
    });
});
