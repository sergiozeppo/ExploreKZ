import { Link, useNavigate } from 'react-router-dom';
import { Button, Img } from './..';
// import { Text } from './..';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/Global';
import { baseClient } from '../../apiSdk/BaseClient';

export default function Header() {
    const { isLogin, setIsLogin } = useContext(GlobalContext);
    const [loginStatus, setLoginStatus] = useState(isLogin);
    const navigate = useNavigate();
    useEffect(() => {
        setLoginStatus(isLogin);
    }, [isLogin]);

    const handleLogout = () => {
        baseClient()
            .products()
            .get()
            .execute()
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
        localStorage.clear();
        setIsLogin(false);
        navigate('/');
    };

    return (
        <header className="navbar">
            <Link to="/">
                <Img src="../src/assets/images/logo.png" alt="header logo" className="logo" />
            </Link>
            <ul className="nav">
                <li>
                    <Link to="/">
                        {/* <Text as="p" className="nav-item">
                            Home
                        </Text> */}
                    </Link>
                </li>
            </ul>
            <div className="buttons">
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
        </header>
    );
}
