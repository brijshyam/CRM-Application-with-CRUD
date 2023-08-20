import "./App.css";
import { useState } from "react";
import Home from "./components/Home";
import LoginPage from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import EditCustomer from "./components/EditCustomer";

function App() {
    const token = localStorage.getItem("loginToken");
    const [editCustomerData, setEditCustomerData] = useState();
    const [editedCutomerData, setEditedCutomerData] = useState();
    console.log("i am logging token ", token);
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                setEditCustomerData={setEditCustomerData}
                                editedCutomerData={editedCutomerData}
                            />
                        }
                    />
                    <Route
                        path="/edit-cutomer-details"
                        element={
                            <EditCustomer
                                editCustomerData={editCustomerData}
                                setEditedCutomerData={setEditedCutomerData}
                            />
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
