import { render, screen } from '@testing-library/react';
import { Text } from '../Text';

describe('Text', () => {
    it('renders with the correct tag and class', () => {
        render(
            <Text as="h1" className="test-class">
                Test
            </Text>,
        );
        const element = screen.getByText('Test');
        expect(element.tagName).toBe('H1');
        expect(element.classList.contains('test-class')).toEqual(true);
    });

    it('renders with the correct text', () => {
        render(
            <Text as="p" className="test-class">
                Test content
            </Text>,
        );
        const element = screen.getByRole('paragraph');
        expect(element.textContent).toBe('Test content');
    });
});
