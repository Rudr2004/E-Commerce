import Navbar from "./components/Navbar"
//import Sidebar from "./components/Sidebar"
import { Routes, Route } from "react-router-dom"
import AddItems from "./pages/AddItems"
import ListItems from "./pages/ListItems"
import Home from "./pages/Home"
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddItems />} />
        <Route path="/list" element={<ListItems />} />
      </Routes>
    </>
  )
}

export default App
