import Navbar from "./components/Navbar"
//import Sidebar from "./components/Sidebar"
import { Routes, Route } from "react-router-dom"
import AddItems from "./pages/AddItems"
import ListItems from "./pages/ListItems"
import { Toaster } from "react-hot-toast"
function App() {

  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<AddItems />} />
        <Route path="/list" element={<ListItems />} />
      </Routes>
    </>
  )
}

export default App
