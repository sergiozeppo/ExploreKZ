import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/Global';
import { getActualCart } from '../../apiSdk/Cart';
import { anonUser } from '../../apiSdk/anonimClient';
import { tokenClient } from '../../apiSdk/TokenClient';
import CartCard from '../../components/CartCards/Card';
import './cart.css';

export default function Cart() {
    const { setCart, cart } = useContext(GlobalContext);
    const [currentCartProd, setCurrentCartProd] = useState(cart?.lineItems);
    useEffect(() => {
        setCurrentCartProd(cart?.lineItems);
    }, [cart?.lineItems, cart]);

    const [promoCode, setPromoCode] = useState('');
    const [promoCodeError, setPromoCodeError] = useState('');

    const promoCodeHandler = async () => {
        const userToken = localStorage.getItem('userToken');
        const id = cart?.id;

        const actualCartVersion = await getActualCart(id!);
        if (localStorage.getItem('isLogin') && userToken && cart) {
            tokenClient()
                .me()
                .carts()
                .withId({ ID: id! })
                .post({
                    body: {
                        version: actualCartVersion!,
                        actions: [
                            {
                                action: 'addDiscountCode',
                                code: promoCode,
                            },
                        ],
                    },
                })
                .execute()
                .then((res) => {
                    const cartDataS = res.body;
                    localStorage.setItem('user-cart', JSON.stringify(cartDataS));
                    setCart(cartDataS);
                    console.log(res);
                })
                .catch((err) => {
                    setPromoCodeError(err.message || 'Error detected');
                    console.error(err);
                });
        } else {
            anonUser()
                .me()
                .carts()
                .withId({ ID: id! })
                .post({
                    body: {
                        version: actualCartVersion!,
                        actions: [
                            {
                                action: 'addDiscountCode',
                                code: promoCode,
                            },
                        ],
                    },
                })
                .execute()
                .then((res) => {
                    const cartDataS = res.body;
                    localStorage.setItem('user-cart', JSON.stringify(cartDataS));
                    setCart(cartDataS);
                    console.log(res);
                })
                .catch((err) => {
                    setPromoCodeError(err.message || 'Error detected');
                    console.error(err);
                });
        }
    };

    return (
        // <>
        //     <table className="container-cart">
        //         {/* <thead>
        //             <tr className="cart-thead">
        //                 <th className="cart-thead-item">Product</th>
        //                 <th className="cart-thead-item">Price</th>
        //                 <th className="cart-thead-item">Quantity</th>
        //                 <th className="cart-thead-item">Total Price</th>
        //             </tr>
        //         </thead> */}
        //         <tbody className="cart-wrapper">
        //             {currentCartProd && currentCartProd.length > 0 ? (
        //                 currentCartProd.map((item) => {
        //                     const imageUrl = item.variant?.images?.[0]?.url || '';
        //                     const price = item.variant?.prices?.[0]?.value?.centAmount ?? 0;
        //                     const totalPrice = item.totalPrice.centAmount;
        //                     const fixedPrice = price / 100;
        //                     const fixedTotalPrice = totalPrice / 100;
        //                     return (
        //                         <CartCard
        //                             key={item.id}
        //                             images={imageUrl}
        //                             name={item.name['en-US']}
        //                             price={fixedPrice}
        //                             quantity={item.quantity}
        //                             totalPrice={fixedTotalPrice}
        //                             id={item.id}
        //                             version={cart.version}
        //                             cartId={cart.id}
        //                         />
        //                     );
        //                 })
        //             ) : (
        //                 <tr>
        //                     <td className="nothing-title">Nothing Found!</td>
        //                 </tr>
        //             )}
        //         </tbody>
        //     </table>
        //     <div className="container-cart-bottom">
        //         <button className="cart-clear-btn button">Clear Cart</button>
        //         <span className="cart-total">
        //             Total Price: $ {cart?.totalPrice.centAmount && (cart?.totalPrice.centAmount / 100).toFixed(2)}
        //         </span>
        //     </div>
        // </>
        <>
            {cart && (
                <>
                    <table className="container-cart">
                        <tbody className="cart-wrapper">
                            {currentCartProd && currentCartProd.length > 0 ? (
                                currentCartProd.map((item) => {
                                    const imageUrl = item.variant?.images?.[0]?.url || '';
                                    const price = item.variant?.prices?.[0]?.value?.centAmount ?? 0;
                                    const promoCode =
                                        item.discountedPricePerQuantity[0]?.discountedPrice?.includedDiscounts[0]
                                            .discountedAmount.centAmount || 0;
                                    const totalPrice = item.totalPrice.centAmount;
                                    const fixedPrice = price / 100;
                                    const fixedTotalPrice = totalPrice / 100;
                                    const fixedPromoCode = promoCode / 100;

                                    return (
                                        <CartCard
                                            key={item.id}
                                            images={imageUrl}
                                            name={item.name['en-US']}
                                            price={fixedPrice}
                                            pricePromo={fixedPromoCode}
                                            quantity={item.quantity}
                                            totalPrice={fixedTotalPrice}
                                            id={item.id}
                                            version={cart.version}
                                            cartId={cart.id}
                                        />
                                    );
                                })
                            ) : (
                                <tr>
                                    <td className="nothing-title">Nothing Found!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="cart-promo">
                        <input
                            className="cart-promo-input"
                            type="text"
                            placeholder="Promo Code"
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button className="cart-promo-btn btn" onClick={promoCodeHandler}>
                            Apply
                        </button>
                    </div>
                    {promoCodeError ? <span className="cart-promo-error">{promoCodeError}</span> : ''}
                    <div className="container-cart-bottom">
                        <button className="cart-clear-btn button">Clear Cart</button>
                        <span className="cart-total">
                            Total Price: ${' '}
                            {cart && cart?.totalPrice?.centAmount && (cart?.totalPrice?.centAmount / 100).toFixed(2)}
                        </span>
                    </div>
                </>
            )}
        </>
    );
}
