import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

interface Breadcrumb {
    label: string;
    url: string;
}

const Crumbs = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

    useEffect(() => {
        const segments = location.pathname.split('/').filter((segment) => segment);
        const updatedBreadcrumbs: Breadcrumb[] = [{ label: 'all', url: '/catalog' }];
        let path = '';
        segments.forEach((segment) => {
            path += `/${segment}`;
            updatedBreadcrumbs.push({ label: segment, url: path });
        });
        setBreadcrumbs(updatedBreadcrumbs);
    }, [location]);

    return (
        <div>
            {breadcrumbs.map((breadcrumb, index) => (
                <span key={breadcrumb.label}>
                    <Link to={breadcrumb.url}>{breadcrumb.label}</Link>
                    {index < breadcrumbs.length - 1 && ' > '}
                </span>
            ))}
        </div>
    );
};

export default Crumbs;
