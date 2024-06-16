import './card.css';
import { useContext, useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import { tokenClient } from '../../apiSdk/TokenClient';
import { anonUser } from '../../apiSdk/anonimClient';
import { getActualCart } from '../../apiSdk/Cart';
import { GlobalContext } from '../../context/Global';
import BtnLoader from '../Loader/btnLoader';

type CARD_PROPS = {
    name: string;
    images: string;
    price: number;
    quantity: number;
    totalPrice: number;

    id: string;
    version: number;
    cartId: string;
};

const CartCard = (cartData: CARD_PROPS) => {
    const { cartId, id, images, name, price, quantity, totalPrice } = cartData;
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const { setCart, cart } = useContext(GlobalContext);
    const [actualCart, setActualCart] = useState(cart);
    const [btnLoader, setBtnLoader] = useState(false);
    const [removeBtnLoader, setRemoveBtnLoader] = useState(false);

    useEffect(() => {
        setActualCart(cart);
    }, [cart]);

    const updateCart = async (quantity: number) => {
        setBtnLoader(true);
        const userToken = localStorage.getItem('userToken');
        const actualCartVersion = await getActualCart(cartId);
        if (localStorage.getItem('isLogin') && userToken && actualCart) {
            tokenClient()
                .me()
                .carts()
                .withId({ ID: actualCart?.id })
                .post({
                    body: {
                        version: actualCartVersion!,
                        actions: [
                            {
                                action: 'changeLineItemQuantity',
                                lineItemId: id,
                                quantity,
                            },
                        ],
                    },
                })
                .execute()
                .then((res) => {
                    const cartDataS = res.body;
                    localStorage.setItem('user-cart', JSON.stringify(cartDataS));
                    setCart(cartDataS);
                    setBtnLoader(false);
                })
                .catch((err) => {
                    console.error(err);
                    setBtnLoader(false);
                });
        } else {
            anonUser()
                .me()
                .carts()
                .withId({ ID: cartId })
                .post({
                    body: {
                        version: actualCartVersion!,
                        actions: [
                            {
                                action: 'changeLineItemQuantity',
                                lineItemId: id,
                                quantity,
                            },
                        ],
                    },
                })
                .execute()
                .then((res) => {
                    const cartDataS = res.body;
                    localStorage.setItem('user-cart', JSON.stringify(cartDataS));
                    setCart(cartDataS);
                    setBtnLoader(false);
                })
                .catch((err) => {
                    console.error(err);
                    setBtnLoader(false);
                });
        }
    };

    const handleIncrease = (e: React.MouseEvent<SVGElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentQuantity >= 1) {
            const newQuantity = currentQuantity + 1;
            setCurrentQuantity(newQuantity);
            updateCart(newQuantity);
        }
    };

    const handleDecrease = (e: React.MouseEvent<SVGElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget.classList.contains('cart-IncDec')) {
            if (currentQuantity > 1) {
                const newQuantity = currentQuantity - 1;
                setCurrentQuantity(newQuantity);
                updateCart(newQuantity);
            }
        }
    };

    const handleRemove = async () => {
        setRemoveBtnLoader(true);
        const userToken = localStorage.getItem('userToken');
        const client = localStorage.getItem('isLogin') && userToken ? tokenClient() : anonUser();
        const actualVersion = await getActualCart(cartId);
        client
            .me()
            .carts()
            .withId({ ID: cartId })
            .post({
                body: {
                    version: +actualVersion!,
                    actions: [
                        {
                            action: 'removeLineItem',
                            lineItemId: id,
                        },
                    ],
                },
            })
            .execute()
            .then((res) => {
                const cartDataS = res.body;
                localStorage.setItem('user-cart', JSON.stringify(cartDataS));
                setCart(cartDataS);
                setRemoveBtnLoader(false);
            })
            .catch((err) => {
                console.error(err);
                setRemoveBtnLoader(false);
            });
    };

    return (
        <tr className="card-cart">
            <td className="cart-product">
                <img className="cart-img" src={images} alt={name} />
                <span className="cart-title">{name}</span>
            </td>
            <td className="cart-info">{price.toFixed(2)} USD</td>
            <td
                className="cart-info"
                aria-disabled={btnLoader}
                style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                }}
            >
                {btnLoader && <BtnLoader />}
                <button disabled={btnLoader} className="inc-decr-btn">
                    <FaMinus onClick={handleDecrease} className="cart-IncDec" />
                </button>
                {/* <input className="cart-info-quantity" type="text" value={currentQuantity} onChange={handleChange} /> */}
                <span className="cart-info-quantity">{currentQuantity}</span>
                <button disabled={btnLoader} className="inc-decr-btn">
                    <FaPlus onClick={handleIncrease} className="cart-IncDec" />
                </button>
            </td>
            <td className="cart-info">{totalPrice.toFixed(2)} USD</td>
            <td className="cart-trash">
                <button className="cart-remove-btn" onClick={handleRemove} disabled={removeBtnLoader}>
                    {removeBtnLoader && <BtnLoader />}
                    <FaTrashAlt className="cart-trash" />
                </button>
            </td>
            {/* <FaTrashAlt className="cart-trash" /> */}
        </tr>
    );
};

export default CartCard;
