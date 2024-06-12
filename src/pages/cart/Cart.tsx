import { useEffect } from 'react';
import { tokenClient } from '../../apiSdk/TokenClient';
import { anonUser } from '../../apiSdk/anonimClient';

export default function Cart() {
    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        const client = localStorage.getItem('isLogin') && userToken ? tokenClient() : anonUser();
        client.me().activeCart().get().execute().then(console.log).catch(console.error);
    }, []);
    return (
        <>
            <p className="tempr">Cart</p>
        </>
    );
}
