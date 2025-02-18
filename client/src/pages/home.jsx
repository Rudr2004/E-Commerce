import { useState, useEffect } from 'react';
import banner2 from "../assets/banner2.png";
import banner1 from "../assets/banner1.png";
import banner3 from "../assets/banner3.png";

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const images = [banner2, banner1, banner3];

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!isPaused) {
                setActiveIndex((activeIndex + 1) % images.length);
            }
        }, 3000);

        return () => clearInterval(intervalId);
    }, [activeIndex, isPaused, images]);

    const handlePause = () => {
        setIsPaused(true);
    };

    const handleResume = () => {
        setIsPaused(false);
    };

    const handleLineClick = (index) => {
        setActiveIndex(index);
    };

    const categories = [
        {
            id: 1,
            image: "https://www.fastrack.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw384df576/images/Fastrack/Catalog/3089SL16_3.jpg?sw=600&sh=600",
            name: "Fastrack Watch",
            price: 1099
        },
        {
            id: 2,
            image: "https://www.gonoise.com/cdn/shop/products/4_2_grande.png?v=1676439601",
            name: "Noise Watch",
            price: 1399
        },
        {
            id: 3,
            image: "https://www.boat-lifestyle.com/cdn/shop/files/2_c74d7f07-c10d-48ad-9da0-5e229499bad7.png?v=1694153692",
            name: "Boat Watch",
            price: 999
        },
        {
            id: 4,
            image: "https://elitehubs.com/cdn/shop/files/in-odyssey-oled-g6-g60sd-ls27dg600swxxl-541957578.png?v=1733735149&width=533",
            name: "Monitors",
            price: 7949
        },
        {
            id: 5,
            image: "https://www.leafstudios.in/cdn/shop/files/1_6b54ff34-acdd-40e6-a08a-f2bfa33a1c7a_800x.png?v=1718706988",
            name: "Wireless Headphones",
            price: 499
        },
        {
            id: 6,
            image: "https://havells.com/media/catalog/product/cache/844a913d283fe95e56e39582c5f2767b/import/TV/55PS850E.jpg",
            name: "Tv",
            price: 29999
        },
    ];

    return (
        <>
            <div className="flex flex-col bg-white rounded-md shadow-sm m-4  cursor-pointer relative">
                <img src={images[activeIndex]} alt="flight booking" className="w-full" />
                <div onMouseOver={handlePause} onMouseOut={handleResume} className="w-full h-full absolute top-0 left-0" />
                <div className="flex justify-center top-1">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`w-8 h-1 m-2 transition duration-300 ${activeIndex === index ? 'bg-black' : 'bg-gray-300'}`}
                            onClick={() => handleLineClick(index)}
                        />
                    ))}
                </div>
            </div>

            <div className="container mx-auto p-4 mt-4">
                <h2 className="text-2xl font-semibold mb-4">Best of Electronics</h2>
                <div className="grid grid-cols-6 gap-3">
                    {categories.slice(0, 6).map((category) => (
                        <div key={category.id} className="flex flex-col px-2">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-20 h-20 rounded-full object-cover mb-2 hover:scale-110 transition duration-300"
                            />
                            <p className="font-semibold text-lg">{category.name}</p>
                            <p className="font-semibold text-lg">From ₹{category.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;