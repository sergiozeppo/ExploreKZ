import { useContext, useEffect, useState } from 'react';
import './burger.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Text } from './..';
import { CustomToast } from '../Toast';
import { GlobalContext } from '../../context/Global';
import { token as MyToken } from '../../apiSdk/token';
import { initCartState } from '../../apiSdk/Cart';
import { initAnonId } from '../../apiSdk/anonimClient';

export default function Burger() {
    const [isOpen, setIsOpen] = useState(false);
    const { isLogin, setIsLogin, setCart, cart } = useContext(GlobalContext);
    const [loginStatus, setLoginStatus] = useState(isLogin);
    const navigate = useNavigate();
    const [cartProductCount, setCartProductCount] = useState(0);

    useEffect(() => {
        if (cart && cart?.lineItems && cart?.lineItems?.length > 0) {
            setCartProductCount(cart?.lineItems.length);
        } else {
            setCartProductCount(0);
        }
    }, [cart]);

    useEffect(() => {
        setLoginStatus(isLogin);
    }, [isLogin]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleLogout = async () => {
        localStorage.clear();
        const userToken = MyToken;
        userToken.reset();
        await initAnonId();
        await initCartState();
        const currentCart = localStorage.getItem('user-cart');
        setCart(JSON.parse(currentCart!));
        setIsLogin(false);
        navigate('/');
        CustomToast('info', 'Successful Logged out!');
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    useEffect(() => {
        const handleOutsideClick = (event: Event) => {
            const target = event.target as HTMLElement;
            if (isOpen && !target.closest('.burger-menu')) {
                closeMenu();
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <div className="burger-menu">
            <div className="burger-icon" onClick={toggleMenu}>
                <div className={`line ${isOpen ? 'open' : ''}`}></div>
                <div className={`line ${isOpen ? 'open' : ''}`}></div>
                <div className={`line ${isOpen ? 'open' : ''}`}></div>
            </div>
            <nav className={`menu ${isOpen ? 'open' : ''}`}>
                <ul className="nav">
                    <li>
                        <Link to="/" onClick={closeMenu}>
                            <Text as="p" className="nav-item">
                                Home
                            </Text>
                        </Link>
                    </li>
                    <li>
                        <Link to="/catalog" onClick={closeMenu}>
                            <Text as="p" className="nav-item">
                                Catalog
                            </Text>
                        </Link>
                    </li>
                    {loginStatus && (
                        <li>
                            <Link to="/profile" onClick={closeMenu}>
                                <Text as="p" className="nav-item">
                                    Profile
                                </Text>
                            </Link>
                        </li>
                    )}
                    <li className="cart-link">
                        {cartProductCount > 0 && <span className="cart-indicator">{cartProductCount}</span>}
                        <Link to="/cart" onClick={closeMenu}>
                            <Text as="p" className="nav-item">
                                Cart
                            </Text>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={closeMenu}>
                            <Text as="p" className="nav-item">
                                About Us
                            </Text>
                        </Link>
                    </li>
                </ul>
                <div className="buttons" onClick={closeMenu}>
                    {loginStatus ? (
                        <button className="button" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button className="button">Login</Button>
                            </Link>
                            <Link to="/registration">
                                <Button className="button">Sign Up</Button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}
