import { useState } from "react";
import { assets } from "../assets/assets.js";

const AddItems = () => {
    const [item, setItem] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setItem({ ...item, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `
            mutation addProduct($product: ProductInput!){
                 createproduct(product: $product){
                    name
                    description
                    price
                    category
  }
}
          `,
                    variables: { product: setItem },
                }),
            });

            const data = await response.json();
            console.log(data);
            if (data) {
                alert("Product Added Successfully");
            }
            else {
                alert("Failed to add product");
            }
        } catch (e) {
            console.log("Error", e);
            alert("Error")
        }

    }

    return (
        <div className="flex justify-center items-center mt-5">
            <div className="flex flex-col items-center p-8 w-full max-w-lg bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-lg">
                <h2 className="text-white text-2xl font-semibold mb-4">Add New Item</h2>
                <form className="w-full bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                    <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
                    <label htmlFor="image" className="mb-2 cursor-pointer flex justify-center items-center border-2 border-dashed border-gray-300 p-3 rounded-lg hover:bg-gray-100">
                        <img src={item.image ? URL.createObjectURL(item.image) : assets.upload_area} alt="Upload Preview" className="w-32 h-32 object-cover" />
                    </label>
                    <input type="file" id="image" accept="image/*" className="hidden" onChange={handleImageChange} />

                    <input
                        type="text"
                        name="name"
                        placeholder="Item Name"
                        value={item.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <textarea
                        name="description"
                        placeholder="Item Description"
                        value={item.description}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Item Price"
                        value={item.price}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={item.category}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button type="submit" className="cursor-pointer w-full bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                        ADD ITEM
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;
