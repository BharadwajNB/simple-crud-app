const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products.route');

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb+srv://bharadwajapi:bharath@api.0z3q3uf.mongodb.net/todolist?retryWrites=true&w=majority&appName=api")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB Error:", err));

// Routes
app.use('/api/product', productRoutes);

// Server
const port = 1200;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
