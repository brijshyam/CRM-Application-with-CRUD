import express from 'express';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const DB_Password = process.env.DB_PASSWORD;
const DB_User = process.env.MONGO_USER;
const uri = `mongodb+srv://${DB_User}:${DB_Password}@testclustor.vc7ixmr.mongodb.net/?retryWrites=true&w=majority`;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// DB connection 
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("Successfully connected to Atlas!!!"))
    .catch((e) => console.log(e))


// Customer Schema
const customerSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    email: String,
    address: String,
});

const Customer = mongoose.model('Customer', customerSchema);

// For auth User
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    tc: { type: Boolean, required: true, }
});

const userModel = mongoose.model("user", userSchema);

// CORS configuration
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specified HTTP methods
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow specified headers
//     next();
// });
//cors policy 
app.use(cors());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' }); // Send a generic error response
});

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from CRM Backend!'
    })
})

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
app.post("/api/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await userModel.findOne({ email: email });
            if (user !== null) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (user.email === email && isMatch) {
                    //Implementing JWT auth in the application 
                    // Generate JWT token.
                    // i am writing secret key here only but should be kept in .env
                    const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
                    res.send({
                        "status": "success",
                        "message": "Login Successfully",
                        "token": token
                    })
                } else {
                    res.send({
                        "status": "failed",
                        "message": "Either email or password does not match."
                    })
                }
            } else {
                res.send({
                    "status": "failed",
                    "message": "You are not a registered user."
                })
            }
        } else {
            res.send({
                "status": "failed",
                "message": "All fields are required."
            })
        }
    } catch (error) {
        console.log("Unable to login", error);
    }
});

app.post('/api/register', async (req, res) => {
    const { name, email, password, password_confirmation, tc } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
        res.send({
            "status": "failed",
            "message": "User with this mail already exists."
        })
    } else {
        if (name && email && password && password_confirmation && tc) {
            if (password === password_confirmation) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt)
                    const newUser = new userModel({
                        name: name,
                        email: email,
                        password: hashPassword,
                        tc: tc
                    })
                    await newUser.save();
                    //Implementing JWT auth in the application 
                    const saved_user = await userModel.findOne({ email: email });
                    // Generate JWT token.
                    const token = jwt.sign({ userID: saved_user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });

                    res.status(201).send({ "status": "success", "message": "User registered successfully", "token": token })
                } catch (error) {
                    res.send({
                        "status": "failed",
                        "message": "Password and password confirmation does not match"

                    })
                }

            } else {
                res.send({ "status": "failed", "message": "Password does not match" })
            }
        } else {
            res.send({
                "status": "failed",
                "message": "All fields are required."
            })
        }
    }
})

/* ========================================= Login and Signup Implementation============================ */

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
