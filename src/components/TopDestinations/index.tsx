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
                        <div className="flex gap-[34px] md:flex-col">
                            <div className="relative h-[273px] w-full md:h-auto">
                                <Img src="images/img_image_6.png" alt="image six" className="top-dest-horizontal-img" />
                                <div className="absolute bottom-[0.00px] left-0 right-0 m-auto w-full rounded-[14px] bg-gradient pb-[15px] pl-[29px] pr-[42px] md:pr-5 sm:px-5">
                                    <div className="flex flex-col items-start gap-[7px]">
                                        <Text as="p" className="w-full top-dest-item-place leading-[33px]">
                                            Hokokuji Bamboo Forest
                                        </Text>
                                        <Text as="p" className="top-dest-item-place">
                                            Kamakura, Japan
                                        </Text>
                                    </div>
                                </div>
                            </div>
                            <div className="relative h-[273px] w-full md:h-auto">
                                <Img
                                    src="images/img_image_5.png"
                                    alt="image five"
                                    className="top-dest-horizontal-img"
                                />
                                <div className="absolute bottom-[0.00px] left-0 right-0 m-auto flex w-full flex-col items-start gap-1 rounded-[14px] bg-gradient px-[29px] pb-1.5 pt-4 sm:px-5">
                                    <Text as="p" className="top-dest-item-place">
                                        Kirkjufell
                                    </Text>
                                    <Text as="p" className="w-[61%] top-dest-item-place leading-6 md:w-full">
                                        Grundarfjordur&#39;s, Iceland
                                    </Text>
                                </div>
                            </div>
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
