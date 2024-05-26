import { useEffect, useState } from 'react';
import { tokenClient } from '../../apiSdk/TokenClient';
import { anonUser } from '../../apiSdk/anonimClient';
import { ProductData } from '@commercetools/platform-sdk';
import { Navigate } from 'react-router-dom';

// import { Card } from '../../components/ProductCard/Card';
import './product.css';
import Loader from '../../components/Loader/loader';
import { CustomToast } from '../../components/Toast';

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
                    .catch((err) => {
                        console.error(err);
                        // if (err.body.statusCode === 404) {
                        setLoading(false);
                        // }
                        // CustomToast('error', 'Server problem!');
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
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                    CustomToast('error', 'Server problem!');
                });
        }
    }, [id]);

    return (
        <>
            <p className="tempr">Products</p>
            {loading ? (
                <Loader />
            ) : (
                <div className="catalog-wrapper">
                    {
                        <div className="a">
                            {products ? 'Products' : <Navigate to="/error-page" />}
                            {products?.name['en-US']}
                            <div className="a">{products?.description?.['en-US'] || 'Not provided!'}</div>
                        </div>
                        /* {products.map((el) => {
                        const imageUrl = el.masterVariant?.images?.[0]?.url || '';
                        return (
                            <Card
                                key={el.id}
                                id={el.id}
                                images={imageUrl}
                                name={el.name['en-US']}
                                description={el.description?.['en-US'] || 'Not provided!'}
                            />
                        );
                    })} */
                    }
                </div>
            )}
        </>
    );
}
