import { Routes, Route } from "react-router-dom"
import SignupForm from "./pages/signup"
import Login from "./pages/login"
import Home from "./pages/home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
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
      </Routes >
      <Footer />
    </>
  )
}

export default App
