import { useEffect, useState } from 'react';
import { tokenClient } from '../../apiSdk/TokenClient';
import { anonUser } from '../../apiSdk/anonimClient';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Card } from '../../components/ProductCard/Card';
import './catalog.css';
import Loader from '../../components/Loader/loader';
import { CustomToast } from '../../components/Toast';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

export default function Catalog() {
    const [products, setProducts] = useState<ProductProjection[]>([]);
    const [loading, setLoading] = useState(true);
    const [currItem, setCurrItem] = useState('All');

    const getProducts = (filter: string) => {
        setLoading(true);
        const userToken = localStorage.getItem('userToken');
        const client = localStorage.getItem('isLogin') && userToken ? tokenClient() : anonUser();

        let queryArgs = {};
        if (filter === 'Tours') {
            queryArgs = { filter: 'categories.id:subtree("2eb7506a-8e2b-41c0-934a-27beb1e6d056")' };
        } else if (filter === 'Adventures') {
            queryArgs = { filter: 'categories.id:subtree("f7b72444-abd3-4bfa-82b6-473cb991c907")' };
        }

        client
            .productProjections()
            .search()
            .get({ queryArgs })
            .execute()
            .then((res) => {
                let response: ProductProjection[] = res.body.results;

                if (filter === 'Discounted') {
                    response = response.filter((product) =>
                        product.masterVariant?.prices?.some((price) => price.discounted),
                    );
                }

                setProducts(response);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
                CustomToast('error', 'Server problem!');
            });
    };

    useEffect(() => {
        getProducts(currItem);
    }, [currItem]);

    const [open, setOpen] = useState(false);
    const [priceRangeOpen, setPriceRangeOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const hadleFilterItem = (e: React.MouseEvent<HTMLUListElement>) => {
        e.stopPropagation();
        const target = e.target as HTMLLIElement;
        if (target.getAttribute('id')) {
            setCurrItem(target.getAttribute('id') || 'All');
            setOpen(false);
        }
    };
    const handlePrice = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setPriceRangeOpen(!priceRangeOpen);
    };

    return (
        <>
            <div className="filter-area">
                <div className="filter-title" onClick={handleClick}>
                    {currItem}
                    {open ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                    {open && (
                        <ul className="filter-menu" onClick={(e) => hadleFilterItem(e)}>
                            <li className="filter-item" id="All">
                                All
                            </li>
                            <li className="filter-item" id="Tours">
                                Tours
                            </li>
                            <li className="filter-item" id="Adventures">
                                Adventures
                            </li>
                            <li className="filter-item" id="Discounted">
                                Discounted
                            </li>
                        </ul>
                    )}
                </div>
                <div className="price-filter" onClick={(e) => handlePrice(e)}>
                    Price
                    {priceRangeOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                    {priceRangeOpen && (
                        <div className="price-menu">
                            <div className="range-area">
                                <ul className="price-inputs">
                                    <li className="filter-item" id="All">
                                        0
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
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
