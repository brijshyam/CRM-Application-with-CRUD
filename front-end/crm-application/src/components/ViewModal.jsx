import React from "react";

function ViewModal({ viewCustomerData, setViewCustomerData }) {
    console.log(viewCustomerData);
    function closeModal() {
        setViewCustomerData("");
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Customer Details</h2>
                <div>
                    <label>Name:</label>
                    <p>{viewCustomerData.name}</p>
                </div>
                <div>
                    <label>Mobile:</label>
                    <p>{viewCustomerData.mobile}</p>
                </div>
                <div>
                    <label>Email:</label>
                    <p>{viewCustomerData.email}</p>
                </div>
                <div>
                    <label>Address:</label>
                    <p>{viewCustomerData.address}</p>
                </div>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
}

export default ViewModal;
