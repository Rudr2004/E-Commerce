//import React from 'react';
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate()
    const handleAdd = (e) => {
        e.preventDefault()
        navigate('/')
    }
    const handleList = (e) => {
        e.preventDefault()
        navigate('/list')
    }
    return (

        <div className="flex justify-between w-full bg-gradient-to-r from-blue-300 to-blue-400 text-white p-4">
            <h2 className="text-lg font-semibold cursor-pointer">Admin Panel</h2>
            <ul className="flex flex-row gap-8 mr-4 cursor-pointer">
                <li className="hover:text-black" onClick={handleAdd}>Add Items</li>
                <li className="hover:text-black" onClick={handleList}>List Items</li>
            </ul>
        </div>
    );
};

// Export the Navbar component
export default Navbar;