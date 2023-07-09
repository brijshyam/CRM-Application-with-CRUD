import React from "react";

function TableRenderer({
    totalCustomer,
    newCustomer,
    handleInputChange,
    handleUpdateCustomer,
    addCustomer,
    viewCustomer,
    deleteCustomer,
}) {
    return (
        <div className="customer-details-container">
            <div className="customer-details">
                <div className="input-container">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newCustomer.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="mobile">Mobile:</label>
                    <input
                        type="number"
                        id="mobile"
                        name="mobile"
                        value={newCustomer.mobile}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={newCustomer.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={newCustomer.address}
                        onChange={handleInputChange}
                    />
                </div>
                <button className="add-customer-btn" onClick={addCustomer}>
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
                                <td>{customer.address}</td>
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
                                        onClick={() =>
                                            handleUpdateCustomer(customer._id)
                                        }
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
    );
}

export default TableRenderer;
