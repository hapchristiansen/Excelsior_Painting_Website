const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Adding initial log to see if the server is starting
console.log('Starting server...');

// Connect to MongoDB (Ensure MongoDB is running)
mongoose.connect('mongodb://localhost:27017/reviewsDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log('Connected to MongoDB');  // Log successful connection to MongoDB
}).catch((err) => {
    console.error('MongoDB connection error:', err);  // Log any errors connecting to MongoDB
});

// Define the Review schema
const reviewSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String,
    date: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

// API endpoint to get all reviews
app.get('/reviews', async (req, res) => {
    console.log('GET /reviews request received');
    const reviews = await Review.find();
    res.json(reviews);
});

// API endpoint to submit a new review
app.post('/reviews', async (req, res) => {
    const { name, rating, review } = req.body;
    console.log(`POST /reviews request received with data: ${name}, ${rating}, ${review}`);
    const newReview = new Review({ name, rating, review });
    await newReview.save();
    res.json({ message: 'Review submitted successfully' });
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');  // Log when the server is running
});
