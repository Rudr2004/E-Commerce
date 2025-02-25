import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { LIST_ITEM, REMOVE_ITEM_MUTATION } from "../graphql/mutation";
import toast from "react-hot-toast";

const ListItems = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        query: LIST_ITEM
                    }),
                });
                const data = await response.json();
                if (data?.data?.products) {
                    setProducts(data.data.products);

                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleRemoveProduct = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: REMOVE_ITEM_MUTATION,
                    variables: { id }
                }),
            });

            const data = await response.json();

            if (data?.data?.removeproduct) {
                setProducts(products.filter(product => product.id !== id));
                toast.success("Removed Successfully")
            } else {
                console.error("Error removing product:", data.errors);
                toast.error("Error to Remove")
            }
        } catch (error) {
            console.error("Request failed:", error);
        }
    };


    return (
        <div className="container mx-auto p-6 mt-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Admin Panel - Manage Products</h2>

            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="px-4 py-2">Image</th>
                                <th className="px-4 py-2">Product Name</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b text-center cursor-pointer hover:bg-gray-100">
                                    <td className="px-4 py-2">
                                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mx-auto rounded-md" />
                                    </td>
                                    <td className="px-4 py-2">{product.name}</td>
                                    <td className="px-4 py-2">{product.description}</td>
                                    <td className="px-4 py-2 font-bold text-blue-600">₹{product.price}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            className="bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer hover:bg-red-700 transition flex items-center mx-auto"
                                            onClick={() => handleRemoveProduct(product.id)}
                                        >
                                            <FaTrash className="mr-1" /> Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ListItems;
