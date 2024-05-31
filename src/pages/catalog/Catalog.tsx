import { useEffect, useRef, useState } from 'react';
import { tokenClient } from '../../apiSdk/TokenClient';
import { anonUser } from '../../apiSdk/anonimClient';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Card } from '../../components/ProductCard/Card';
import './catalog.css';
import Loader from '../../components/Loader/loader';
import { CustomToast } from '../../components/Toast';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { FaSearch } from 'react-icons/fa';
import Crumbs from '../../components/Crumbs/Crumbs';

type QueryParam = string | string[] | boolean | number | undefined;
interface QUERYARGS {
    [key: string]: QueryParam;
    'text.en'?: string;
    fuzzy?: boolean;
    limit?: number;
    markMatchingVariants?: boolean;
    where?: string;
}

export default function Catalog() {
    const [products, setProducts] = useState<ProductProjection[]>([]);
    const [loading, setLoading] = useState(true);
    const [currItem, setCurrItem] = useState('All');
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);

    const [open, setOpen] = useState(false);
    const [priceRangeOpen, setPriceRangeOpen] = useState(false);
    const [sortType, setSortType] = useState<string | null>(null);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [sortTitle, setSortTitle] = useState('default');
    const filterRef = useRef<HTMLDivElement>(null);
    const priceFilterRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);
    const [searchValue, setSearchValue] = useState('');
    const [triggerSearch, setTriggerSearch] = useState(false);

    const getProducts = (
        filter: string,
        minPrice: number | null,
        maxPrice: number | null,
        sortType: string | null,
        searchValue: string,
    ) => {
        setLoading(true);
        const userToken = localStorage.getItem('userToken');
        const client = localStorage.getItem('isLogin') && userToken ? tokenClient() : anonUser();

        const queryArgs: QUERYARGS = { filter: [] };
        if (Array.isArray(queryArgs.filter)) {
            if (filter === 'Tours') {
                queryArgs.filter.push('categories.id:subtree("5ee12a8a-e438-42b3-81fb-11bd077b67be")');
                // path = 'tours';
            } else if (filter === 'Adventures') {
                queryArgs.filter.push('categories.id:subtree("654294ec-29b6-42e8-9fce-32a3604ce7d4")');
                // path = 'adventures';
            } else if (filter === 'Team building') {
                queryArgs.filter.push('categories.id:"729190e8-2dd7-426b-b54e-0fd66961d63c"');
                // path = 'team-building';
            } else if (filter === 'Historical & cultural') {
                queryArgs.filter.push('categories.id:"a834e793-64a5-4991-a7d8-19fb63c340cf"');
                // path = 'historical-cultural';
            } else if (filter === 'One day') {
                queryArgs.filter.push('categories.id:"2eb7506a-8e2b-41c0-934a-27beb1e6d056"');
                // path = 'one-day';
            } else if (filter === 'Multi-day') {
                queryArgs.filter.push('categories.id:"f7b72444-abd3-4bfa-82b6-473cb991c907"');
                // path = 'multi-day';
            }
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
            if (Array.isArray(queryArgs.filter)) queryArgs.filter.push(priceFilter);
        }
        if (sortType) {
            queryArgs.sort = [sortType];
        }
        if (searchValue) {
            queryArgs['text.en-US'] = searchValue.toLowerCase();
        }

        queryArgs.fuzzy = true;
        queryArgs.markMatchingVariants = true;
        client
            .productProjections()
            .search()
            .get({ queryArgs })
            .execute()
            .then((res) => {
                let response: ProductProjection[] = res.body.results;
                console.log(response);
                if (filter === 'Discounted') {
                    response = response.filter((product) =>
                        product.masterVariant?.prices?.some((price) => price.discounted),
                    );
                }
                if (minPrice && maxPrice) {
                    response = response.filter((product) => product?.masterVariant.isMatchingVariant);
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
        getProducts(currItem, minPrice, maxPrice, sortType, '');
    }, [currItem, minPrice, maxPrice, sortType]);

    useEffect(() => {
        if (triggerSearch) {
            getProducts(currItem, minPrice, maxPrice, sortType, searchValue);
            setTriggerSearch(false);
        }
    }, [triggerSearch, currItem, minPrice, maxPrice, sortType, searchValue]);

    const handleClick = () => {
        setOpen(!open);
        if (!open) {
            setPriceRangeOpen(false);
            setIsSortOpen(false);
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
            setIsSortOpen(false);
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
        setSortTitle('default');
        setSortType(null);
        setIsSortOpen(false);
        setSearchValue('');
        setTriggerSearch(false);
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                filterRef.current &&
                !filterRef.current.contains(event.target as Node) &&
                priceFilterRef.current &&
                !priceFilterRef.current.contains(event.target as Node) &&
                sortRef.current &&
                !sortRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
                setPriceRangeOpen(false);
                setIsSortOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const hanleSort = () => {
        setIsSortOpen(!isSortOpen);
        if (!isSortOpen) {
            setOpen(false);
            setPriceRangeOpen(false);
        }
    };
    const sortHadler = (e: React.MouseEvent<HTMLUListElement>) => {
        e.stopPropagation();
        const target = e.target as HTMLLIElement;
        const targetId = target.getAttribute('id');
        if (targetId) {
            if (targetId === '0') {
                setSortTitle(`Alphabet ${String.fromCharCode(8593)}`);
                setSortType('name.en-US asc');
            }
            if (targetId === '1') {
                setSortTitle(`Alphabet ${String.fromCharCode(8595)}`);
                setSortType('name.en-US desc');
            }
            if (targetId === '2') {
                setSortTitle(`Price ${String.fromCharCode(8593)}`);
                setSortType('price asc');
            }
            if (targetId === '3') {
                setSortTitle(`Price ${String.fromCharCode(8595)}`);
                setSortType('price desc');
            }
            setIsSortOpen(false);
        }
    };
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTriggerSearch(true);
    };
    return (
        <>
            <form className="search-area" onSubmit={handleSearch}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button type="submit" className="search-btn">
                    <FaSearch />
                </button>
            </form>
            <div className="filter-area">
                <div className="filter-title" onClick={handleClick} ref={filterRef}>
                    {currItem}
                    {open ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                    {open && (
                        <ul className="filter-menu" onClick={(e) => handleFilterItem(e)}>
                            <li className="filter-item-all" id="All">
                                All
                            </li>
                            <li className="filter-item" id="Tours">
                                Tours
                            </li>
                            <li className="filter-item-sub" id="Team building">
                                Team building
                            </li>
                            <li className="filter-item-sub" id="Historical & cultural">
                                Historical & cultural
                            </li>
                            <li className="filter-item" id="Adventures">
                                Adventures
                            </li>
                            <li className="filter-item-sub" id="One day">
                                One day
                            </li>
                            <li className="filter-item-sub" id="Multi-day">
                                Multi-day
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
                <div className="sorting" onClick={hanleSort} ref={sortRef}>
                    {`Sort by ${sortTitle}`}
                    {isSortOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                    {isSortOpen && (
                        <ul className="sort-menu" onClick={(e) => sortHadler(e)}>
                            <li className="filter-item" id="0">
                                Alphabet {String.fromCharCode(8593)}
                            </li>
                            <li className="filter-item" id="1">
                                Alphabet {String.fromCharCode(8595)}
                            </li>
                            <li className="filter-item" id="2">
                                Price {String.fromCharCode(8593)}
                            </li>
                            <li className="filter-item" id="3">
                                Price {String.fromCharCode(8595)}
                            </li>
                        </ul>
                    )}
                </div>
            </div>
            <button
                className={
                    currItem !== 'All' || minPrice !== null || maxPrice !== null || sortType
                        ? 'button reset-btn'
                        : 'button reset-btn btn-disabled'
                }
                onClick={resetFilters}
                disabled={!(currItem !== 'All' || minPrice !== null || maxPrice !== null || sortType)}
            >
                Reset
            </button>
            <Crumbs />
            <div className="container-catalog">
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
                                        id={el.id}
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
            </div>
        </>
    );
}
