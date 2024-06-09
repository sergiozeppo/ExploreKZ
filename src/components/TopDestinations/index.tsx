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
                                    <Img src="/images/burabai.jpg" alt="Burabai" className="top-dest-horizontal-img" />
                                    <div className="top-dest-item-div">
                                        <Text as="p" className="top-dest-item-name">
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
                                    <Img
                                        src="images/charyn.jpg"
                                        alt="Charyn Canyon"
                                        className="top-dest-horizontal-img"
                                    />
                                    <div className="top-dest-item-div">
                                        <Text as="p" className="top-dest-item-name">
                                            Charyn Canyon
                                        </Text>
                                        <Text as="p" className="top-dest-item-place">
                                            Almaty region
                                        </Text>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="top-dest-items-right">
                        <Link to="/catalog/tours/historical-cultural/0481f7e4-e36f-4129-b576-bdb9f8029310">
                            <div className="top-dest-item">
                                <Img src="images/saraychik.jpg" alt="Saraychik" className="top-dest-top-right" />
                                <div className="top-dest-item-div">
                                    <Text as="p" className="top-dest-item-name">
                                        Saraychik
                                    </Text>
                                    <Text as="p" className="top-dest-item-place">
                                        Atyrau region
                                    </Text>
                                </div>
                            </div>
                        </Link>
                        <Link to="/catalog/adventures/multi-day/230fbab4-4044-4559-8249-6e208671ee0f">
                            <div className="top-dest-item">
                                <Img src="images/zerenda.jpg" alt="Zerenda" className="top-dest-top-right" />
                                <div className="top-dest-item-div">
                                    <Text as="p" className="top-dest-item-name">
                                        Zerenda
                                    </Text>
                                    <Text as="p" className="top-dest-item-place">
                                        Akmola region
                                    </Text>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
