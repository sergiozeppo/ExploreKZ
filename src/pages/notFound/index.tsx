import { Link } from 'react-router-dom';
import './notFound.css';

export default function NotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found-body">
                <p className="not-found-title">Page not found!</p>
                <span className="jump-title">404</span>
                <p className="not-found-title">Oops! Looks like the page you're looking for does not exist.</p>
                <p className="link-wrapper link-inner">
                    Let's go to
                    <Link to="/" className="signup-link">
                        Home
                    </Link>
                </p>
            </div>
        </div>
    );
}
