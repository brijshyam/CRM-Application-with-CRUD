import React from "react";

function ViewModal({ viewCustomerData, setViewCustomerData }) {
    // console.log(viewCustomerData);
    function closeModal() {
        setViewCustomerData("");
    }
    return (
        <div className="form-container">
            <div className="modal-content">
                <h2>Details of {viewCustomerData.name}</h2>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>{viewCustomerData.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Contact: </td>
                            <td>{viewCustomerData.mobile}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{viewCustomerData.email}</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>{viewCustomerData.address}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
}

export default ViewModal;
