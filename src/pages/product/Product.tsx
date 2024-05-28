import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { tokenClient } from '../../apiSdk/TokenClient';
import { anonUser } from '../../apiSdk/anonimClient';
import { ProductData } from '@commercetools/platform-sdk';
import { Navigate } from 'react-router-dom';
import Loader from '../../components/Loader/loader';
import { CustomToast } from '../../components/Toast';
// import { Img } from '../../components';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import './product.css';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Image = {
    url: string;
    dimensions: {
        h: number;
        w: number;
    };
};

export default function Product() {
    const currentUrl = String(window.location.href);
    const slash = currentUrl.lastIndexOf('/');
    const id = currentUrl.slice(slash + 1, currentUrl.length);
    const [products, setProducts] = useState<ProductData>();
    const [images, setImages] = useState<Image[]>();
    const [loading, setLoading] = useState(true);
    const [slides, setSlides] = useState<Image[]>([]);

    useEffect(() => {
        if (localStorage.getItem('isLogin')) {
            const userToken = localStorage.getItem('userToken');
            if (userToken) {
                tokenClient()
                    .products()
                    .withId({ ID: id })
                    .get({
                        headers: {
                            Authorization: `Bearer ${JSON.parse(userToken).token}`,
                        },
                    })
                    .execute()
                    .then((res) => {
                        console.log(res);
                        const response: ProductData = res.body.masterData.current;
                        console.log(response);
                        setProducts(response);
                        setLoading(false);
                        const masterVariant = response?.masterVariant?.images || [];
                        const variantImages = response?.variants?.[0]?.images || [];
                        const allImages = masterVariant.concat(variantImages);
                        console.log(allImages);
                        if (allImages.length > 0) setImages(allImages);
                        setSlides((prevSlides: Image[]) => prevSlides.concat(allImages));
                    })
                    .catch((error) => {
                        if (error.statusCode === 404) {
                            console.error('Product not found:', error);
                            setLoading(false);
                            CustomToast('error', 'Product not found');
                        } else if (error.statusCode === 401 || error.statusCode === 403) {
                            console.error('Authentication or authorization error:', error);
                            setLoading(false);
                            CustomToast('error', 'Authentication or authorization error');
                        } else {
                            console.error('An unexpected error occurred:', error);
                            setLoading(false);
                            CustomToast('error', 'An error occurred, please try again later');
                        }
                    });
            }
        } else {
            console.log('anonim flow');
            anonUser()
                .products()
                .withId({ ID: id })
                .get()
                .execute()
                .then((res) => {
                    console.log(res);
                    const response: ProductData = res.body.masterData.current;
                    setProducts(response);
                    setLoading(false);
                })
                .catch((error) => {
                    if (error.statusCode === 404) {
                        console.error('Product not found:', error);
                        setLoading(false);
                        CustomToast('error', 'Product not found');
                    } else if (error.statusCode === 401 || error.statusCode === 403) {
                        console.error('Authentication or authorization error:', error);
                        setLoading(false);
                        CustomToast('error', 'Authentication or authorization error');
                    } else {
                        console.error('An unexpected error occurred:', error);
                        setLoading(false);
                        CustomToast('error', 'An error occurred, please try again later');
                    }
                });
        }
    }, [id]);

    return (
        <>
            <p className="details">Product details</p>
            {loading ? (
                <Loader />
            ) : (
                <div className="product-wrapper">
                    {!products ? (
                        <Navigate to="/not-found" />
                    ) : (
                        <>
                            {/* <Img
                                className="product-img"
                                src={products?.masterVariant?.images?.[0]?.url || ''}
                                alt={products?.name['en-US'] || ''}
                            /> */}
                            <div className="product">
                                <>
                                    <Swiper
                                        spaceBetween={30}
                                        effect={'fade'}
                                        navigation={true}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        modules={[EffectFade, Navigation, Pagination]}
                                        className="swiper"
                                    >
                                        {!images ? (
                                            <Loader />
                                        ) : (
                                            slides.map((slide, index) => (
                                                <SwiperSlide key={index}>
                                                    <img src={slide.url} alt={`${index}`} className="w-100" />
                                                </SwiperSlide>
                                            ))
                                        )}
                                        {/* // allImages.map()
                                        // images.map((image, index) => (
                                        //     <div key={index} className="slide">
                                        //       <img src={image.url} alt={`Slide ${index + 1}`} />
                                        //     </div>
                                        //   ))
                                     */}
                                        {/* <SwiperSlide className="swiper-slide">
                                        <img className="product-img" src={products?.masterVariant?.images?.[0]?.url} />
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <img src={products?.variants?.[0].images?.[0]?.url} />
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                                    </SwiperSlide> */}
                                    </Swiper>
                                    <div className="product-title">
                                        {products ? products?.name['en-US'] : <Navigate to="/not-found" />}
                                    </div>
                                    <div className="product-description">
                                        {products?.description?.['en-US'] || 'Not provided!'}
                                    </div>
                                </>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
