import { useState } from "react";
import { Link } from "react-router-dom";
import { SIGNUP_MUTATION } from "../graphql/mutation";
const SignupForm = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: SIGNUP_MUTATION,
                variables: { details: formData }
            })
        });

        const data = await response.json();

        if (data.success) {
            setSuccess("Signup successful");
            localStorage.setItem("token", data.data.signup.token)
            setError(data.errors[0].message);
        } else {
            setSuccess("Signup successful! Redirecting...");
            localStorage.setItem("token", data.data.signup.token);
            setTimeout(() => window.location.href = "/login", 2000);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md max-w-sm mx-auto">
                <h2 className="text-2xl font-bold mb-4">Signup</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <form onSubmit={handleSubmit} className="w-full">
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mb-3 border rounded"
                    />
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
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Signup</button>
                    <p className="flex justify-center mt-1">Already Register? <Link to="/login" className="text-blue-500 mx-0.5">Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;