import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/Global';
import { getActualCart } from '../../apiSdk/Cart';
import { anonUser } from '../../apiSdk/anonimClient';
import { tokenClient } from '../../apiSdk/TokenClient';
import { CustomToast } from '../../components/Toast';
import CartCard from '../../components/CartCards/Card';
import './cart.css';
import './promptModal.css';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/loader';
import { SlClose } from 'react-icons/sl';

export default function Cart() {
    const { setCart, cart } = useContext(GlobalContext);
    const [currentCartProd, setCurrentCartProd] = useState(cart?.lineItems);
    const [promoCode, setPromoCode] = useState('');
    const [removeLoader, setRemoveLoader] = useState(false);
    const [isPrompt, setIsPrompt] = useState(false);
    const [usePromo, setUsePromo] = useState(false);
    const navigate = useNavigate();

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
                    setUsePromo(false);
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
                    setUsePromo(false);
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

    const handleRemoveAll = async () => {
        setRemoveLoader(true);
        const userToken = localStorage.getItem('userToken');
        const client = localStorage.getItem('isLogin') && userToken ? tokenClient() : anonUser();
        if (cart) {
            const actualCartVersion = await getActualCart(cart.id);
            client
                .me()
                .carts()
                .withId({ ID: cart.id! })
                .delete({ queryArgs: { version: actualCartVersion! } })
                .execute()
                .then((res) => {
                    if (res.statusCode === 200) {
                        if (userToken) {
                            client
                                .me()
                                .carts()
                                .post({
                                    body: {
                                        currency: 'USD',
                                        country: 'KZ',
                                    },
                                })
                                .execute()
                                .then((res) => {
                                    console.log(res);
                                    setRemoveLoader(false);
                                    const cartDataS = res.body;
                                    localStorage.setItem('user-cart', JSON.stringify(cartDataS));
                                    setCart(cartDataS);
                                    setIsPrompt(false);
                                })
                                .catch((err) => {
                                    console.error(err);
                                    setRemoveLoader(false);
                                });
                        } else {
                            client
                                .carts()
                                .post({
                                    body: {
                                        currency: 'USD',
                                        country: 'KZ',
                                        anonymousId: localStorage.getItem('anonId') || '',
                                    },
                                })
                                .execute()
                                .then((res) => {
                                    console.log(res);
                                    const cartDataS = res.body;
                                    localStorage.setItem('user-cart', JSON.stringify(cartDataS));
                                    setCart(cartDataS);
                                    setRemoveLoader(false);
                                    setIsPrompt(false);
                                })
                                .catch((err) => {
                                    console.error(err);
                                    setRemoveLoader(false);
                                });
                        }
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setRemoveLoader(false);
                });
        }
    };

    const handleModalOpen = () => {
        setIsPrompt(true);
    };

    const handleModalClose = () => {
        setIsPrompt(false);
    };

    const handleUsePromo = () => {
        setUsePromo(true);
    };
    const handleUsePromoClose = () => {
        setUsePromo(false);
    };

    const handleCheckout = () => {
        console.log('checkout');
        navigate('/cart/checkout');
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
                    {/* <div className="cart-promo">
                        <input
                            className="cart-promo-input"
                            type="text"
                            placeholder="Promo Code"
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button className="cart-promo-btn btn" onClick={promoCodeHandler}>
                            Apply
                        </button>
                    </div> */}
                    {/* <div className="container-cart-bottom">
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
                    </div> */}
                    {currentCartProd && currentCartProd.length > 0 ? (
                        <div className="cart-bottom-wrapper">
                            {usePromo && (
                                <div className="cart-promo">
                                    <input
                                        className="cart-promo-input"
                                        type="text"
                                        placeholder="Promo Code"
                                        onChange={(e) => setPromoCode(e.target.value)}
                                    />
                                    <button className="cart-promo-btn button" onClick={promoCodeHandler}>
                                        Apply
                                    </button>
                                    <button className="close-promo-btn" onClick={handleUsePromoClose}>
                                        <SlClose />
                                    </button>
                                </div>
                            )}
                            <div className="container-cart-bottom">
                                <div className="cart-btns-container">
                                    <button className="cart-clear-btn button" onClick={handleModalOpen}>
                                        Clear Cart
                                    </button>
                                    <button
                                        className={!usePromo ? 'button' : 'button btn-disabled'}
                                        onClick={handleUsePromo}
                                    >
                                        Use Promo
                                    </button>
                                    <button className="button" onClick={handleCheckout}>
                                        Checkout
                                    </button>
                                </div>
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
                        </div>
                    ) : (
                        ''
                    )}
                </>
            )}
            {isPrompt && (
                <div className="modal-wrapper">
                    {removeLoader && <Loader />}
                    <div className="modal-body">
                        <p className="modal-text">Are you sure you want to delete all items from the cart?</p>
                        <div className="modal-btn-wrapper">
                            <button className="button" onClick={handleRemoveAll}>
                                Confirm
                            </button>
                            <button className="button" onClick={handleModalClose}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
