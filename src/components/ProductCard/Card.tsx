import './card.css';
// import Product from '../../pages/product/Product';
import { Link } from 'react-router-dom';
import { productIdData } from './productIdData';
import { useEffect, useState } from 'react';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { tokenClient } from '../../apiSdk/TokenClient';
import { anonUser } from '../../apiSdk/anonimClient';

type CARD_PROPS = {
    id: string;
    name: string;
    description: string;
    images: string;
    price?: number;
    discount?: number;
};

export const Card = (product: CARD_PROPS) => {
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
    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        const currentProduct = e.target as HTMLElement;
        if (currentProduct.getAttribute('id') && localStorage.getItem('user-cart')) {
            const cartData = JSON.parse(localStorage.getItem('user-cart')!);
            const userToken = localStorage.getItem('userToken');
            const client = localStorage.getItem('isLogin') && userToken ? tokenClient() : anonUser();
            console.log(cartData.version);
            console.log(currentProduct.getAttribute('id'));
            client
                .me()
                .carts()
                .withId({ ID: cartData.id! })
                .post({
                    body: {
                        version: cartData.version,
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
                    const cartData = res.body;
                    localStorage.setItem('user-cart', JSON.stringify(cartData));
                })
                .catch((err) => console.error(err));
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
                    <button className="button add-to-cart-btn" onClick={handleAddToCart} id={product.id}>
                        Add <MdOutlineAddShoppingCart />
                    </button>
                </div>
            </div>
        </Link>
    );
};
