import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import dotenv from "dotenv";
dotenv.config();
const Payment = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const storedOrder = JSON.parse(localStorage.getItem("currentOrder"));

        if (storedOrder) {
            setOrder(storedOrder);
            setTotalPrice(storedOrder.price * storedOrder.quantity);
        } else {
            setTimeout(() => navigate("/checkout"), 2000);
        }
    }, [navigate]);

    return (
        <PayPalScriptProvider options={{ "client-id": import.meta.env.PAYPAL_CLIENT_ID }}>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 md:px-6">
                <div className="w-full max-w-3xl p-6 md:p-8 bg-white shadow-xl rounded-lg">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
                        Secure Payment
                    </h2>

                    {/* Success Popup */}
                    {showSuccess && (
                        <div className="fixed top-10 right-10 bg-green-500 text-white p-4 rounded-lg shadow-lg animate-bounce">
                            Payment Successful!
                        </div>
                    )}

                    {/* Error Popup */}
                    {showError && (
                        <div className="fixed top-10 right-10 bg-red-500 text-white p-4 rounded-lg shadow-lg animate-bounce">
                            Payment Failed. Try Again!
                        </div>
                    )}

                    {/* Order Details */}
                    {order && (
                        <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-700">Order Summary</h3>
                            <div className="flex flex-col md:flex-row items-center mt-3">
                                <img
                                    src={order.image}
                                    alt={order.name}
                                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md border"
                                />
                                <div className="ml-0 md:ml-4 mt-4 md:mt-0 text-center md:text-left">
                                    <p className="text-gray-800 font-semibold">{order.name}</p>
                                    <p className="text-gray-600">
                                        Price: ₹{order.price} × {order.quantity}
                                    </p>
                                    <p className="text-gray-900 font-bold mt-2">
                                        Total: ₹{totalPrice}
                                    </p>
                                </div>
                            </div>

                            {/* PayPal Button */}
                            <div className="mt-6 flex justify-center">
                                <PayPalButtons
                                    style={{ layout: "vertical" }}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: totalPrice.toFixed(2), // Convert to 2 decimal places
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            setShowSuccess(true);
                                            console.log("Payment successful:", details);
                                            setTimeout(() => navigate("/"), 3000);
                                        });
                                    }}
                                    onError={(err) => {
                                        console.error("PayPal Checkout Error:", err);
                                        setShowError(true);
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Back to Cart */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate("/cart")}
                            className="text-blue-600 font-medium hover:text-blue-700 transition duration-300 cursor-pointer"
                        >
                            ← Back to Cart
                        </button>
                    </div>
                </div>
            </div>
        </PayPalScriptProvider>
    );
};

export default Payment;
