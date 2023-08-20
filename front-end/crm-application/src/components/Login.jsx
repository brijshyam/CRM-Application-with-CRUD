import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigateTo = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Send a request to the server to authenticate the user
        try {
            const response = await fetch("http://localhost:5000/api/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // User is authenticated, save the JWT token to local storage but for some reason it is not working..
                const { token } = await response.json();
                console.log(token);
                localStorage.setItem("loginToken", token);
                navigateTo("/");
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login Page</h2>
            <form onSubmit={handleLogin} className="form-element">
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
