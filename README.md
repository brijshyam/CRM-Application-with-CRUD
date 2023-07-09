# CRM Application

This is a CRM (Customer Relationship Management) application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The CRM application helps businesses manage their customer interactions, track leads, and improve customer service.

Please note that the JWT (JSON Web Tokens) authentication is not fully implemented in this version of the application.

## Installation

1. Clone the repository:

2. Navigate to the project directory:

3. Install the dependencies for the server:

4. Install the dependencies for the client:

## Configuration

1. Create a `.env` file in the `backend` directory.
2. Add the following environment variables to the `.env` file:

Replace `<your-mongodb-uri>` with your MongoDB connection string and `<your-jwt-secret>` with a secret key for JWT token generation.

## Usage

1. Start the server:

2. Start the client:

3. Open your browser and visit `http://localhost:3000` to access the CRM application.

## Features

-   Add Customer: Enter customer details and click the "Add Customer" button to add a new customer to the CRM.
-   Delete Customer: Click the "Delete" button next to a customer to delete the customer from the CRM.
-   Update Customer: Click the "Edit" button next to a customer to update the customer's information in a modal.
-   View Customer: Click the "View" button next to a customer to view the customer's details in a modal.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please create a new issue or submit a pull request.

## License

This project is licensed under the MIT License. Please note that this project is provided as-is without any warranty. Use at your own risk.
