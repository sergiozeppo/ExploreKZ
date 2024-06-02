import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './crumbs.css';
import { productIdData } from '../ProductCard/productIdData';

interface Breadcrumb {
    label: string;
    url: string;
}

const Crumbs = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

    useEffect(() => {
        const segments = location.pathname.split('/').filter((segment) => segment);
        const updatedBreadcrumbs: Breadcrumb[] = [{ label: 'home', url: '/' }];
        let path = '';
        segments.forEach((segment) => {
            path += `/${segment}`;
            updatedBreadcrumbs.push({ label: segment, url: path });
        });
        setBreadcrumbs(updatedBreadcrumbs);
    }, [location]);

    return (
        <div className="crumbs">
            {breadcrumbs.map((breadcrumb, index) => (
                <span
                    key={breadcrumb.label}
                    className={index !== breadcrumbs.length - 1 ? 'crumbs-item' : 'crumbs-item-last'}
                >
                    <Link to={breadcrumb.url}>
                        {productIdData[breadcrumb.label] ? productIdData[breadcrumb.label].name : breadcrumb.label}
                    </Link>
                    {index < breadcrumbs.length - 1 && ' / '}
                </span>
            ))}
        </div>
    );
};

export default Crumbs;
