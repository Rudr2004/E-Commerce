import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const { cart, addToCart, removeFromCart, buyNow } = useCart();
    const navigate = useNavigate();

    const handleBuyNow = (item) => {
        buyNow(item); // Store the selected product for checkout
        navigate("/checkout"); // Redirect to checkout
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Shopping Cart</h2>

            {cart.length === 0 ? (
                <p className="text-lg text-gray-500 text-center">Your cart is empty.</p>
            ) : (
                <div className="space-y-6">
                    {cart.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center sm:items-stretch justify-between p-5 border rounded-lg shadow-sm bg-gray-50">
                            {/* Product Image */}
                            <img
                                src={item.image || "https://via.placeholder.com/100"}
                                alt={item.name}
                                className="w-24 h-24 object-cover border border-gray-300 rounded-lg"
                            />

                            {/* Product Details */}
                            <div className="flex-1 text-center sm:text-left sm:ml-6">
                                <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                                <p className="text-gray-700 mt-1">₹{item.price}</p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-lg font-medium cursor-pointer hover:bg-red-600 transition duration-300"
                                >
                                    -
                                </button>
                                <span className="text-lg font-medium">{item.quantity}</span>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="bg-green-500 text-white px-3 py-1 rounded-lg text-lg font-medium cursor-pointer hover:bg-green-600 transition duration-300"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => handleBuyNow(item)}
                                    className="bg-yellow-500 text-white  px-6 py-2 rounded-lg text-lg font-medium hover:bg-yellow-600 transition duration-300 w-full sm:w-auto cursor-pointer">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )
            }
        </div >
    );
};

export default CartPage;
