import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { initCartState } from '../apiSdk/Cart';
import { initAnonId } from '../apiSdk/anonimClient';
import { Cart } from '@commercetools/platform-sdk';

interface State {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    cart: Cart | null;
    setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
}

export const GlobalContext = createContext<State>({
    isLogin: false,
    setIsLogin: () => {},
    cart: null,
    setCart: () => {},
});

interface GlobalProviderProps {
    children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
    const [isLogin, setIsLogin] = useState(false);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('user-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        const initiator = async () => {
            console.log('initialization');
            const loginStatus = localStorage.getItem('isLogin');
            setIsLogin(!!loginStatus);
            initAnonId();
            initCartState();
            const savedCart = localStorage.getItem('user-cart');
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        };
        initiator();
    }, []);

    useEffect(() => {
        localStorage.setItem('user-cart', JSON.stringify(cart));
    }, [cart]);

    return <GlobalContext.Provider value={{ isLogin, setIsLogin, cart, setCart }}>{children}</GlobalContext.Provider>;
}
