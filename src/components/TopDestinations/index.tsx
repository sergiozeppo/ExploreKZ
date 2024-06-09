import { Img } from '../Img';
import { Text } from '../Text';
import { Link } from 'react-router-dom';

export default function TopDestinations() {
    return (
        <div className="top-dest-cont">
            <Text as="h2" className="top-dest-title">
                Top Most Popular Destinations
            </Text>
            <div className="top-dest-items-wrapper">
                <div className="top-dest-items-col">
                    <div className="top-dest-items-left">
                        <Link to="/catalog/adventures/multi-day/d74c4ce0-cd13-470a-b716-99474483df00">
                            <div className="top-dest-top-left">
                                <Img src="/images/kolsay.jpg" alt="Kolsay lakes" className="top-dest-horizontal-img" />
                                <div className="top-dest-item-div">
                                    <Text as="p" className="top-dest-item-name">
                                        Kolsai Lake
                                    </Text>
                                    <Text as="p" className="top-dest-item-place">
                                        Almaty region
                                    </Text>
                                </div>
                            </div>
                        </Link>
                        <div className="top-dest-items-left-bottom">
                            <Link to="/catalog/adventures/multi-day/d0f9a002-b4c9-4a71-ba43-d96e614bde81">
                                <div className="top-dest-bottom-left">
                                    <Img
                                        src="/images/burabai.jpg"
                                        alt="image six"
                                        className="top-dest-horizontal-img"
                                    />
                                    <div className="top-dest-item-div">
                                        <Text as="p" className="w-full top-dest-item-name leading-[33px]">
                                            Burabai
                                        </Text>
                                        <Text as="p" className="top-dest-item-place">
                                            Akmola region
                                        </Text>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/catalog/adventures/one-day/c0dac2f5-430d-4faa-95c4-3abcecefe85d">
                                <div className="top-dest-bottom-left">
                                    <Img src="images/charyn.jpg" alt="image five" className="top-dest-horizontal-img" />
                                    <div className="top-dest-item-div">
                                        <Text as="p" className="top-dest-item-name">
                                            Charyn Canyon
                                        </Text>
                                        <Text as="p" className="w-[61%] top-dest-item-place leading-6 md:w-full">
                                            Almaty region
                                        </Text>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="flex w-full gap-[34px] md:flex-col">
                        {/* {[...Array(2)].map((d, index) => (
                            <LandingPagePic
                                userimage="images/img_image_7.png"
                                titletext="Cappadocia"
                                descriptiontext="<>Anatolia, <br />Turkey</>"
                                key={'landingPageList' + index}
                            />
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
    );
}
