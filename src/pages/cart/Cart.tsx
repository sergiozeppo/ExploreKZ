import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/Global';
import { getActualCart } from '../../apiSdk/Cart';
import { anonUser } from '../../apiSdk/anonimClient';
import { tokenClient } from '../../apiSdk/TokenClient';
import { CustomToast } from '../../components/Toast';
import CartCard from '../../components/CartCards/Card';
import './cart.css';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { setCart, cart } = useContext(GlobalContext);
    const [currentCartProd, setCurrentCartProd] = useState(cart?.lineItems);
    const [promoCode, setPromoCode] = useState('');
    useEffect(() => {
        setCurrentCartProd(cart?.lineItems);
    }, [cart?.lineItems, cart]);

    const promoCodeHandler = async () => {
        const userToken = localStorage.getItem('userToken');
        const id = cart?.id;

        if (promoCode === '') return CustomToast('error', 'You need input code before submit');

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
                    CustomToast('success', 'Promo code applied');
                })
                .catch((err) => {
                    console.error(err);
                    CustomToast('error', err.statusCode === 400 ? err.message : 'Error detected');
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
                    CustomToast('success', 'Promo code applied');
                })
                .catch((err) => {
                    console.error(err);
                    CustomToast('error', err.statusCode === 400 ? err.message : 'Error detected');
                });
        }
    };

    const calcPromoPrice = () => {
        let totalPriceWithoutDiscount = 0;

        if (cart) {
            for (const lineItem of cart.lineItems) {
                totalPriceWithoutDiscount +=
                    lineItem.discountedPricePerQuantity[0].discountedPrice.includedDiscounts[0].discountedAmount
                        .centAmount * lineItem.quantity;
            }
        }

        return totalPriceWithoutDiscount / 100;
    };

    return (
        <>
            {cart && (
                <>
                    <table className="container-cart">
                        <tbody className="cart-wrapper">
                            {currentCartProd && currentCartProd.length > 0 ? (
                                currentCartProd.map((item) => {
                                    const imageUrl = item.variant?.images?.[0]?.url || '';
                                    const price =
                                        item.variant?.prices?.[0]?.discounted?.value.centAmount ||
                                        item.variant?.prices?.[0]?.value?.centAmount;
                                    const promoCode =
                                        item.discountedPricePerQuantity[0]?.discountedPrice?.includedDiscounts[0]
                                            .discountedAmount.centAmount || 0;
                                    const totalPrice = item.totalPrice.centAmount;
                                    const fixedPrice = price! / 100;
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
                                    <td className="nothing-title nothing-cart">
                                        <span className="h2">Shopping cart is empty!</span>
                                        <br />
                                        <Link to="/catalog">
                                            <span className="h2">
                                                Now You can choose your perfect
                                                <strong className="h2 link"> tour around of Kazakhstan</strong>
                                            </span>
                                        </Link>
                                    </td>
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
                    <div className="container-cart-bottom">
                        <button className="cart-clear-btn button">Clear Cart</button>
                        <span className="cart-total">
                            Total Price: ${' '}
                            {cart.discountCodes && cart.discountCodes.length > 0 ? (
                                <>
                                    <span className="product-price-discount">
                                        {(cart?.totalPrice?.centAmount / 100).toFixed(2)}
                                    </span>
                                    <span className="product-price-original">
                                        {(cart?.totalPrice?.centAmount / 100 + calcPromoPrice()).toFixed(2)}
                                    </span>
                                </>
                            ) : (
                                (cart?.totalPrice?.centAmount / 100).toFixed(2)
                            )}
                        </span>
                    </div>
<!--                     {currentCartProd && currentCartProd.length > 0 ? (
                        <div className="container-cart-bottom">
                            <button className="cart-clear-btn button">Clear Cart</button>
                            <span className="cart-total">
                                Total Price: ${' '}
                                {cart &&
                                    cart?.totalPrice?.centAmount &&
                                    (cart?.totalPrice?.centAmount / 100).toFixed(2)}
                            </span>
                        </div>
                    ) : (
                        ''
                    )} -->
                </>
            )}
        </>
    );
}
