import { Img } from '../Img';
import { Text } from '../Text';

export default function Footer() {
    return (
        <footer className={`footer`}>
            <div className="footer-container">
                <div className="footer-logo-section">
                    <Img src="/images/logo.png" alt="footer logo" className="logo" />
                    <Text as="p" className="appetitus leading-[15px] tracking-[0.65px]">
                        © 2024 Created by Scientia Appetitus team
                    </Text>
                </div>
                <div className="ml-[76px] flex flex-1 items-center justify-between gap-5 md:ml-0 md:flex-col md:self-stretch">
                    <div className="flex flex-col gap-[7px]">
                        <Text as="h6" className="!font-bold tracking-[0.80px]">
                            Company
                        </Text>
                        <ul className="flex flex-col gap-[9px]">
                            <li>
                                <a href="#">
                                    <Text as="p" className="tracking-[0.70px]">
                                        About us
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Jobs" target="_blank" rel="noreferrer">
                                    <Text as="p" className="tracking-[0.70px]">
                                        Jobs
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Text as="p" className="tracking-[0.70px]">
                                        List your property
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Partnership" target="_blank" rel="noreferrer">
                                    <Text as="p" className="tracking-[0.70px]">
                                        Partnership
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Advertising" target="_blank" rel="noreferrer">
                                    <Text as="p" className="tracking-[0.70px]">
                                        Advertising
                                    </Text>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-[7px]">
                        <Text as="h6" className="!font-bold tracking-[0.80px]">
                            Explore
                        </Text>
                        <ul className="flex flex-col gap-[9px]">
                            <li>
                                <a href="#">
                                    <Text as="p" className="tracking-[0.70px]">
                                        About us
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Jobs" target="_blank" rel="noreferrer">
                                    <Text as="p" className="tracking-[0.70px]">
                                        Jobs
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Text as="p" className="tracking-[0.70px]">
                                        List your property
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Partnership" target="_blank" rel="noreferrer">
                                    <Text as="p" className="tracking-[0.70px]">
                                        Partnership
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Advertising" target="_blank" rel="noreferrer">
                                    <Text as="p" className="tracking-[0.70px]">
                                        Advertising
                                    </Text>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-[7px]">
                        <Text as="h6" className="!font-bold tracking-[0.80px]">
                            Term and Policies
                        </Text>
                        <ul className="flex flex-col gap-[9px]">
                            <li>
                                <a href="#">
                                    <Text as="p" className="tracking-[0.70px]">
                                        About us
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Jobs" target="_blank" rel="noreferrer">
                                    <Text as="p" className="tracking-[0.70px]">
                                        Jobs
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Text as="p" className="tracking-[0.70px]">
                                        List your property
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Partnership" target="_blank" rel="noreferrer">
                                    <Text as="p" className="tracking-[0.70px]">
                                        Partnership
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Advertising" target="_blank" rel="noreferrer">
                                    <Text as="p" className="tracking-[0.70px]">
                                        Advertising
                                    </Text>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-start gap-[7px]">
                        <Text as="h6" className="!font-bold tracking-[0.80px]">
                            Help
                        </Text>
                        <ul className="flex flex-col items-start gap-[9px]">
                            <li>
                                <a href="#">
                                    <Text as="p" className="tracking-[0.70px]">
                                        About us
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Jobs" target="_blank" rel="noreferrer">
                                    <Text as="p" className="tracking-[0.70px]">
                                        Jobs
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Text as="p" className="tracking-[0.70px]">
                                        List your property
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Partnership" target="_blank" rel="noreferrer">
                                    <Text as="p" className="tracking-[0.70px]">
                                        Partnership
                                    </Text>
                                </a>
                            </li>
                            <li>
                                <a href="Advertising" target="_blank" rel="noreferrer">
                                    <Text as="p" className="tracking-[0.70px]">
                                        Advertising
                                    </Text>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="ml-[50px] flex w-[18%] justify-center md:ml-0 md:w-full">
                    <div className="flex w-full flex-col items-start">
                        <Text as="h6" className="!font-bold tracking-[0.80px]">
                            Get in touch
                        </Text>
                        <a href="#" className="mt-[11px]">
                            <Text as="p" className="tracking-[0.70px]">
                                Question or feedback?
                            </Text>
                        </a>
                        <Text as="p" className="mt-2 tracking-[0.70px]">
                            We’d love to hear from you
                        </Text>
                        <div className="mt-[54px] flex w-[64%] justify-between gap-5 md:w-full">
                            <Img src="/images/instagram_fill.svg" alt="instagram icon" className="h-[24px] w-[24px]" />
                            <Img src="/images/twitter_fill.svg" alt="twitter icon" className="h-[24px] w-[24px]" />
                            <Img src="/images/linkedin_fill.svg" alt="linkedin icon" className="h-[24px] w-[24px]" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
