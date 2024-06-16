import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/Global';

export default function Cart() {
    const { cart } = useContext(GlobalContext);
    const [currentCartProd, setCurrentCartProd] = useState(cart?.lineItems);
    //продукты текущей корзины, для отрисовки корзины используй массив currentCartProd
    console.log(currentCartProd);
    useEffect(() => {
        setCurrentCartProd(cart?.lineItems);
    }, [cart?.lineItems]);
    return (
        <div className="cart">
            {/* <h2>Cart</h2>
            {currentCartProd.lineItems.length > 0 ? (
                <ul>
                    {currentCartProd.map(product => (
                        <li key={product.id}>
                            <span>{product.name}</span>
                            <span>Quantity: {product.quantity}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty</p>
            )} */}
        </div>
    );
}
