import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-900 h-screen text-white p-5">
            <h2 className="text-xl font-bold mb-5">Admin Panel</h2>
            <ul className="space-y-4">
                <li>
                    <Link to="/" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link>
                </li>
                <li>
                    <Link to="/users" className="block p-2 hover:bg-gray-700 rounded">Users</Link>
                </li>
                <li>
                    <Link to="/settings" className="block p-2 hover:bg-gray-700 rounded">Settings</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
