import { Routes, Route } from "react-router-dom"
import SignupForm from "./pages/signup"
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<SignupForm />} />
      </Routes>
    </>
  )
}

export default App
