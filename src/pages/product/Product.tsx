import { useEffect, useState } from 'react';
import { tokenClient } from '../../apiSdk/TokenClient';
import { anonUser } from '../../apiSdk/anonimClient';
import { ProductData } from '@commercetools/platform-sdk';
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
    // product: CARD_PROPS
    const currentUrl = String(window.location.href);
    const slash = currentUrl.lastIndexOf('/');
    const id = currentUrl.slice(slash + 1, currentUrl.length);
    console.log(id);
    console.log(currentUrl, slash);
    // return <div>Products {id}</div>;
    const [products, setProducts] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState(true);

    // const { createClient } = require('@commercetools/sdk-client');
    // const { createAuthMiddlewareForClientCredentialsFlow } = require('@commercetools/sdk-middleware-auth');
    // const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http');
    // const { createApiBuilderFromCtpClient } = require('@commercetools/platform-sdk');

    // const projectKey = '{projectKey}';
    // const clientId = '{clientId}';
    // const clientSecret = '{clientSecret}';
    // const scope = '{scope}';
    // const authUrl = 'https://auth.{region}.commercetools.com';
    // const apiUrl = 'https://api.{region}.commercetools.com';
    // const productId = '{productId}';

    // const client = createClient({
    //     middlewares: [
    //         createAuthMiddlewareForClientCredentialsFlow({
    //             host: authUrl,
    //             projectKey,
    //             credentials: {
    //                 clientId,
    //                 clientSecret,
    //             },
    //             scopes: [scope],
    //         }),
    //         createHttpMiddleware({ host: apiUrl }),
    //     ],
    // });

    // const apiRoot = createApiBuilderFromCtpClient(client);

    // apiRoot
    //     .withProjectKey({ projectKey })
    //     .products()
    //     .withId({ ID: productId })
    //     .get()
    //     .execute()
    //     .then((response) => {
    //         console.log(response.body); // The product data
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });

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
                        setLoading(false);
                        CustomToast('error', 'Server problem!');
                    });
            }
        } else {
            console.log('anonim flow');
            anonUser()
                .productProjections()
                .withId({ ID: id })
                .get()
                .execute()
                .then((res) => {
                    console.log(res);
                    const response: ProductProjection[] = res.body.results;
                    setProducts(response);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                    CustomToast('error', 'Server problem!');
                });
        }
    }, []);

    return (
        <>
            <p className="tempr">Products</p>
            {loading ? (
                <Loader />
            ) : (
                <div className="catalog-wrapper">
                    {
                        console.log(products)
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
