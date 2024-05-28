import { useEffect, useRef, useState } from 'react';
import { tokenClient } from '../../apiSdk/TokenClient';
import { anonUser } from '../../apiSdk/anonimClient';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Card } from '../../components/ProductCard/Card';
import './catalog.css';
import Loader from '../../components/Loader/loader';
import { CustomToast } from '../../components/Toast';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

interface QUERYARGS {
    [key: string]: string[];
}

export default function Catalog() {
    const [products, setProducts] = useState<ProductProjection[]>([]);
    const [loading, setLoading] = useState(true);
    const [currItem, setCurrItem] = useState('All');
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);

    const [open, setOpen] = useState(false);
    const [priceRangeOpen, setPriceRangeOpen] = useState(false);

    const filterRef = useRef<HTMLDivElement>(null);
    const priceFilterRef = useRef<HTMLDivElement>(null);

    const getProducts = (filter: string, minPrice: number | null, maxPrice: number | null) => {
        setLoading(true);
        const userToken = localStorage.getItem('userToken');
        const client = localStorage.getItem('isLogin') && userToken ? tokenClient() : anonUser();

        const queryArgs: QUERYARGS = { filter: [] };
        if (filter === 'Tours') {
            queryArgs.filter.push('categories.id:subtree("2eb7506a-8e2b-41c0-934a-27beb1e6d056")');
        } else if (filter === 'Adventures') {
            queryArgs.filter.push('categories.id:subtree("f7b72444-abd3-4bfa-82b6-473cb991c907")');
        }

        if (minPrice !== null || maxPrice !== null) {
            let priceFilter = '';
            if (minPrice !== null && maxPrice !== null) {
                priceFilter = `variants.prices.value.centAmount:range(${minPrice * 100} to ${maxPrice * 100})`;
            } else if (minPrice !== null) {
                priceFilter = `variants.prices.value.centAmount:range(${minPrice * 100} to *)`;
            } else if (maxPrice !== null) {
                priceFilter = `variants.prices.value.centAmount:range(* to ${maxPrice * 100})`;
            }
            queryArgs.filter.push(priceFilter);
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
        getProducts(currItem, minPrice, maxPrice);
    }, [currItem, minPrice, maxPrice]);

    const handleClick = () => {
        setOpen(!open);
        if (!open) {
            setPriceRangeOpen(false);
        }
    };
    const handleFilterItem = (e: React.MouseEvent<HTMLUListElement>) => {
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
        if (!priceRangeOpen) {
            setOpen(false);
        }
    };

    const handlePriceFilter = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const target = e.target as HTMLLIElement;
        const currentIndex = target.getAttribute('id');
        if (currentIndex !== null && !target.classList.contains('price-menu')) {
            switch (currentIndex) {
                case '0':
                    setMinPrice(1);
                    setMaxPrice(50);
                    break;
                case '1':
                    setMinPrice(50);
                    setMaxPrice(100);
                    break;
                case '2':
                    setMinPrice(100);
                    setMaxPrice(150);
                    break;
                case '3':
                    setMinPrice(150);
                    setMaxPrice(300);
                    break;
                case '4':
                    setMinPrice(300);
                    setMaxPrice(null);
                    break;
                default:
                    setMinPrice(null);
                    setMaxPrice(null);
                    break;
            }
            setPriceRangeOpen(!priceRangeOpen);
        }
    };

    const resetFilters = () => {
        setCurrItem('All');
        setMinPrice(null);
        setMaxPrice(null);
        setOpen(false);
        setPriceRangeOpen(false);
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                filterRef.current &&
                !filterRef.current.contains(event.target as Node) &&
                priceFilterRef.current &&
                !priceFilterRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
                setPriceRangeOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <>
            <div className="filter-area">
                <div className="filter-title" onClick={handleClick} ref={filterRef}>
                    {currItem}
                    {open ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                    {open && (
                        <ul className="filter-menu" onClick={(e) => handleFilterItem(e)}>
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
                <div className="price-filter" onClick={(e) => handlePrice(e)} ref={priceFilterRef}>
                    {`${minPrice || 'All'} - ${maxPrice || 'All'} USD`}
                    {priceRangeOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                    {priceRangeOpen && (
                        <div className="price-menu" onClick={(e) => handlePriceFilter(e)}>
                            <div className="range-area">
                                <ul>
                                    <li className="filter-item" id="0">
                                        1 - 50
                                    </li>
                                    <li className="filter-item" id="1">
                                        50 - 100
                                    </li>
                                    <li className="filter-item" id="2">
                                        100 - 150
                                    </li>
                                    <li className="filter-item" id="3">
                                        150 - 300
                                    </li>
                                    <li className="filter-item" id="4">
                                        Over 300
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <button className="button reset-btn" onClick={resetFilters}>
                Reset
            </button>
            {loading ? (
                <Loader />
            ) : (
                <div className="catalog-wrapper">
                    {products.length > 0 ? (
                        products.map((el) => {
                            const imageUrl = el.masterVariant?.images?.[0]?.url || '';
                            const price = el.masterVariant?.prices?.[0]?.value?.centAmount ?? 0;
                            const discount = el.masterVariant?.prices?.[0]?.discounted?.value.centAmount ?? 0;
                            const discountFixed = discount / 100;
                            const fixedPrice = price / 100;
                            return (
                                <Card
                                    key={el.id}
                                    images={imageUrl}
                                    name={el.name['en-US']}
                                    description={el.description?.['en-US'] || 'Not provided!'}
                                    price={fixedPrice}
                                    discount={discountFixed}
                                />
                            );
                        })
                    ) : (
                        <span className="nothing-title"> Nothing Found!</span>
                    )}
                </div>
            )}
        </>
    );
}
