import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ productId }) => {
    const [product, setProduct] = useState(null);
    const { addToCart, buyNow, message } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch("http://localhost:8000/graphql", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        query: `
              query GetProduct($id: ID!) {
                product(id: $id) {
                  id
                  name
                  description
                  price
                  #imageUrl
                }
              }
            `,
                        variables: { id: productId },
                    }),
                });

                const data = await response.json();
                if (data?.data?.product) {
                    setProduct(data.data.product);
                } else {
                    console.error("Invalid data received from API");
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (productId) {
            fetchProductDetails();
        }
    }, [productId]);

    if (!product) {
        return <p className="text-center text-lg font-semibold">Loading...</p>;
    }

    const handleBuyNow = () => {
        buyNow(product); // Store the product for checkout
        navigate("/checkout");
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-md relative">
            {message && (
                <div className="absolute top-2 right-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md transition transform scale-95">
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                <div className="flex justify-center">
                    <img
                        src={product.imageUrl || "https://via.placeholder.com/300"}
                        alt={product.name}
                        className="w-80 h-80 object-cover border border-gray-300 rounded-md shadow-md"
                    />
                </div>

                <div className="space-y-4">
                    <h1 className="text-2xl font-semibold">{product.name}</h1>
                    <p className="text-gray-600">{product.description}</p>
                    <h2 className="text-2xl font-bold text-green-600">₹{product.price}</h2>

                    <div className="flex gap-4">
                        <button
                            onClick={handleBuyNow}
                            className="bg-yellow-500 text-white px-6 py-2 rounded-md text-lg font-medium cursor-pointer hover:bg-yellow-600"
                        >
                            Buy Now
                        </button>
                        <button
                            onClick={() => addToCart(product)}
                            className="bg-blue-700 text-white px-6 py-2 rounded-md text-lg font-medium cursor-pointer hover:bg-blue-600"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
