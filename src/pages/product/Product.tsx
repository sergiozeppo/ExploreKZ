import { useEffect, useState, useRef, ReactNode } from 'react';
import { tokenClient } from '../../apiSdk/TokenClient';
import { anonUser } from '../../apiSdk/anonimClient';
import { ProductData } from '@commercetools/platform-sdk';
import { Navigate } from 'react-router-dom';
import Loader from '../../components/Loader/loader';
import { CustomToast } from '../../components/Toast';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './product.css';
import Crumbs from '../../components/Crumbs/Crumbs';

type Image = {
    key: number;
    className: string;
    src: string;
    alt: string;
    onClick: () => void;
};

export default function Product() {
    const currentUrl = String(window.location.href);
    const slash = currentUrl.lastIndexOf('/');
    const id = currentUrl.slice(slash + 1, currentUrl.length);
    const [products, setProducts] = useState<ProductData>();
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<Image[]>();
    const [modalActive, setModalActive] = useState(false);
    const carousel = useRef<AliceCarousel>(null);
    const modalCarousel = useRef<AliceCarousel>(null);

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
                        setProducts(response);
                        setLoading(false);
                        const masterVariant = response?.masterVariant?.images || [];
                        const variantImages = response?.variants?.[0]?.images || [];
                        const allImages = masterVariant.concat(variantImages);
                        const isModalActive = (): void => {
                            setModalActive(!modalActive);
                        };
                        const items: Image[] = allImages.map(
                            (image, index) =>
                                (
                                    <img
                                        key={index}
                                        className={modalActive ? 'modal-img' : 'product-img'}
                                        src={image.url}
                                        alt={`${index}`}
                                        onClick={() => {
                                            isModalActive();
                                        }}
                                    />
                                ) as unknown as Image,
                        );
                        setItems(items);
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
                    const masterVariant = response?.masterVariant?.images || [];
                    const variantImages = response?.variants?.[0]?.images || [];
                    const allImages = masterVariant.concat(variantImages);
                    const isModalActive = (): void => {
                        setModalActive(!modalActive);
                    };
                    const items: Image[] = allImages.map(
                        (image, index) =>
                            (
                                <img
                                    key={index}
                                    className={modalActive ? 'modal-img' : 'product-img'}
                                    src={image.url}
                                    alt={`${index}`}
                                    onClick={() => {
                                        isModalActive();
                                    }}
                                />
                            ) as unknown as Image,
                    );
                    if (items.length) setItems(items);
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
    }, [id, modalActive]);

    if (items?.length === 1) {
        return (
            <>
                <Crumbs />
                <p className="details">Product details</p>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className={`${modalActive ? 'hidden' : 'product-wrapper'}`}>
                            {!products ? (
                                <Navigate to="/not-found" />
                            ) : (
                                <>
                                    <div className="product">
                                        <>
                                            {!items ? (
                                                <Loader />
                                            ) : (
                                                <div className="product-img">{items as ReactNode}</div>
                                            )}

                                            <div className="product-title">
                                                {products ? products?.name['en-US'] : <Navigate to="/not-found" />}
                                            </div>
                                            <div className="product-description">
                                                {products?.description?.['en-US'] || 'Not provided!'}
                                            </div>
                                            <div className="price-wrapper">
                                                <span className="product-price">
                                                    Price:{' '}
                                                    <span
                                                        className={
                                                            products.masterVariant?.prices?.[0]?.discounted?.value
                                                                .centAmount
                                                                ? 'product-price-original'
                                                                : 'product-price-discount'
                                                        }
                                                    >
                                                        {products.masterVariant?.prices?.[0]?.value?.centAmount
                                                            ? (
                                                                  products.masterVariant?.prices?.[0]?.value
                                                                      ?.centAmount / 100
                                                              ).toFixed(2)
                                                            : Number(0).toFixed(2)}
                                                    </span>{' '}
                                                    $
                                                </span>
                                                {products.masterVariant?.prices?.[0]?.discounted?.value.centAmount ? (
                                                    <span className="discount-wrapper">
                                                        New price:{' '}
                                                        <span className="product-price-discount">
                                                            {(
                                                                products.masterVariant?.prices?.[0]?.discounted?.value
                                                                    .centAmount / 100
                                                            ).toFixed(2)}
                                                        </span>{' '}
                                                        $
                                                    </span>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        </>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className={`modal ${modalActive ? 'visible' : 'hidden'}`}>
                            <div className="modal-content">
                                <div
                                    className="close-page"
                                    onClick={() => {
                                        setModalActive(!modalActive);
                                    }}
                                >
                                    <img className="close-modal" src={'../../../images/close.png'} alt="Close page" />
                                </div>
                                <div className="modal-img">{items as ReactNode}</div>
                            </div>
                        </div>
                    </>
                )}
            </>
            //             <>
            //                 <div className="product-wrapper">
            //                     <div className={`product ${modalActive ? 'hidden' : ''}`}>
            //                         {/* <div className="close-page">
            //                         <img className="cross-pic" src={'crossPic'} alt="Close page" />
            //                     </div> */}
            //                         <div className="product-img">{items[0]}</div>
            //                         <div className="product-description">{products?.description?.['en-US'] || 'Not provided!'}</div>
            //                         <div className="price-wrapper">
            //                             <span className="product-price">
            //                                 Price:{' '}
            //                                 <span
            //                                     className={
            //                                         products?.masterVariant?.prices?.[0]?.discounted?.value.centAmount
            //                                             ? 'product-price-original'
            //                                             : 'product-price-discount'
            //                                     }
            //                                 >
            //                                     {products?.masterVariant?.prices?.[0]?.value?.centAmount
            //                                         ? (products?.masterVariant?.prices?.[0]?.value?.centAmount / 100).toFixed(2)
            //                                         : Number(0).toFixed(2)}
            //                                 </span>{' '}
            //                                 $
            //                             </span>
            //                             {products?.masterVariant?.prices?.[0]?.discounted?.value.centAmount ? (
            //                                 <span className="discount-wrapper">
            //                                     New price:{' '}
            //                                     <span className="product-price-discount">
            //                                         {(
            //                                             products.masterVariant?.prices?.[0]?.discounted?.value.centAmount / 100
            //                                         ).toFixed(2)}
            //                                     </span>{' '}
            //                                     $
            //                                 </span>
            //                             ) : (
            //                                 ''
            //                             )}
            //                         </div>
            //                     </div>
            //                     <div className={`full-screen ${modalActive ? 'visible' : ''}`}>
            //                         <div className="modal-content">
            //                             {/* <div className="close-page" onClick={isModalActive}>
            //     <img className="cross-pic" src={'crossPic'} alt="Close page" />
            // </div> */}
            //                             <div className="modal-img">{items[0]}</div>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </>
        );
    } else {
        return (
            <>
                <Crumbs />
                <p className="details">Product details</p>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className={`${modalActive ? 'hidden' : 'product-wrapper'}`}>
                            {!products ? (
                                <Navigate to="/not-found" />
                            ) : (
                                <>
                                    <div className="product">
                                        <>
                                            {!items ? (
                                                <Loader />
                                            ) : (
                                                <>
                                                    <button
                                                        className="btn-prev"
                                                        onClick={(): void => {
                                                            carousel?.current?.slidePrev();
                                                        }}
                                                    ></button>
                                                    <button
                                                        className="btn-next"
                                                        onClick={(): void => {
                                                            carousel?.current?.slideNext();
                                                        }}
                                                    ></button>
                                                    <div>
                                                        <AliceCarousel
                                                            key="carousel"
                                                            mouseTracking
                                                            // disableDotsControls
                                                            disableButtonsControls
                                                            items={items}
                                                            activeIndex={modalCarousel?.current?.state?.activeIndex}
                                                            ref={carousel}
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            <div className="product-title">
                                                {products ? products?.name['en-US'] : <Navigate to="/not-found" />}
                                            </div>
                                            <div className="product-description">
                                                {products?.description?.['en-US'] || 'Not provided!'}
                                            </div>
                                            <div className="price-wrapper">
                                                <span className="product-price">
                                                    Price:{' '}
                                                    <span
                                                        className={
                                                            products.masterVariant?.prices?.[0]?.discounted?.value
                                                                .centAmount
                                                                ? 'product-price-original'
                                                                : 'product-price-discount'
                                                        }
                                                    >
                                                        {products.masterVariant?.prices?.[0]?.value?.centAmount
                                                            ? (
                                                                  products.masterVariant?.prices?.[0]?.value
                                                                      ?.centAmount / 100
                                                              ).toFixed(2)
                                                            : Number(0).toFixed(2)}
                                                    </span>{' '}
                                                    $
                                                </span>
                                                {products.masterVariant?.prices?.[0]?.discounted?.value.centAmount ? (
                                                    <span className="discount-wrapper">
                                                        New price:{' '}
                                                        <span className="product-price-discount">
                                                            {(
                                                                products.masterVariant?.prices?.[0]?.discounted?.value
                                                                    .centAmount / 100
                                                            ).toFixed(2)}
                                                        </span>{' '}
                                                        $
                                                    </span>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        </>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className={`modal ${modalActive ? 'visible' : 'hidden'}`}>
                            <div className="modal-content">
                                <div
                                    className="close-page"
                                    onClick={() => {
                                        setModalActive(!modalActive);
                                    }}
                                >
                                    <img className="close-modal" src={'../../../images/close.png'} alt="Close page" />
                                </div>
                                <div className="modal-img">
                                    <button
                                        className="btn-prev-modal"
                                        onClick={(): void => {
                                            modalCarousel?.current?.slidePrev();
                                        }}
                                    ></button>
                                    <button
                                        className="btn-next-modal"
                                        onClick={(): void => {
                                            modalCarousel?.current?.slideNext();
                                        }}
                                    ></button>
                                    <AliceCarousel
                                        key="carousel-modal"
                                        mouseTracking
                                        disableDotsControls
                                        disableButtonsControls
                                        items={items}
                                        activeIndex={carousel?.current?.state?.activeIndex}
                                        ref={modalCarousel}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    }
}
