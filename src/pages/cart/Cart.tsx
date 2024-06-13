import { useEffect } from 'react';
import { tokenClient } from '../../apiSdk/TokenClient';
import { anonUser } from '../../apiSdk/anonimClient';
import { initCartState } from '../../apiSdk/Cart';
// import { initCartState } from '../../apiSdk/Cart';
// import { GlobalContext } from '../../context/Global';

export default function Cart() {
    // const { isCatalogCalled } = useContext(GlobalContext);
    useEffect(() => {
        const getCart = async () => {
            const cart = localStorage.getItem('user-cart');
            const parsedCart = JSON.parse(cart!);
            const userToken = localStorage.getItem('userToken');
            if (localStorage.getItem('isLogin') && userToken) {
                const output = await tokenClient()
                    .me()
                    .activeCart()
                    .get()
                    .execute()
                    .then((res) => {
                        console.log(res);
                        const cartDataS = res.body;
                        localStorage.setItem('user-cart', JSON.stringify(cartDataS));
                    })
                    .catch(console.error);
                return output;
            } else {
                initCartState();
                const output = await anonUser()
                    .carts()
                    .withId({ ID: parsedCart.id })
                    .get()
                    .execute()
                    .then((res) => {
                        console.log(res);
                        const cartDataS = res.body;
                        localStorage.setItem('user-cart', JSON.stringify(cartDataS));
                    })
                    .catch(console.error);
                return output;
            }
        };
        if (localStorage.getItem('user-cart')) getCart();
    }, []);
    return (
        <>
            <p className="tempr">Cart</p>
        </>
    );
}
