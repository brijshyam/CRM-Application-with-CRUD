import React, { useState } from "react";
import AddCutomerModal from "./AddCutomerModal";
import { useNavigate } from "react-router-dom";

function TableRenderer({
    totalCustomer,
    newCustomer,
    handleInputChange,
    handleUpdateCustomer,
    addCustomer,
    viewCustomer,
    deleteCustomer,
}) {
    const [showAddModal, setShowAddModal] = useState(false);
    const navigate = useNavigate();

    const addNewCutomerHandler = () => {
        setShowAddModal(true);
    };
    const editClickHandler = () => {
        navigate("/edit-cutomer-details");
    };
    return (
        <>
            {showAddModal ? (
                <AddCutomerModal
                    newCustomer={newCustomer}
                    handleInputChange={handleInputChange}
                    addCustomer={addCustomer}
                    setShowAddModal={setShowAddModal}
                />
            ) : (
                <div className="customer-details-container">
                    <div className="customer-details">
                        <button
                            className="add-customer-btn"
                            onClick={addNewCutomerHandler}
                        >
                            Add Customer
                        </button>
                        <table>
                            <thead>
                                <tr>
                                    <th>Customer Name</th>
                                    <th>Mobile No</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {totalCustomer.map((customer) => (
                                    <tr key={customer._id}>
                                        <td>{customer.name}</td>
                                        <td>{customer.mobile}</td>
                                        <td>{customer.email}</td>
                                        <td>
                                            {customer.address.slice(0, 10)}...
                                        </td>
                                        <td className="btn-row">
                                            <button
                                                className="action-btn"
                                                onClick={() =>
                                                    viewCustomer(customer._id)
                                                }
                                            >
                                                View
                                            </button>
                                            <button
                                                className="action-btn"
                                                onClick={() => {
                                                    handleUpdateCustomer(
                                                        customer._id
                                                    );
                                                    editClickHandler();
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="action-btn"
                                                onClick={() =>
                                                    deleteCustomer(customer._id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

export default TableRenderer;
