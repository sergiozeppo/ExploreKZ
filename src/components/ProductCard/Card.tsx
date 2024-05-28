import './card.css';
// import Product from '../../pages/product/Product';
import { Link } from 'react-router-dom';

type CARD_PROPS = {
    id: string;
    name: string;
    description: string;
    images: string;
    price?: number;
    discount?: number;
};

export const Card = (product: CARD_PROPS) => {
    return (
        <Link to={`${`/products`}/${product.id}`}>
            <div className="card">
                {product.discount ? (
                    <img className="discount-icon" src="./images/icons8-discount-48.png" alt="discount" />
                ) : (
                    ''
                )}
                <div className="img-wrapper">
                    <img className="card-img" src={product.images} alt={product.name} />
                </div>
                <span className="product-title">{product.name}</span>
                <p className="product-description">{product.description}</p>
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
            </div>
        </Link>
    );
};
