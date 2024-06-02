import { Link } from 'react-router-dom';
import Burger from '../Burger/Burger';
import { Img } from '../Img';

export default function Header() {
    return (
        <header className="navbar">
            <Link to="/">
                <Img src="/images/logo.png" alt="header logo" className="logo" />
            </Link>
            <Burger />
        </header>
    );
}
