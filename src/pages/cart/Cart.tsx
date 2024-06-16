import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/Global';
import CartCard from '../../components/CartCards/Card';
import './cart.css';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { cart } = useContext(GlobalContext);
    const [currentCartProd, setCurrentCartProd] = useState(cart?.lineItems);
    useEffect(() => {
        setCurrentCartProd(cart?.lineItems);
    }, [cart?.lineItems, cart]);
    return (
        <>
            {cart && (
                <>
                    <table className="container-cart">
                        <tbody className="cart-wrapper">
                            {currentCartProd && currentCartProd.length > 0 ? (
                                currentCartProd.map((item) => {
                                    const imageUrl = item.variant?.images?.[0]?.url || '';
                                    const price = item.variant?.prices?.[0]?.value?.centAmount ?? 0;
                                    const totalPrice = item.totalPrice.centAmount;
                                    const fixedPrice = price / 100;
                                    const fixedTotalPrice = totalPrice / 100;
                                    return (
                                        <CartCard
                                            key={item.id}
                                            images={imageUrl}
                                            name={item.name['en-US']}
                                            price={fixedPrice}
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
                    {currentCartProd && currentCartProd.length > 0 ? (
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
                    )}
                </>
            )}
        </>
    );
}
