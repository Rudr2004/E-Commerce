import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const payment = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        document.title = "Payment | Checkout";
        const storedOrder = JSON.parse(localStorage.getItem("currentOrder"));

        if (storedOrder) {
            setOrder(storedOrder);
            setTotalPrice(storedOrder.price * storedOrder.quantity);
        } else {
            setTimeout(() => navigate("/checkout"), 2000);
        }
    }, [navigate]);


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-3xl w-full p-8 bg-white shadow-xl rounded-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Secure Payment</h2>

                {/* Success Popup */}
                {showSuccess && (
                    <div className="fixed top-10 right-10 bg-green-500 text-white p-4 rounded-lg shadow-lg transition-transform animate-bounce">
                        ✅ Payment Successful!
                    </div>
                )}

                {/* Error Popup */}
                {showError && (
                    <div className="fixed top-10 right-10 bg-red-500 text-white p-4 rounded-lg shadow-lg transition-transform animate-bounce">
                        ❌ Payment Failed. Try Again!
                    </div>
                )}

                {/* Order Details */}
                {order && (
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-700">Order Summary</h3>
                        <div className="flex items-center mt-3">
                            <img src={order.imageUrl} alt={order.name} className="w-20 h-20 object-cover rounded-md border" />
                            <div className="ml-4">
                                <p className="text-gray-800 font-semibold">{order.name}</p>
                                <p className="text-gray-600">Price: ₹{order.price} × {order.quantity}</p>
                                <p className="text-gray-900 font-bold mt-2">Total: ₹{totalPrice}</p>
                            </div>
                        </div>
                    </div>
                )}
                {/* Back to Checkout Button */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate("/checkout")}
                        className="text-blue-600 font-medium hover:text-blue-700 transition duration-300 cursor-pointer"
                    >
                        ← Back to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default payment;
