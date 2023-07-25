import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        tc: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === "checkbox" ? checked : value;

        setFormData({
            ...formData,
            [name]: inputValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.status === "success") {
                // Registration successful, do something (e.g., redirect to dashboard)
                navigateTo("/");
            } else {
                // Registration failed, handle the error (e.g., display error message)
                console.log(data.message);
            }
        } catch (error) {
            // Handle any API request errors here
            console.error("Error during signup:", error);
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="tc"
                            checked={formData.tc}
                            onChange={handleChange}
                        />
                        Accept Terms and Conditions
                    </label>
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
