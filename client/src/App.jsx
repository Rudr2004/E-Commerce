import { Routes, Route } from "react-router-dom"
import SignupForm from "./pages/signup"
import Login from "./pages/login"
import Home from "./pages/home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { useParams } from "react-router-dom";
import ProductDetails from "./components/ProductDetails"
function App() {


  return (
    <>


      <Routes>
        <Route path="/register" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetailsWrapper />} />
      </Routes >
      <Footer />
    </>
  )
}

const ProductDetailsWrapper = () => {
  const { id } = useParams();
  return <ProductDetails productId={id} />;
};


export default App
