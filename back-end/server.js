import express from 'express';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import authenticateToken from "jsonwebtoken"
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect('mongodb://localhost:27017/crm_application', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Customer Schema
const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
});

const Customer = mongoose.model('Customer', customerSchema);

// CORS configuration
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specified HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow specified headers
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' }); // Send a generic error response
});

// Routes
app.get('/api/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve customers' });
    }
});

app.get('/api/customers/:id', async (req, res) => {
    const customerId = req.params.id;

    try {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve customer' });
    }
});

app.post('/api/customers', async (req, res) => {
    const customerData = req.body;

    try {
        const customer = await Customer.create(customerData);
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create customer' });
    }
});

app.put('/api/customers/:id', async (req, res) => {
    const customerId = req.params.id;
    const updatedCustomerData = req.body;

    try {
        const customer = await Customer.findByIdAndUpdate(customerId, updatedCustomerData, {
            new: true,
        });
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update customer' });
    }
});

app.delete('/api/customers/:id', async (req, res) => {
    const customerId = req.params.id;

    try {
        const customer = await Customer.findByIdAndDelete(customerId);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete customer' });
    }
});

/* ========================================= Login and Signup Implementation============================ */
// app.post("/api/signup", async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Check if the username already exists in the database
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(409).json({ error: "Username already exists" });
//         }

//         // Create a new user instance
//         const newUser = new User({
//             username,
//             password,
//         });

//         // Save the new user to the database
//         const savedUser = await newUser.save();

//         // Generate a JWT token for the user
//         const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET);

//         // Return the token and user data in the response
//         res.json({ token, user: savedUser });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// app.get("/api/protected", authenticateToken, (req, res) => {
//     // Access the authenticated user's data using req.user
//     const userId = req.user.userId;

//     // Retrieve the user data from the database
//     User.findById(userId)
//         .then((user) => {
//             if (!user) {
//                 return res.status(404).json({ error: "User not found" });
//             }

//             // Return the user data in the response
//             res.json({ user });
//         })
//         .catch((error) => {
//             console.error(error);
//             res.status(500).json({ error: "Internal Server Error" });
//         });
// });



/* ========================================= Login and Signup Implementation============================ */

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
