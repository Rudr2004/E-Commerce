import { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { cart } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const storedLoginState = localStorage.getItem("isLoggedIn");
        if (storedLoginState === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false");
        window.location.href = "/login";
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const categories = [
        { id: 1, image: "https://rukminim2.flixcart.com/flap/80/80/image/ab7e2b022a4587dd.jpg?q=100", name: "Home & Furniture" },
        { id: 2, image: "https://rukminim2.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100", name: "Mobile" },
        { id: 3, image: "https://rukminim2.flixcart.com/fk-p-flap/80/80/image/0d75b34f7d8fbcb3.png?q=100", name: "Fashion" },
        { id: 4, image: "https://rukminim2.flixcart.com/flap/80/80/image/dff3f7adcf3a90c6.png?q=100", name: "Beauty, Toys & More" },
        { id: 5, image: "https://rukminim2.flixcart.com/flap/80/80/image/69c6589653afdb9a.png?q=100", name: "Electronics" },
        { id: 6, image: "https://rukminim2.flixcart.com/fk-p-flap/80/80/image/0139228b2f7eb413.jpg?q=100", name: "Appliances" },
        { id: 7, image: "https://rukminim2.flixcart.com/fk-p-flap/80/80/image/fc40c9436e5aa480.png?q=100", name: "Flight Bookings" },
        { id: 8, image: "https://rukminim2.flixcart.com/flap/80/80/image/29327f40e9c4d26b.png?q=100", name: "Kilos" },
        { id: 9, image: "https://rukminim2.flixcart.com/fk-p-flap/80/80/image/05d708653beff580.png?q=100", name: "Two Wheelers" },
    ];

    return (
        <>
            {/* Upper Navbar */}
            <nav className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-3 px-6 flex justify-between items-center shadow-md">
                {/* Left: Logo */}
                <Link to="/">
                    <div className="text-2xl font-bold">ShopEase</div>
                </Link>

                {/* Mobile Menu Toggle */}
                <button onClick={toggleMenu} className="md:hidden text-white text-2xl">
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Desktop Search Bar */}
                <div className="hidden md:flex bg-white rounded-md px-3 py-2 w-1/3 shadow-sm items-center">
                    <input
                        type="text"
                        placeholder="Search for products, brands and more"
                        className="w-full px-2 py-1 text-gray-700 focus:outline-none"
                    />
                    <button className="text-blue-500 px-2">
                        <FaSearch size={18} />
                    </button>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-6">
                    {isLoggedIn ? (
                        <button
                            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md font-medium shadow-sm cursor-pointer"
                            onClick={handleLogout}
                        >
                            <FaUser size={18} />
                            <span>Logout</span>
                        </button>
                    ) : (
                        <Link to="/login">
                            <button
                                className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-md font-medium shadow-sm cursor-pointer"
                                onClick={handleLogin}
                            >
                                <FaUser size={18} />
                                <span>Log In</span>
                            </button>
                        </Link>
                    )}

                    {/* Cart Icon with Count */}
                    <Link to="/cart" className="relative">
                        <button className="flex items-center space-x-2 cursor-pointer">
                            <FaShoppingCart size={22} />
                            <span>Cart</span>

                            {/* Show Cart Count if Items Exist */}
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </Link>
                </div>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-md p-4">
                    {isLoggedIn ? (
                        <button
                            className="w-full flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md font-medium shadow-sm"
                            onClick={handleLogout}
                        >
                            <FaUser size={18} />
                            <span>Logout</span>
                        </button>
                    ) : (
                        <Link to="/login">
                            <button
                                className="w-full flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium shadow-sm"
                                onClick={handleLogin}
                            >
                                <FaUser size={18} />
                                <span>Log In</span>
                            </button>
                        </Link>
                    )}

                    {/* Mobile Search Bar */}
                    <div className="flex bg-gray-200 rounded-md px-3 py-2 mt-2">
                        <input
                            type="text"
                            placeholder="Search for products"
                            className="w-full px-2 py-1 text-gray-700 focus:outline-none"
                        />
                        <button className="text-blue-500 px-2">
                            <FaSearch size={18} />
                        </button>
                    </div>

                    {/* Cart Link */}
                    <Link to="/cart" className="block mt-4 text-lg font-medium">
                        🛒 Cart {cart.length > 0 && `(${cart.length})`}
                    </Link>
                </div>
            )}

            {/* Lower Navbar (Category Scroll) */}
            <div className="flex overflow-x-auto bg-white rounded-md shadow-sm p-4 space-x-6 gap-10">
                {categories.map((category) => (
                    <div key={category.id} className="flex flex-col items-center min-w-[80px]">
                        <img src={category.image} alt={category.name} className="w-12 h-12" />
                        <p className="text-sm font-semibold">{category.name}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Navbar;
