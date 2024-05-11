import { Button, Text, Img } from './..';

export default function Header() {
    return (
        <header className="navbar">
            <a href="/">
                <Img src="images/img_header_logo.svg" alt="header logo" className="logo" />
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
                <a href="/login">
                    <Button className="button">Login</Button>
                </a>
                <a href="/registration">
                    <Button className="button">Sign Up</Button>
                </a>
            </div>
        </header>
    );
}
