const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // For environment variables

const app = express();
app.use(express.json()); // To parse incoming JSON requests
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema for irrigation data with delta
const IrrigationSchema = new mongoose.Schema({
  fieldArea: Number,
  fieldDepth: Number,
  waterRequired: Number,
  delta: Number, // Add delta to schema
  timestamp: { type: Date, default: Date.now }
});

// Create a model for the irrigation data
const Irrigation = mongoose.model('Irrigation', IrrigationSchema);

// Define a POST route to store irrigation data with delta
app.post('/api/irrigation', async (req, res) => {
  try {
    const { fieldArea, fieldDepth, waterRequired, delta } = req.body;

    // Create a new irrigation entry
    const newIrrigation = new Irrigation({
      fieldArea,
      fieldDepth,
      waterRequired,
      delta // Save delta value
    });

    // Save the data in MongoDB
    await newIrrigation.save();

    // Send a success response
    res.status(201).json({ message: 'Irrigation data saved' });
  } catch (err) {
    console.error('Error saving irrigation data:', err);
    res.status(500).json({ message: 'Error saving irrigation data' });
  }
});

// Define a GET route to retrieve irrigation data
app.get('/api/irrigation', async (req, res) => {
  try {
    const irrigationData = await Irrigation.find().sort({ timestamp: -1 }).limit(10); // Limit to last 10 records
    res.json(irrigationData);
  } catch (err) {
    console.error('Error retrieving irrigation data:', err);
    res.status(500).json({ message: 'Error retrieving irrigation data' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
