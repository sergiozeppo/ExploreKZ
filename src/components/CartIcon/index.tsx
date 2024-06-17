import './index.css';
import { useContext } from 'react';
import { GlobalContext } from '../../context/Global';

const CartIcon = () => {
    const { cart } = useContext(GlobalContext);
    const quantity = cart?.totalLineItemQuantity || 0;

    return (
        <div className={`cart-icon`}>
            <span className={`${quantity === 0 ? '' : 'indicator'}`}>{`${quantity > 0 ? quantity : ''}`}</span>
        </div>
    );
};

export default CartIcon;
