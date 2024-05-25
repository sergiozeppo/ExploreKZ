// import { useEffect, useState } from 'react';
// import { tokenClient } from '../../apiSdk/TokenClient';
// import { anonUser } from '../../apiSdk/anonimClient';
// import { ProductSelection } from '@commercetools/platform-sdk';
// import { Card } from '../../components/ProductCard/Card';
// import './catalog.css';
// import Loader from '../../components/Loader/loader';
// import { CustomToast } from '../../components/Toast';

// import { useSearchParams } from 'react-router-dom';

type CARD_PROPS = {
    id: string;
    name?: string;
    description?: string;
    images?: string;
    price?: number;
    descount?: number;
};

export default function Product(product: CARD_PROPS) {
    const currentUrl = String(window.location.href);
    const slash = currentUrl.lastIndexOf('/');
    const id = currentUrl.slice(slash + 1, currentUrl.length);
    console.log(id);
    console.log(currentUrl, slash);
    return <div>Products {product.id}</div>;
    // const [products, setProducts] = useState<ProductSelection[]>([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     if (localStorage.getItem('isLogin')) {
    //         const userToken = localStorage.getItem('userToken');
    //         if (userToken) {
    //             tokenClient()
    //                 .products()
    //                 .get({
    //                     headers: {
    //                         Authorization: `Bearer ${JSON.parse(userToken).token}`,
    //                     },
    //                 })
    //                 .execute()
    //                 .then((res) => {
    //                     const response: ProductSelection[] = res.body.results;
    //                     setProducts(response);
    //                     setLoading(false);
    //                 })
    //                 .catch((err) => {
    //                     console.error(err);
    //                     setLoading(false);
    //                     CustomToast('error', 'Server problem!');
    //                 });
    //         }
    //     } else {
    //         console.log('anonim flow');
    //         anonUser()
    //             .productProjections()
    //             .get()
    //             .execute()
    //             .then((res) => {
    //                 console.log(res);
    //                 const response: ProductProjection[] = res.body.results;
    //                 setProducts(response);
    //                 setLoading(false);
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //                 setLoading(false);
    //                 CustomToast('error', 'Server problem!');
    //             });
    //     }
    // }, []);

    // return (
    //     <>
    //         <p className="tempr">Products</p>
    //         {loading ? (
    //             <Loader />
    //         ) : (
    //             <div className="catalog-wrapper">
    //                 {products.map((el) => {
    //                     const imageUrl = el.masterVariant?.images?.[0]?.url || '';
    //                     return (
    //                         <Card
    //                             key={el.id}
    //                             id={el.id}
    //                             images={imageUrl}
    //                             name={el.name['en-US']}
    //                             description={el.description?.['en-US'] || 'Not provided!'}
    //                         />
    //                     );
    //                 })}
    //             </div>
    //         )}
    //     </>
    // );
}
