//import React from "react";
import Banner from "../assets/footer-pattern.png";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaLocationArrow,
    FaMobileAlt,
} from "react-icons/fa";

const BannerImg = {
    backgroundImage: `url(${Banner})`,
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
};

const FooterLinks = [
    {
        title: "Home",
        link: "/",
    },
    {
        title: "About",
        link: "/#about",
    },
    {
        title: "Contact",
        link: "/#contact",
    },
    {
        title: "Mail us",
        link: "/#blog",
    },
];

const Footer = () => {
    return (
        <div style={BannerImg} className="text-white bg-gray-900">
            <div className="container mx-auto p-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {/* company details */}
                    <div className="py-8 px-4 md:col-span-1 lg:col-span-1 xl:col-span-1">
                        <h1 className="text-3xl font-bold mb-3">Shop Ease</h1>
                        <p className="text-sm md:text-md lg:text-lg xl:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum in beatae ea recusandae blanditiis veritatis.</p>
                    </div>

                    {/* Footer Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:col-span-1 lg:col-span-1 xl:col-span-1">
                        <div>
                            <div className="py-8 px-4">
                                <h1 className="text-xl font-bold mb-3">Important Links</h1>
                                <ul className="flex flex-col gap-3">
                                    {FooterLinks.map((link) => (
                                        <li
                                            className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200 text-sm md:text-md lg:text-lg xl:text-xl"
                                            key={link.title}
                                        >
                                            <span>{link.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className="py-8 px-4">
                                <h1 className="text-xl font-bold mb-3">Links</h1>
                                <ul className="flex flex-col gap-3">
                                    {FooterLinks.map((link) => (
                                        <li
                                            className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200 text-sm md:text-md lg:text-lg xl:text-xl"
                                            key={link.title}
                                        >
                                            <span>{link.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* social links */}
                    <div className="py-8 px-4  md:col-span-1 lg:col-span-1 xl:col-span-1">
                        <div className="flex items-center gap-3 mt-6">
                            <a href="#" className="text-3xl">
                                <FaInstagram />
                            </a>
                            <a href="#" className="text-3xl">
                                <FaFacebook />
                            </a>
                            <a href="#" className="text-3xl">
                                <FaLinkedin />
                            </a>
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center gap-3">
                                <FaLocationArrow />
                                <p className="text-sm md:text-md lg:text-lg xl:text-xl">Ahmedabad, Gujarat</p>
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <FaMobileAlt />
                                <p className="text-sm md:text-md lg:text-lg xl:text-xl">+91 1234567890</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;