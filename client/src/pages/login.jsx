import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/graphql", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `
            mutation login($login: LoginInput!) {
              login(login: $login) {
                email,
                password
              }
            }
          `,
                    variables: { login: formData },
                }),
            });

            const data = await response.json();

            if (data.error) {
                alert("Retry")
            } else {
                alert("Loggedin")
                localStorage.setItem("token", data.data.login.token);
                setTimeout(() => window.location.href = "/home", 2000);
            }
        } catch {
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md max-w-sm mx-auto">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
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
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
                    <p className="flex justify-center mt-1">Not Registered? <Link to="/" className="text-blue-500 mx-0.5">Register</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;