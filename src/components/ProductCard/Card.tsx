import Slider from 'react-slick';

type CARD_PROPS = {
    name: string;
    description: string;
    images: string[];
    price?: number;
    descount?: number;
};

export const Card = (product: CARD_PROPS) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div>
            <h2>{product.name}</h2>
            <Slider {...settings}>
                {product.images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`product-${index}`} />
                    </div>
                ))}
            </Slider>
            <p>{product.description}</p>
            <p>Цена: {product.price}</p>
        </div>
    );
};
