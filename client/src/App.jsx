import { Routes, Route } from "react-router-dom"
import SignupForm from "./pages/signup"
import Login from "./pages/login"
import Home from "./pages/home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ProductDetailsPage from './pages/productDetail';
import CartPage from "./pages/cart"
import CheckoutPage from "./pages/checkout"


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
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes >
      <Footer />
    </>
  )
}

export default App