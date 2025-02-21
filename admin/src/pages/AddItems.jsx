import { useState } from 'react';

const ADD_ITEM_MUTATION = `
  mutation AddItem($product: ProductInput!) {
    createproduct(product: $product) {
      id
      name
      description
      price
      category
    }
  }
`;

const AddItem = () => {
    const [item, setItem] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'price') {
            setItem({ ...item, [name]: parseInt(value) });
        } else {
            setItem({ ...item, [name]: value });
        }
    };

    const handleUploadPhoto = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const base64Image = reader.result;
            setItem((prev) => {
                return {
                    ...prev,
                    image: base64Image,
                };
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: ADD_ITEM_MUTATION,
                    variables: {
                        product: {
                            name: item.name,
                            description: item.description,
                            price: item.price,
                            category: item.category,
                            image: item.image,
                        }
                    },
                }),
            });

            const data = await response.json();
            if (data.errors) {
                setError(data.errors[0].message);
            } else if (data.data.createproduct) {
                console.log('Item added successfully');
            } else {
                setError('Failed to add item');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center mt-5">
            <div className="flex flex-col items-center p-8 w-full max-w-lg bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-lg">
                <h2 className="text-white text-2xl font-semibold mb-4">Add New Item</h2>
                <form className="w-full bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                    <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={handleUploadPhoto}
                    />
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
                    <button type="submit" className="cursor-pointer w-full bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300" disabled={loading}>
                        {loading ? 'Adding...' : 'ADD ITEM'}
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default AddItem;