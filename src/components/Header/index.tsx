import { Button, Text, Img } from './..';

export default function Header() {
    return (
        <header className="navbar">
            <a href="/">
                <Img src="/images/header_logo.svg" alt="header logo" className="logo" />
            </a>
            <ul className="nav">
                <li>
                    <a href="/">
                        <Text as="p" className="nav-item">
                            Home
                        </Text>
                    </a>
                </li>
            </ul>
            <div className="buttons">
                <Button className="button">Login</Button>
                <Button className="button">Sign Up</Button>
            </div>
        </header>
    );
}
