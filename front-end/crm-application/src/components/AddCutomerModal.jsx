function AddCutomerModal({
    newCustomer,
    addCustomer,
    handleInputChange,
    setShowAddModal,
}) {
    return (
        <div className="form-container">
            <h1 className="add-customer-header">Add Customer</h1>
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
                    type="text"
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
            <div className="btn-container">
                <button
                    className="action-btn"
                    onClick={() => {
                        addCustomer();
                        setShowAddModal(false);
                    }}
                >
                    Add
                </button>
                <button
                    className="action-btn"
                    onClick={() => setShowAddModal(false)}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default AddCutomerModal;
