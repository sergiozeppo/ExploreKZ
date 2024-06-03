import { render, screen } from '@testing-library/react';
import Burger from '../components/Burger/Burger';
// import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
// import React from 'react';
// import { shallow } from 'enzyme';
// import { renderHook, act } from '@testing-library/react';

// const setState = jest.fn();
// const useStateSpy = jest.spyOn(React, 'useState');
// useStateSpy.mockImplementation((initialState: string) => [(initialState, setState)] as Dispatch<string>);
// const wrapper = shallow(<Burger />);

jest.mock('../apiSdk/BaseClient', () => ({
    authMiddlewareOptions: jest.fn().mockImplementation(() => ({
        projectKey: jest.fn().mockReturnThis(),
        host: jest.fn().mockReturnThis(),
        credentials: {
            clientId: jest.fn().mockReturnThis(),
            clientSecret: jest.fn().mockReturnThis(),
        },
        scopes: jest.fn().mockReturnThis(),
        fetch: jest.fn().mockReturnThis(),
    })),
    projectKey: jest.fn().mockReturnThis(),
    scopes: jest.fn().mockReturnThis(),
}));

describe('toggleMenu', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <BrowserRouter>
                <Burger />
            </BrowserRouter>,
        );
        expect(container).toBeInTheDocument();
    });
    it('renders links correctly', () => {
        render(
            <BrowserRouter>
                <Burger />
            </BrowserRouter>,
        );
        const loginButton = screen.getByText('Login');
        expect(loginButton).toBeInTheDocument();
        expect(loginButton.closest('a')).toHaveAttribute('href', '/login');
        const signUpButton = screen.getByText('Sign Up');
        expect(signUpButton).toBeInTheDocument();
        expect(signUpButton.closest('a')).toHaveAttribute('href', '/registration');
        const homeLink = screen.getByText('Home');
        expect(homeLink).toBeInTheDocument();
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
        const catalogLink = screen.getByText('Catalog');
        expect(catalogLink).toBeInTheDocument();
        expect(catalogLink.closest('a')).toHaveAttribute('href', '/catalog');
        const cartLink = screen.getByText('Cart');
        expect(cartLink).toBeInTheDocument();
        expect(cartLink.closest('a')).toHaveAttribute('href', '/cart');
        const aboutLink = screen.getByText('About Us');
        expect(aboutLink).toBeInTheDocument();
        expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
    });

    // it('should toggle the isOpen state', () => {
    //     render(
    //         <BrowserRouter>
    //             <Burger />
    //         </BrowserRouter>,
    //     );
    //     const [isOpen, setIsOpen] = useState(false);
    //     const toggleMenu = () => {
    //         setIsOpen(!isOpen);
    //     };
    //     toggleMenu();
    //     expect(isOpen).toBe(true);
    // });
    // it('should update state on input change', () => {
    //     const newInputValue = 'React is Awesome';
    //     wrapper.find('.input').simulate('change', { target: { value: newInputValue } });
    //     expect(setState).toHaveBeenCalledWith(newInputValue);
    // });
});
// describe('useInputChange', () => {
//     it('1', () => {
//         const { result } = renderHook(() => useState(''));
//         const [text, setText] = result.current;
//         act(() => setText('123123'));
//         expect(result.current[0]).toBe('123123');
//     });
// });
