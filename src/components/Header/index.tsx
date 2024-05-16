import { Link } from 'react-router-dom';
import { Button, Text, Img } from './..';

export default function Header() {
    return (
        <header className="navbar">
            <Link to="/">
                <Img src="../src/assets/images/logo.png" alt="header logo" className="logo" />
            </Link>
            <ul className="nav">
                <li>
                    <Link to="/">
                        <Text as="p" className="nav-item">
                            Home
                        </Text>
                    </Link>
                </li>
            </ul>
            <div className="buttons">
                <Link to="/login">
                    <Button className="button">Login</Button>
                </Link>
                <Link to="/registration">
                    <Button className="button">Sign Up</Button>
                </Link>
            </div>
        </header>
    );
}
