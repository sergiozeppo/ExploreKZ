import { Link } from 'react-router-dom';
import { Img, Text } from '../../components';
import DownloadApp from '../../components/DownloadApp';

export default function Home() {
    return (
        <>
            {/* main layout section */}
            <div className="container">
                <div className="wrapper ">
                    <div className="main-content">
                        {/* hero section */}
                        <div className="hero-section">
                            <video className="enjoy-video" autoPlay loop muted playsInline>
                                {' '}
                                <source src="video/hero.mp4" type="video/mp4" />{' '}
                            </video>
                            <div className="header-wrapper">
                                <div className="title-block">
                                    <div className="tagline">
                                        <Text as="h1" className="h1">
                                            It Matters Who You Travel With
                                        </Text>
                                        <Text as="h2" className="h2">
                                            We want you to feel confident in the travel experience you will have with
                                            us.
                                        </Text>
                                    </div>
                                </div>
                                <Img src="images/img_rectangle.png" alt="gradient" className="hero-gradient" />
                            </div>
                        </div>
                        <div className="link-wrapper sale-banner">
                            <span className="h2 sale-title">Summer Sale</span>
                            <span className="h2 sale-title">
                                Discount 30%{' '}
                                <img
                                    className="sale-banner-icon"
                                    src="/images/icons8-discount-48.png"
                                    alt="discount-icon"
                                />
                            </span>
                            <Link to="/catalog/discounted" className="button banner-link">
                                <span className="h2">Go</span>
                            </Link>
                        </div>
                        {/* app download section */}
                        <DownloadApp />
                    </div>
                </div>
            </div>
        </>
    );
}
