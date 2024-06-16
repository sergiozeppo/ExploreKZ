// import { useEffect, useState, useRef, ReactNode } from 'react';
// import { tokenClient } from '../../apiSdk/TokenClient';
// import { anonUser } from '../../apiSdk/anonimClient';
// import { ProductData } from '@commercetools/platform-sdk';
// import { Navigate } from 'react-router-dom';
// import Loader from '../../components/Loader/loader';
// import { CustomToast } from '../../components/Toast';
// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';
// import './product.css';
// import Crumbs from '../../components/Crumbs/Crumbs';

// type Image = {
//     key: number;
//     className: string;
//     src: string;
//     alt: string;
//     onClick: () => void;
// };

// const responsive = {
//     0: {
//         items: 1,
//     },
//     390: {
//         items: 1,
//         itemsFit: 'contain',
//     },
//     600: {
//         items: 1,
//         itemsFit: 'fill',
//     },
//     1024: {
//         items: 1,
//         itemsFit: 'fill',
//     },
//     1200: {
//         items: 1,
//         itemsFit: 'fill',
//     },
// };

// export default function Product() {
//     const currentUrl = String(window.location.href);
//     const slash = currentUrl.lastIndexOf('/');
//     const id = currentUrl.slice(slash + 1, currentUrl.length);
//     const [products, setProducts] = useState<ProductData>();
//     const [loading, setLoading] = useState(true);
//     const [items, setItems] = useState<Image[]>();
//     const [modalActive, setModalActive] = useState(false);
//     const carousel = useRef<AliceCarousel>(null);
//     const modalCarousel = useRef<AliceCarousel>(null);

//     useEffect(() => {
//         if (localStorage.getItem('isLogin')) {
//             const userToken = localStorage.getItem('userToken');
//             if (userToken) {
//                 tokenClient()
//                     .products()
//                     .withId({ ID: id })
//                     .get({
//                         headers: {
//                             Authorization: `Bearer ${JSON.parse(userToken).token}`,
//                         },
//                     })
//                     .execute()
//                     .then((res) => {
//                         console.log(res);
//                         const response: ProductData = res.body.masterData.current;
//                         setProducts(response);
//                         setLoading(false);
//                         const masterVariant = response?.masterVariant?.images || [];
//                         const variantImages = response?.variants?.[0]?.images || [];
//                         const allImages = masterVariant.concat(variantImages);
//                         const isModalActive = (): void => {
//                             setModalActive(!modalActive);
//                         };
//                         const items: Image[] = allImages.map(
//                             (image, index) =>
//                                 (
//                                     <img
//                                         key={index}
//                                         className={modalActive ? 'modal-img' : 'product-img'}
//                                         src={image.url}
//                                         alt={`${index}`}
//                                         onClick={() => {
//                                             isModalActive();
//                                         }}
//                                     />
//                                 ) as unknown as Image,
//                         );
//                         setItems(items);
//                     })
//                     .catch((error) => {
//                         if (error.statusCode === 404) {
//                             console.error('Product not found:', error);
//                             setLoading(false);
//                             CustomToast('error', 'Product not found');
//                         } else if (error.statusCode === 401 || error.statusCode === 403) {
//                             console.error('Authentication or authorization error:', error);
//                             setLoading(false);
//                             CustomToast('error', 'Authentication or authorization error');
//                         } else {
//                             console.error('An unexpected error occurred:', error);
//                             setLoading(false);
//                             CustomToast('error', 'An error occurred, please try again later');
//                         }
//                     });
//             }
//         } else {
//             console.log('anonim flow');
//             anonUser()
//                 .products()
//                 .withId({ ID: id })
//                 .get()
//                 .execute()
//                 .then((res) => {
//                     console.log(res);
//                     const response: ProductData = res.body.masterData.current;
//                     setProducts(response);
//                     setLoading(false);
//                     const masterVariant = response?.masterVariant?.images || [];
//                     const variantImages = response?.variants?.[0]?.images || [];
//                     const allImages = masterVariant.concat(variantImages);
//                     const isModalActive = (): void => {
//                         setModalActive(!modalActive);
//                     };
//                     const items: Image[] = allImages.map(
//                         (image, index) =>
//                             (
//                                 <img
//                                     key={index}
//                                     className={modalActive ? 'modal-img' : 'product-img'}
//                                     src={image.url}
//                                     alt={`${index}`}
//                                     onClick={() => {
//                                         isModalActive();
//                                     }}
//                                 />
//                             ) as unknown as Image,
//                     );
//                     if (items.length) setItems(items);
//                 })
//                 .catch((error) => {
//                     if (error.statusCode === 404) {
//                         console.error('Product not found:', error);
//                         setLoading(false);
//                         CustomToast('error', 'Product not found');
//                     } else if (error.statusCode === 401 || error.statusCode === 403) {
//                         console.error('Authentication or authorization error:', error);
//                         setLoading(false);
//                         CustomToast('error', 'Authentication or authorization error');
//                     } else {
//                         console.error('An unexpected error occurred:', error);
//                         setLoading(false);
//                         CustomToast('error', 'An error occurred, please try again later');
//                     }
//                 });
//         }
//     }, [id, modalActive]);

//     useEffect(() => {}, []);

//     if (items?.length === 1) {
//         return (
//             <>
//                 <Crumbs />
//                 <p className="details">Product details</p>
//                 {loading ? (
//                     <Loader />
//                 ) : (
//                     <>
//                         <div className={`${modalActive ? 'hidden' : 'product-wrapper'}`}>
//                             {!products ? (
//                                 <Navigate to="/not-found" />
//                             ) : (
//                                 <>
//                                     <div className="product">
//                                         <>
//                                             {!items ? (
//                                                 <Loader />
//                                             ) : (
//                                                 <div className="product-img">{items as ReactNode}</div>
//                                             )}

//                                             <div className="product-title">
//                                                 {products ? products?.name['en-US'] : <Navigate to="/not-found" />}
//                                             </div>
//                                             <div className="product-description">
//                                                 {products?.description?.['en-US'] || 'Not provided!'}
//                                             </div>
//                                             <div className="price-wrapper">
//                                                 <span className="product-price">
//                                                     Price:{' '}
//                                                     <span
//                                                         className={
//                                                             products.masterVariant?.prices?.[0]?.discounted?.value
//                                                                 .centAmount
//                                                                 ? 'product-price-original'
//                                                                 : 'product-price-discount'
//                                                         }
//                                                     >
//                                                         {products.masterVariant?.prices?.[0]?.value?.centAmount
//                                                             ? (
//                                                                   products.masterVariant?.prices?.[0]?.value
//                                                                       ?.centAmount / 100
//                                                               ).toFixed(2)
//                                                             : Number(0).toFixed(2)}
//                                                     </span>{' '}
//                                                     $
//                                                 </span>
//                                                 {products.masterVariant?.prices?.[0]?.discounted?.value.centAmount ? (
//                                                     <span className="discount-wrapper">
//                                                         New price:{' '}
//                                                         <span className="product-price-discount">
//                                                             {(
//                                                                 products.masterVariant?.prices?.[0]?.discounted?.value
//                                                                     .centAmount / 100
//                                                             ).toFixed(2)}
//                                                         </span>{' '}
//                                                         $
//                                                     </span>
//                                                 ) : (
//                                                     ''
//                                                 )}
//                                             </div>
//                                         </>
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                         <div className={`modal ${modalActive ? 'visible' : 'hidden'}`}>
//                             <div className="modal-content">
//                                 <div
//                                     className="close-modal"
//                                     onClick={() => {
//                                         setModalActive(!modalActive);
//                                     }}
//                                 ></div>
//                                 <div className="modal-img">{items as ReactNode}</div>
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </>
//         );
//     } else {
//         return (
//             <>
//                 <Crumbs />
//                 <p className="details">Product details</p>
//                 {loading ? (
//                     <Loader />
//                 ) : (
//                     <>
//                         <div className={`${modalActive ? 'hidden' : 'product-wrapper'}`}>
//                             {!products ? (
//                                 <Navigate to="/not-found" />
//                             ) : (
//                                 <>
//                                     <div className="product">
//                                         <>
//                                             {!items ? (
//                                                 <Loader />
//                                             ) : (
//                                                 <>
//                                                     <div className="slider-main-wrapper">
//                                                         <AliceCarousel
//                                                             key="carousel"
//                                                             mouseTracking
//                                                             disableDotsControls
//                                                             disableButtonsControls
//                                                             items={items}
//                                                             activeIndex={modalCarousel?.current?.state?.activeIndex}
//                                                             responsive={responsive}
//                                                             ref={carousel}
//                                                         />
//                                                         <div className="slider-controls">
//                                                             <button
//                                                                 className="btn-prev"
//                                                                 onClick={(): void => {
//                                                                     carousel?.current?.slidePrev();
//                                                                 }}
//                                                             ></button>
//                                                             <button
//                                                                 className="btn-next"
//                                                                 onClick={(): void => {
//                                                                     carousel?.current?.slideNext();
//                                                                 }}
//                                                             ></button>
//                                                         </div>
//                                                     </div>
//                                                 </>
//                                             )}

//                                             <div className="product-title">
//                                                 {products ? products?.name['en-US'] : <Navigate to="/not-found" />}
//                                             </div>
//                                             <div className="product-description">
//                                                 {products?.description?.['en-US'] || 'Not provided!'}
//                                             </div>
//                                             <div className="price-wrapper">
//                                                 <span className="product-price">
//                                                     Price:{' '}
//                                                     <span
//                                                         className={
//                                                             products.masterVariant?.prices?.[0]?.discounted?.value
//                                                                 .centAmount
//                                                                 ? 'product-price-original'
//                                                                 : 'product-price-discount'
//                                                         }
//                                                     >
//                                                         {products.masterVariant?.prices?.[0]?.value?.centAmount
//                                                             ? (
//                                                                   products.masterVariant?.prices?.[0]?.value
//                                                                       ?.centAmount / 100
//                                                               ).toFixed(2)
//                                                             : Number(0).toFixed(2)}
//                                                     </span>{' '}
//                                                     $
//                                                 </span>
//                                                 {products.masterVariant?.prices?.[0]?.discounted?.value.centAmount ? (
//                                                     <span className="discount-wrapper">
//                                                         New price:{' '}
//                                                         <span className="product-price-discount">
//                                                             {(
//                                                                 products.masterVariant?.prices?.[0]?.discounted?.value
//                                                                     .centAmount / 100
//                                                             ).toFixed(2)}
//                                                         </span>{' '}
//                                                         $
//                                                     </span>
//                                                 ) : (
//                                                     ''
//                                                 )}
//                                             </div>
//                                         </>
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                         <div className={`modal ${modalActive ? 'visible' : 'hidden'}`}>
//                             <div className="modal-content">
//                                 <div
//                                     className="close-modal"
//                                     onClick={() => {
//                                         setModalActive(!modalActive);
//                                     }}
//                                 ></div>
//                                 <div className="modal-img">
//                                     <button
//                                         className="btn-prev-modal"
//                                         onClick={(): void => {
//                                             modalCarousel?.current?.slidePrev();
//                                         }}
//                                     ></button>
//                                     <button
//                                         className="btn-next-modal"
//                                         onClick={(): void => {
//                                             modalCarousel?.current?.slideNext();
//                                         }}
//                                     ></button>
//                                     <AliceCarousel
//                                         key="carousel-modal"
//                                         mouseTracking
//                                         disableDotsControls
//                                         disableButtonsControls
//                                         items={items}
//                                         responsive={responsive}
//                                         activeIndex={carousel?.current?.state?.activeIndex}
//                                         ref={modalCarousel}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </>
//         );
//     }
// }

import { useEffect, useState, useRef, ReactNode, useContext } from 'react';
// import { tokenClient } from '../../apiSdk/TokenClient';
// import { anonUser } from '../../apiSdk/anonimClient';
import { ProductData } from '@commercetools/platform-sdk';
import { Navigate } from 'react-router-dom';
import Loader from '../../components/Loader/loader';
import { CustomToast } from '../../components/Toast';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './product.css';
import Crumbs from '../../components/Crumbs/Crumbs';
import { baseClient } from '../../apiSdk/BaseClient';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { GlobalContext } from '../../context/Global';
import { tokenClient } from '../../apiSdk/TokenClient';
import { anonUser } from '../../apiSdk/anonimClient';
import { getActualCart } from '../../apiSdk/Cart';
import BtnLoader from '../../components/Loader/btnLoader';

const responsive = {
    0: {
        items: 1,
        itemsFit: 'fill',
    },
    390: {
        items: 1,
        itemsFit: 'fill',
    },
    600: {
        items: 1,
        itemsFit: 'fill',
    },
    1024: {
        items: 1,
        itemsFit: 'fill',
    },
    1200: {
        items: 1,
        itemsFit: 'fill',
    },
};

type ApiError = {
    statusCode: number;
    message: string;
};

export default function Product() {
    const currentUrl = String(window.location.href);
    const slash = currentUrl.lastIndexOf('/');
    const id = currentUrl.slice(slash + 1, currentUrl.length);
    const [products, setProducts] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<ReactNode[]>([]);
    const [modalActive, setModalActive] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carousel = useRef<AliceCarousel>(null);
    const modalCarousel = useRef<AliceCarousel>(null);
    const { cart, setCart } = useContext(GlobalContext);
    const [cartProducts, setCartProducts] = useState(cart?.lineItems);
    const [isInCart, setIsInCart] = useState(false);
    const [btnLoader, setBtnLoader] = useState(false);

    useEffect(() => {
        setCartProducts(cart?.lineItems);
        const inCart = cartProducts?.some((tour) => tour.name['en-US'] === products?.name['en-US']);
        setIsInCart(Boolean(inCart));
    }, [cart, cartProducts, products?.name]);

    useEffect(() => {
        const fetcher = async () => {
            try {
                const userToken = localStorage.getItem('userToken');
                // const client = localStorage.getItem('isLogin') && userToken ? tokenClient() : anonUser();
                const client = baseClient();
                const response = await client
                    .products()
                    .withId({ ID: id })
                    .get({
                        headers: userToken ? { Authorization: `Bearer ${JSON.parse(userToken).token}` } : {},
                    })
                    .execute();

                const productData: ProductData = response.body.masterData.current;
                setProducts(productData);
                setLoading(false);
            } catch (err) {
                const error = err as ApiError;
                setLoading(false);
                if (error.statusCode === 404) {
                    CustomToast('error', 'Product not found');
                } else if (error.statusCode === 401 || error.statusCode === 403) {
                    CustomToast('error', 'Authentication or authorization error');
                } else {
                    CustomToast('error', 'An error occurred, please try again later');
                }
            }
        };

        fetcher();
    }, [id]);

    useEffect(() => {
        if (products) {
            const masterVariant = products?.masterVariant?.images || [];
            const variantImages = products?.variants?.[0]?.images || [];
            const allImages = masterVariant.concat(variantImages);
            const items = allImages.map((image, index) => (
                <img
                    key={index}
                    className={modalActive ? 'modal-img' : 'product-img'}
                    src={image.url}
                    alt={`${index}`}
                    onClick={() => handleImageClick(index)}
                />
            ));
            setItems(items);
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            });
        }
    }, [products, modalActive]);

    const handleImageClick = (index: number) => {
        setCurrentIndex(index);
        setModalActive(true);
    };
    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains('btn-prev-modal') && !target.classList.contains('btn-next-modal'))
            setModalActive(false);
    };

    const handleAddBtnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.currentTarget.setAttribute('disabled', 'true');
        setBtnLoader(true);
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
                            productId: id,
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
            })
            .catch(() => {
                setBtnLoader(false);
            });
    };

    const renderContent = () => (
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
                                    {items.length === 1 ? (
                                        <div className="product-img">{items}</div>
                                    ) : (
                                        <div className="slider-main-wrapper">
                                            <AliceCarousel
                                                disableDotsControls
                                                disableButtonsControls
                                                items={items}
                                                ref={carousel}
                                                activeIndex={currentIndex}
                                                infinite={true}
                                            />
                                            {items.length > 1 && (
                                                <div className="slider-controls">
                                                    <button
                                                        className="btn-prev"
                                                        onClick={() => carousel.current?.slidePrev()}
                                                    ></button>
                                                    <button
                                                        className="btn-next"
                                                        onClick={() => carousel.current?.slideNext()}
                                                    ></button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="product-title">
                                        {products.name['en-US'] || <Navigate to="/not-found" />}
                                    </div>
                                    <div className="product-description">
                                        {products.description?.['en-US'] || 'Not provided!'}
                                    </div>
                                    <div className="bottom-area">
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
                                                              products.masterVariant?.prices?.[0]?.value.centAmount /
                                                              100
                                                          ).toFixed(2)
                                                        : Number(0).toFixed(2)}
                                                </span>{' '}
                                                $
                                            </span>
                                            {products.masterVariant?.prices?.[0]?.discounted?.value.centAmount && (
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
                                            )}
                                        </div>
                                        <button
                                            onClick={handleAddBtnClick}
                                            disabled={isInCart}
                                            className={
                                                !isInCart
                                                    ? 'button add-to-cart-btn'
                                                    : 'button add-to-cart-btn add-to-cart-btn-disabled'
                                            }
                                        >
                                            {btnLoader && <BtnLoader />}
                                            {isInCart ? 'In Cart' : 'Add'}
                                            <MdOutlineAddShoppingCart />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className={`modal ${modalActive ? 'visible' : 'hidden'}`}>
                        <div className="modal-content">
                            <div className="close-modal" onClick={() => setModalActive(false)}></div>
                            <div
                                className="modal-img"
                                onClick={(e) => {
                                    handleCloseModal(e);
                                }}
                            >
                                {items.length > 1 && (
                                    <>
                                        <button
                                            className="btn-prev-modal"
                                            onClick={() => modalCarousel.current?.slidePrev()}
                                        ></button>
                                        <button
                                            className="btn-next-modal"
                                            onClick={() => modalCarousel.current?.slideNext()}
                                        ></button>
                                    </>
                                )}
                                <AliceCarousel
                                    disableDotsControls
                                    disableButtonsControls
                                    items={items}
                                    animationType="fadeout"
                                    animationDuration={500}
                                    responsive={responsive}
                                    ref={modalCarousel}
                                    activeIndex={currentIndex}
                                    onSlideChanged={({ item }) => setCurrentIndex(item)}
                                    infinite={true}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );

    return renderContent();
}
