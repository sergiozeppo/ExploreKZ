import { Img } from '../Img';
import { Text } from '../Text';

export default function Footer() {
    return (
        <footer className={`footer`}>
            <div className="footer-container">
                <div className="footer-logo-section">
                    <Img src="/images/logo.png" alt="footer logo" className="logo" />
                    <Text as="p" className="appetitus">
                        © 2024 Created by Scientia Appetitus team
                    </Text>
                </div>
                <div className="sitemap">
                    <div className="sitemap-col">
                        <Text as="h6" className="sitemap-col-heading">
                            Company
                        </Text>
                        <ul className="sitemap-col-ul">
                            <li>
                                <a href="#">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        About us
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Jobs" target="_blank" rel="noreferrer">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        Jobs
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        List your property
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Partnership" target="_blank" rel="noreferrer">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        Partnership
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Advertising" target="_blank" rel="noreferrer">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        Advertising
                                    </Text>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="sitemap-col">
                        <Text as="h6" className="sitemap-col-heading">
                            Explore
                        </Text>
                        <ul className="sitemap-col-ul">
                            <li>
                                <a href="#">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        About us
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Jobs" target="_blank" rel="noreferrer">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        Jobs
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        List your property
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Partnership" target="_blank" rel="noreferrer">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        Partnership
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Advertising" target="_blank" rel="noreferrer">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        Advertising
                                    </Text>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="sitemap-col">
                        <Text as="h6" className="sitemap-col-heading">
                            Term and Policies
                        </Text>
                        <ul className="sitemap-col-ul">
                            <li>
                                <a href="#">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        About us
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Jobs" target="_blank" rel="noreferrer">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        Jobs
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        List your property
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Partnership" target="_blank" rel="noreferrer">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        Partnership
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Advertising" target="_blank" rel="noreferrer">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        Advertising
                                    </Text>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="sitemap-col">
                        <Text as="h6" className="sitemap-col-heading">
                            Help
                        </Text>
                        <ul className="sitemap-col-ul">
                            <li>
                                <a href="#">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        About us
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Jobs" target="_blank" rel="noreferrer">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        Jobs
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        List your property
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Partnership" target="_blank" rel="noreferrer">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        Partnership
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Advertising" target="_blank" rel="noreferrer">
                                    <Text as="p" className="sitemap-col-ul-item">
                                        Advertising
                                    </Text>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="get-touch">
                    <div className="get-touch-div">
                        <Text as="h6" className="sitemap-col-heading">
                            Get in touch
                        </Text>
                        <a href="#" className="feedback">
                            <Text as="p" className="sitemap-col-ul-item">
                                Question or feedback?
                            </Text>
                        </a>
                        <Text as="p" className="sitemap-col-ul-item-mt">
                            We’d love to hear from you
                        </Text>
                        <div className="socials">
                            <Img src="/images/instagram_fill.svg" alt="instagram icon" className="socials-icon" />
                            <Img src="/images/twitter_fill.svg" alt="twitter icon" className="socials-icon" />
                            <Img src="/images/linkedin_fill.svg" alt="linkedin icon" className="socials-icon" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
