import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Img } from '../Img';

describe('Testing Image components', () => {
    it('renders Img component with proper attributes', () => {
        const testSrc = './test-image.png';
        const testAlt = 'Test Alt Text';
        const testClassName = 'test-class';

        render(<Img src={testSrc} alt={testAlt} className={testClassName} />);

        const imgElement = screen.getByAltText(testAlt);
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', testSrc);
        expect(imgElement).toHaveAttribute('class', testClassName);
        expect(imgElement).toHaveAttribute('loading', 'lazy');
    });
});
