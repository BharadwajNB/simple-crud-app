const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products.route');
const path = require('path');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB
mongoose.connect("mongodb+srv://bharadwajapi:bharath@api.0z3q3uf.mongodb.net/todolist?retryWrites=true&w=majority&appName=api")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB Error:", err));

// use routes
app.use('/', productRoutes);

// start server
const port = 2000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
