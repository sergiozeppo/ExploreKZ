import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import Login from '../pages/login';
// import { loginFn } from '../apiSdk/LoginUser';
// import { Link } from 'react-router-dom';

jest.mock('../apiSdk/TokenClient', () => ({
    tokenClient: jest.fn().mockImplementation(() => ({
        me: jest.fn().mockReturnThis(),
        carts: jest.fn().mockReturnThis(),
        get: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({}),
    })),
}));

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

jest.mock('../apiSdk/LoginUser', () => ({
    httpMiddlewareOptions: jest.fn().mockImplementation(() => ({
        host: jest.fn().mockReturnThis(),
        fetch: jest.fn().mockReturnThis(),
    })),
}));

jest.mock('../apiSdk/anonimClient', () => ({
    anonUser: jest.fn().mockImplementation(() => ({
        customers: jest.fn().mockReturnThis(),
        get: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({}),
    })),
}));

describe('Testing Login page', () => {
    test('renders form and responds to user input', () => {
        const { getByLabelText, getByText } = render(
            <Router>
                <Login />
            </Router>,
        );

        // Проверка отображения полей ввода
        const emailInput = getByLabelText('Email') as HTMLInputElement;
        const passwordInput = getByLabelText('Password') as HTMLInputElement;
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        // Проверка ввода данных пользователем
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'Test123!' } });
        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('Test123!');

        // Проверка нажатия кнопки "Login"
        const loginButton = getByText('Login');
        fireEvent.click(loginButton);

        // Добавьте здесь проверки, которые соответствуют вашему приложению
        // Например, вы можете проверить, вызывается ли функция onSubmit
    });

    test('renders link to registration and responds to click', () => {
        const { getByText } = render(
            <Router>
                <Login />
            </Router>,
        );

        const linkElement = getByText('Sign up!');
        expect(linkElement).toBeInTheDocument();

        fireEvent.click(linkElement);
        expect(window.location.href).toBe('http://localhost/registration');
    });
});
