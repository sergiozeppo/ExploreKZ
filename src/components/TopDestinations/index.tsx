import { Img } from '../Img';
import { Text } from '../Text';

export default function TopDestinations() {
    return (
        <div className="top-dest-cont">
            <Text as="h2" className="top-dest-title">
                Top Most Popular Destinations
            </Text>
            <div className="top-dest-items-wrapper">
                <div className="top-dest-items-col">
                    <div className="top-dest-items-left">
                        <div className="relative h-[273px] md:h-auto">
                            <Img
                                src="images/img_image_3.png"
                                alt="image three"
                                className="h-[273px] w-full rounded-[16px] object-cover"
                            />
                            <div className="absolute bottom-[0.00px] left-0 right-0 m-auto flex w-full flex-col items-start gap-[7px] rounded-[14px] bg-gradient pb-7 pl-[62px] pr-14 pt-[15px] md:px-5 sm:pb-5">
                                <Text as="p" className="!font-poppins">
                                    Moraine Lake
                                </Text>
                                <Text as="p" className="!font-poppins">
                                    Alberta, Canada
                                </Text>
                            </div>
                        </div>
                        <div className="flex gap-[34px] md:flex-col">
                            <div className="relative h-[273px] w-full md:h-auto">
                                <Img
                                    src="images/img_image_6.png"
                                    alt="image six"
                                    className="h-[273px] w-full rounded-[16px] object-cover"
                                />
                                <div className="absolute bottom-[0.00px] left-0 right-0 m-auto w-full rounded-[14px] bg-gradient pb-[15px] pl-[29px] pr-[42px] md:pr-5 sm:px-5">
                                    <div className="flex flex-col items-start gap-[7px]">
                                        <Text as="p" className="w-full !font-poppins leading-[33px]">
                                            Hokokuji Bamboo Forest
                                        </Text>
                                        <Text as="p" className="!font-poppins">
                                            Kamakura, Japan
                                        </Text>
                                    </div>
                                </div>
                            </div>
                            <div className="relative h-[273px] w-full md:h-auto">
                                <Img
                                    src="images/img_image_5.png"
                                    alt="image five"
                                    className="h-[273px] w-full rounded-[16px] object-cover"
                                />
                                <div className="absolute bottom-[0.00px] left-0 right-0 m-auto flex w-full flex-col items-start gap-1 rounded-[14px] bg-gradient px-[29px] pb-1.5 pt-4 sm:px-5">
                                    <Text as="p" className="!font-poppins">
                                        Kirkjufell
                                    </Text>
                                    <Text as="p" className="w-[61%] !font-poppins leading-6 md:w-full">
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
