import { Routes, Route } from "react-router-dom"
import SignupForm from "./pages/signup"
import Login from "./pages/login"
import Home from "./pages/home"
import Navbar from "./components/Navbar"
function App() {


  return (
    <>


      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes >
    </>
  )
}

export default App
