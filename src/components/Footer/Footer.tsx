import { Text } from '../Text';

export default function Footer() {
    return (
        <footer className={`footer`}>
            <div className="footer-container">
                <div className="footer-logo-section">
                    <Text as="p" className="appetitus">
                        © 2024 Created by Scientia Appetitus team
                    </Text>
                </div>
            </div>
        </footer>
    );
}
