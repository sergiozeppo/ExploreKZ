import { Text } from '../Text';

export default function Footer() {
    return (
        <footer className={`footer`}>
            <div className="footer-container">
                <Text as="p" className="appetitus">
                    © 2024 Created by Scientia Appetitus team
                </Text>
            </div>
        </footer>
    );
}
