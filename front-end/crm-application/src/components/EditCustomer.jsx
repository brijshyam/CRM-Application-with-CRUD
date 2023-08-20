import React from "react";

function EditCustomer({ editCustomerData }) {
    console.log(editCustomerData);
    const updateCutomerHandler = () => {};
    return (
        <div className="form-container">
            <h1>Edit Customer</h1>
            <input type="text" name="name" value={editCustomerData.name} />
            <input type="text" name="email" value={editCustomerData.email} />
            <input
                type="text"
                name="address"
                value={editCustomerData.address}
            />
            <input type="text" name="mobile" value={editCustomerData.mobile} />
            <button onClick={updateCutomerHandler}>Update</button>
        </div>
    );
}

export default EditCustomer;
