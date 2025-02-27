import { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN_MUTATION } from "../graphql/mutation";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState({ type: "", text: "" });
    const [showMessage, setShowMessage] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: LOGIN_MUTATION,
                    variables: { login: formData },
                }),
            });

            const data = await response.json();

            if (data.error) {
                setMessage({ type: "error", text: "Invalid email or password" });
                setShowMessage(true);
            } else {
                setMessage({ type: "success", text: "Logged in successfully" });
                setShowMessage(true);
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("token", data.data.login.token);
                setTimeout(() => window.location.href = "/", 2000);
            }
        } catch {
            setMessage({ type: "error", text: "An error occurred. Please try again." });
            setShowMessage(true);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md max-w-sm mx-auto">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {showMessage && (
                    <div
                        className={`${message.type === "success" ? "bg-green-100" : "bg-red-100"
                            } text-${message.type === "success" ? "green" : "red"}-700 p-2 mb-4 rounded`}
                    >
                        {message.text}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="w-full">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mb-3 border rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mb-3 border rounded"
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Login
                    </button>
                    <p className="flex justify-center mt-1">
                        Not Registered? <Link to="/register" className="text-blue-500 mx-0.5">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;