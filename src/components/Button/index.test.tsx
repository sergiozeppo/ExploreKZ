import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('should have correct tag, class and Button content', () => {
    it('renders with the correct tag and class', () => {
        render(<Button className="test-class">Test</Button>);
        const element = screen.getByText('Test');
        expect(element.tagName.toLowerCase()).toBe('button');
        expect(element.classList.contains('test-class')).toEqual(true);
    });

    it('renders with the correct Text', () => {
        render(<Button className="test-class">Test content</Button>);
        const element = screen.getByRole('button');
        expect(element.textContent).toBe('Test content');
    });
});
