import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import banner2 from "../assets/banner2.png";
import banner1 from "../assets/banner1.png";
import banner3 from "../assets/banner3.png";
import { GET_ALL_PRODUCT } from "../graphql/mutation";

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [products, setProducts] = useState([]);  // Fetch products from database
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    const images = [banner2, banner1, banner3];

    // Auto-slide banner images
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!isPaused) {
                setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
            }
        }, 3000);

        return () => clearInterval(intervalId);
    }, [isPaused, images]);

    const handlePause = () => setIsPaused(true);
    const handleResume = () => setIsPaused(false);
    const handleLineClick = (index) => setActiveIndex(index);

    // Fetch products from database
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        query: GET_ALL_PRODUCT,
                    }),
                });

                const data = await response.json();
                if (data?.data?.products) {
                    setProducts(data.data.products);
                } else {
                    console.error("Invalid data received from API");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false)
            }
        };

        fetchProducts();
    }, []);

    // Navigate to Product Details page
    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <>
            {/* Banner Section */}
            <div className="flex flex-col bg-white rounded-md shadow-sm m-4 cursor-pointer relative">
                <img src={images[activeIndex]} alt="banner" className="w-full" />
                <div onMouseOver={handlePause} onMouseOut={handleResume} className="w-full h-full absolute top-0 left-0" />
                <div className="flex justify-center top-1">
                    {images.map((_, index) => (
                        <div key={index} className={`w-8 h-1 m-2 transition duration-300 ${activeIndex === index ? 'bg-black' : 'bg-gray-300'}`} onClick={() => handleLineClick(index)} />
                    ))}
                </div>
            </div>

            {/* Product List Section */}
            <div className="container mx-auto p-4 mt-4 bg-white shadow-md border-gray-400 rounded-md ">
                <h2 className="text-2xl font-semibold mb-4">All Products</h2>

                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    </div>) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="p-4 border rounded shadow hover:shadow-lg cursor-pointer"
                                onClick={() => handleProductClick(product.id)}
                            >
                                <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded-md" />
                                <h3 className="text-xl font-semibold">{product.name}</h3>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="text-lg font-bold text-black">₹{product.price}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
