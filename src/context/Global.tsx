import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { initCartState } from '../apiSdk/Cart';

interface State {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    isCatalogCalled: boolean;
    setIsCatalogCalled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<State>({
    isLogin: false,
    setIsLogin: () => {},
    isCatalogCalled: false,
    setIsCatalogCalled: () => {},
});

interface GlobalProviderProps {
    children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
    const [isLogin, setIsLogin] = useState(false);
    const [isCatalogCalled, setIsCatalogCalled] = useState(false);

    useEffect(() => {
        const loginStatus = localStorage.getItem('isLogin');
        setIsLogin(!!loginStatus);
        if (isCatalogCalled) {
            initCartState();
            setIsCatalogCalled(false);
        }
        // if (loginStatus) {
        //     console.log('token');
        //     tokenClient()
        //         .me()
        //         .get()
        //         .execute()
        //         .then((res) => {
        //             console.log(res);
        //         })
        //         .catch((err) => console.error(err));
        // } else {
        //     anonUser()
        //         .products()
        //         .get()
        //         .execute()
        //         .then((res) => console.log(res))
        //         .catch((err) => console.error(err));
        // }
    }, [isCatalogCalled]);

    return (
        <GlobalContext.Provider value={{ isLogin, setIsLogin, isCatalogCalled, setIsCatalogCalled }}>
            {children}
        </GlobalContext.Provider>
    );
}
