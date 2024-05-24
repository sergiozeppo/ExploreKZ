import { useEffect, useState } from 'react';
import { tokenClient } from '../../apiSdk/TokenClient';
import { anonUser } from '../../apiSdk/anonimClient';
import { ProductProjection } from '@commercetools/platform-sdk';

export default function Catalog() {
    const [products, setProducts] = useState<ProductProjection[]>([]);

    useEffect(() => {
        if (localStorage.getItem('isLogin')) {
            console.log('token flow');
            tokenClient()
                .productProjections()
                .get()
                .execute()
                .then((res) => {
                    const response: ProductProjection[] = res.body.results;
                    setProducts(response);
                })
                .catch((err) => console.error(err));
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
                })
                .catch((err) => console.error(err));
        }
    }, []);

    return (
        <div>
            <p className="tempr">Catalog</p>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name['en-US']}</li>
                ))}
            </ul>
        </div>
    );
}
