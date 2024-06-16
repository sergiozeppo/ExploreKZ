import './card.css';
import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import { tokenClient } from '../../apiSdk/TokenClient';
import { anonUser } from '../../apiSdk/anonimClient';
import { getActualCart } from '../../apiSdk/Cart';

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
    const { cartId, id, version, images, name, price, quantity, totalPrice } = cartData;
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const updateCart = async (quantity: number) => {
        console.log(version);
        const userToken = localStorage.getItem('userToken');
        const actualCartVersion = await getActualCart(cartId);
        console.log(actualCartVersion, version);
        if (localStorage.getItem('isLogin') && userToken) {
            tokenClient()
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
                    console.log(res);
                })
                .catch(console.error);
        } else {
            anonUser()
                .carts()
                .withId({ ID: cartId })
                .post({
                    body: {
                        version,
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
                    console.log(res);
                })
                .catch(console.error);
        }
    };

    const handleIncrease = () => {
        if (currentQuantity > 0) {
            const newQuantity = currentQuantity + 1;
            setCurrentQuantity(newQuantity);
            updateCart(newQuantity);
        }
    };

    const handleDecrease = () => {
        if (currentQuantity > 0) {
            const newQuantity = currentQuantity - 1;
            setCurrentQuantity(newQuantity);
            updateCart(newQuantity);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setCurrentQuantity(value);
            updateCart(value);
        }
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
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                }}
            >
                <FaMinus onClick={handleDecrease} className="cart-IncDec" />
                <input className="cart-info-quantity" type="text" value={currentQuantity} onChange={handleChange} />
                <FaPlus onClick={handleIncrease} className="cart-IncDec" />
            </td>
            <td className="cart-info">{totalPrice.toFixed(2)} USD</td>
            <td className="cart-trash">
                <FaTrashAlt className="cart-trash" />
            </td>
            {/* <FaTrashAlt className="cart-trash" /> */}
        </tr>
    );
};

export default CartCard;
