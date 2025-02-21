import { useParams } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails';
//import Details from "./Details"

const ProductDetailsPage = () => {
    const { id } = useParams();
    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <ProductDetails productId={id} />
            </div>
        </div>
    );
};

export default ProductDetailsPage;
