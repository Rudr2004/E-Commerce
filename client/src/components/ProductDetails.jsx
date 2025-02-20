import { useEffect, useState } from 'react';
import generateImageUrl from "./cloudinary.jsx"

const ProductDetails = ({ productId }) => {
    const [product, setProduct] = useState(null);

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
                  name
                  description
                  price
                  image {
                    publicId
                  }
                }
              }
            `,
                        variables: { id: productId },
                    }),
                });

                const data = await response.json();
                if (data?.data?.product) {
                    const productData = data.data.product;
                    const imageUrl = generateImageUrl(productData.image.publicId, {
                        width: 400,
                        height: 400,
                        crop: 'fill',
                    });
                    setProduct({ ...productData, imageUrl });
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
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto p-4 mt-4 bg-white shadow-md border-gray-400 rounded-md">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-lg">{product.description}</p>
            <p className="text-lg font-semibold">Price: ₹{product.price}</p>
            <img src={product.imageUrl} alt={product.name} />
        </div>
    );
};

export default ProductDetails;