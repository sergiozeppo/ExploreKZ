import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import { tokenClient } from '../apiSdk/TokenClient';
// import { anonUser } from '../apiSdk/anonimClient';

interface State {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<State>({
    isLogin: false,
    setIsLogin: () => {},
});

interface GlobalProviderProps {
    children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const loginStatus = localStorage.getItem('isLogin');
        setIsLogin(!!loginStatus);
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
    }, []);

    return <GlobalContext.Provider value={{ isLogin, setIsLogin }}>{children}</GlobalContext.Provider>;
}
