import { Routes, Route } from "react-router-dom"
import SignupForm from "./pages/signup"
import Login from "./pages/login"
import Home from "./pages/home"
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
