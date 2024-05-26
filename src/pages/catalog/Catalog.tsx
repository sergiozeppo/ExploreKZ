import { useEffect, useState } from 'react';
import { tokenClient } from '../../apiSdk/TokenClient';
import { anonUser } from '../../apiSdk/anonimClient';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Card } from '../../components/ProductCard/Card';
import './catalog.css';
import Loader from '../../components/Loader/loader';
import { CustomToast } from '../../components/Toast';
export default function Catalog() {
    const [products, setProducts] = useState<ProductProjection[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('isLogin')) {
            const userToken = localStorage.getItem('userToken');
            if (userToken) {
                tokenClient()
                    .productProjections()
                    .get({
                        headers: {
                            Authorization: `Bearer ${JSON.parse(userToken).token}`,
                        },
                    })
                    .execute()
                    .then((res) => {
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
        } else {
            console.log('anonim flow');
            anonUser()
                .productProjections()
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
            <p className="tempr">Catalog</p>
            {loading ? (
                <Loader />
            ) : (
                <div className="catalog-wrapper">
                    {products.map((el) => {
                        const imageUrl = el.masterVariant?.images?.[0]?.url || '';
                        const price = el.masterVariant?.prices?.[0]?.value?.centAmount ?? 0;
                        const discount = el.masterVariant?.prices?.[0]?.discounted?.value.centAmount ?? 0;
                        const discountFixed = discount / 100;
                        const fixedPice = price / 100;
                        return (
                            <Card
                                key={el.id}
                                id={el.id}
                                images={imageUrl}
                                name={el.name['en-US']}
                                description={el.description?.['en-US'] || 'Not provided!'}
                                price={fixedPice}
                                discount={discountFixed}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
}
