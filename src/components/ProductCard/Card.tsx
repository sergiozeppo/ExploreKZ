import './card.css';
// import Product from '../../pages/product/Product';
import { Link } from 'react-router-dom';

type CARD_PROPS = {
    id: string;
    name: string;
    description: string;
    images: string;
    price?: number;
    descount?: number;
};

export const Card = (product: CARD_PROPS) => {
    return (
        <Link to={'/products/' + product.id}>
            <div className="card">
                <div className="img-wrapper">
                    <img className="card-img" src={product.images} alt={product.name} />
                </div>
                <span className="product-title">{product.name}</span>
                <p className="product-description">{product.description}</p>
            </div>
        </Link>
    );
};
