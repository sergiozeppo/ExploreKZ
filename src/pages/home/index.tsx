import { Link } from 'react-router-dom';
import { Img, Text } from '../../components';

export default function Home() {
    return (
        <>
            {/* main layout section */}
            <div className="container">
                <div className="wrapper ">
                    <div className="main-content">
                        {/* hero section */}
                        <div className="hero-section">
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
                                        <div className="link-wrapper block-for-2-17">
                                            You can
                                            <Link to="/login" className="signup-link">
                                                login
                                            </Link>
                                            or
                                            <Link to="/registration" className="signup-link">
                                                register!
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <Img src="images/img_rectangle.png" alt="gradient" className="hero-gradient" />
                            </div>
                        </div>
                    </div>
                    {/* footer section */}
                </div>
            </div>
        </>
    );
}
