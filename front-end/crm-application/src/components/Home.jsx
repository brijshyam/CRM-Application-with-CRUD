import React, { useState, useEffect } from "react";
import TableRenderer from "./TableRenderer";
import ViewModal from "./ViewModal";

function Home({ setEditCustomerData }) {
    const [isLogged, setIsLogged] = useState(false);
    const [totalCustomer, setTotalCustomer] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        mobile: "",
        email: "",
        address: "",
    });
    const [viewCustomerData, setViewCustomerData] = useState("");

    useEffect(() => {
        fetchCustomers();
    }, []);

    async function fetchCustomers() {
        try {
            const res = await fetch(
                "https://crm-backend-ohfa.onrender.com/api/customers"
            );
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await res.json();
            setTotalCustomer(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function addCustomer() {
        console.log(newCustomer);
        try {
            const res = await fetch(
                "https://crm-backend-ohfa.onrender.com/api/customers",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newCustomer),
                }
            );
            if (!res.ok) {
                throw new Error("Failed to add customer");
            }
            // Clear the newCustomer state
            setNewCustomer({
                name: "",
                mobile: "",
                email: "",
                address: "",
            });
            // Update the customer list after addition
            fetchCustomers();
        } catch (error) {
            console.error(error);
        }
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNewCustomer((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    async function deleteCustomer(customerId) {
        try {
            const res = await fetch(
                `https://crm-backend-ohfa.onrender.com/api/customers/${customerId}`,
                {
                    method: "DELETE",
                }
            );
            if (!res.ok) {
                throw new Error("Failed to delete customer");
            }
            // Update the customer list after deletion
            fetchCustomers();
        } catch (error) {
            console.error(error);
        }
    }

    function viewCustomer(customerId) {
        // Make an API call to fetch the specific customer data
        fetch(
            `https://crm-backend-ohfa.onrender.com/api/customers/${customerId}`
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch customer data");
                }
                return res.json();
            })
            .then((customerData) => {
                setViewCustomerData(customerData);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function handleUpdateCustomer(customerId) {
        // Make an API call to fetch the existing customer data
        fetch(
            `https://crm-backend-ohfa.onrender.com/api/customers/${customerId}`
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch customer data");
                }
                return res.json();
            })
            .then((customerData) => {
                // Display a modal or form with the existing customer data for editing
                console.log("Edit customer data:", customerData);
                // Set the editCustomerData state with the existing customer data
                setEditCustomerData({
                    name: customerData.name,
                    mobile: customerData.mobile,
                    email: customerData.email,
                    address: customerData.address,
                });
                // Open the modal or form for editing
                setIsModalOpen(true);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    if (!isLogged) {
        return (
            <>
                {viewCustomerData !== "" ? (
                    <ViewModal
                        viewCustomerData={viewCustomerData}
                        setViewCustomerData={setViewCustomerData}
                    />
                ) : (
                    <TableRenderer
                        totalCustomer={totalCustomer}
                        newCustomer={newCustomer}
                        handleInputChange={handleInputChange}
                        handleUpdateCustomer={handleUpdateCustomer}
                        addCustomer={addCustomer}
                        viewCustomer={viewCustomer}
                        deleteCustomer={deleteCustomer}
                    />
                )}
            </>
        );
    } else {
        return (
            <div>
                <button onClick={() => setIsLogged(false)}>Logout</button>
            </div>
        );
    }
}

export default Home;
