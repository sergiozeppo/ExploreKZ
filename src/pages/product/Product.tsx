import { useEffect, useState } from 'react';
import { tokenClient } from '../../apiSdk/TokenClient';
import { anonUser } from '../../apiSdk/anonimClient';
import { ProductData } from '@commercetools/platform-sdk';
import { Navigate } from 'react-router-dom';

// import { Card } from '../../components/ProductCard/Card';
import './product.css';
import Loader from '../../components/Loader/loader';
import { CustomToast } from '../../components/Toast';
import { Img } from '../../components';

// import { useSearchParams } from 'react-router-dom';

// type CARD_PROPS = {
//     id: string;
//     name?: string;
//     description?: string;
//     images?: string;
//     price?: number;
//     descount?: number;
// };

export default function Product() {
    const currentUrl = String(window.location.href);
    const slash = currentUrl.lastIndexOf('/');
    const id = currentUrl.slice(slash + 1, currentUrl.length);
    console.log(id);
    console.log(currentUrl, slash);
    const [products, setProducts] = useState<ProductData>();
    const [loading, setLoading] = useState(true);

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
                    {
                        <>
                            <div className="product">
                                <Img
                                    className="product-img"
                                    src={products?.masterVariant?.images?.[0]?.url || ''}
                                    alt={products?.name['en-US'] || ''}
                                />
                                <div className="product-title">
                                    {products ? products?.name['en-US'] : <Navigate to="/not-found" />}
                                </div>
                                <div className="product-description">
                                    {products?.description?.['en-US'] || 'Not provided!'}
                                </div>
                            </div>
                        </>
                    }
                </div>
            )}
        </>
    );
}
