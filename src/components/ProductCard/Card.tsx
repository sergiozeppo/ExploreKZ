import './card.css';
// import Product from '../../pages/product/Product';
import { Link } from 'react-router-dom';
import { productIdData } from './productIdData';
import { useContext, useEffect, useState } from 'react';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { tokenClient } from '../../apiSdk/TokenClient';
import { anonUser } from '../../apiSdk/anonimClient';
import { getActualCart } from '../../apiSdk/Cart';
import { GlobalContext } from '../../context/Global';
import BtnLoader from '../Loader/btnLoader';

type CARD_PROPS = {
    id: string;
    name: string;
    description: string;
    images: string;
    price?: number;
    discount?: number;
    isInCart?: boolean;
};

export const Card = (product: CARD_PROPS) => {
    const { setCart, setIsRequestComing } = useContext(GlobalContext);
    const [btnLoader, setBtnLoader] = useState(false);
    const [path, setPath] = useState('');
    useEffect(() => {
        const handlePath = () => {
            if (productIdData[product.id]) {
                setPath(
                    `/catalog/${productIdData[product.id].category}/${productIdData[product.id].subcategory}/${product.id}`,
                );
            }
        };
        handlePath();
    });
    // useEffect(() => {
    //     setIsRequestComing(btnLoader);
    // }, [btnLoader, setIsRequestComing]);
    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setBtnLoader(true);
        setIsRequestComing(true);
        e.stopPropagation();
        e.preventDefault();
        const currentProduct = e.target as HTMLElement;
        if (currentProduct.getAttribute('id')) {
            if (localStorage.getItem('user-cart')) {
                currentProduct.setAttribute('disabled', 'true');
                const cartData = JSON.parse(localStorage.getItem('user-cart')!);
                const userToken = localStorage.getItem('userToken');
                const client = localStorage.getItem('isLogin') && userToken ? tokenClient() : anonUser();
                const actualVersionCart = await getActualCart(cartData.id);
                client
                    .me()
                    .carts()
                    .withId({ ID: cartData.id! })
                    .post({
                        body: {
                            version: +actualVersionCart!,
                            actions: [
                                {
                                    action: 'addLineItem',
                                    productId: currentProduct.getAttribute('id')!,
                                },
                            ],
                        },
                    })
                    .execute()
                    .then((res) => {
                        setBtnLoader(false);
                        const cartDataS = res.body;
                        localStorage.setItem('user-cart', JSON.stringify(cartDataS));
                        setCart(cartDataS);
                        setIsRequestComing(false);
                    })
                    .catch(() => {
                        console.log('одновременно нажимаете на кнопку');
                        setBtnLoader(false);
                        setIsRequestComing(false);
                    });
            }
        }
    };
    return (
        // <Link to={`${`/products`}/${product.id}`}>
        <Link to={`${path}`}>
            <div className="card">
                {product.discount ? (
                    <img className="discount-icon" src="/images/icons8-discount-48.png" alt="discount" />
                ) : (
                    ''
                )}
                <div className="img-wrapper">
                    <img className="card-img" src={product.images} alt={product.name} />
                </div>
                <span className="product-title">{product.name}</span>
                <p className="product-description">{product.description}</p>
                <div className="card-bottom-side">
                    <div className="price-wrapper">
                        <span className="product-price">
                            Price:{' '}
                            <span className={product.discount ? 'product-price-original' : 'product-price-discount'}>
                                {product.price}
                            </span>{' '}
                            USD
                        </span>
                        {product.discount ? (
                            <span className="discount-wrapper">
                                New price: <span className="product-price-discount">{product.discount}</span> USD
                            </span>
                        ) : (
                            ''
                        )}
                    </div>
                    <button
                        className={
                            !product.isInCart
                                ? 'button add-to-cart-btn'
                                : 'button add-to-cart-btn add-to-cart-btn-disabled'
                        }
                        onClick={handleAddToCart}
                        id={product.id}
                        disabled={product.isInCart}
                    >
                        {btnLoader && <BtnLoader />}
                        {product.isInCart ? 'In Cart' : 'Add'}
                        <MdOutlineAddShoppingCart />
                    </button>
                </div>
            </div>
        </Link>
    );
};
