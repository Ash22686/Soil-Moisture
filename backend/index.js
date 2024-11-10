const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define schemas and models
const IrrigationSchema = new mongoose.Schema({
  delta: Number,
  timestamp: { type: Date, default: Date.now }
});

const Irrigation = mongoose.model('Irrigation', IrrigationSchema);

const FieldSchema = new mongoose.Schema({
  fieldArea: Number,
  fieldDepth: Number,
  waterRequired: Number,
  timestamp: { type: Date, default: Date.now },
});

const Field = mongoose.model('Field', FieldSchema);

// POST route for irrigation data
app.post('/api/irrigation', async (req, res) => {
  try {
    const { delta } = req.body;
    const newIrrigation = new Irrigation({ delta });
    await newIrrigation.save();
    res.status(201).json({ message: 'Irrigation data saved' });
  } catch (err) {
    console.error('Error saving irrigation data:', err);
    res.status(500).json({ message: 'Error saving irrigation data' });
  }
});

// POST route for field data
app.post("/api/field", async (req, res) => {
  try {
    const { fieldArea, fieldDepth, waterRequired } = req.body;
    const newField = new Field({ fieldArea, fieldDepth, waterRequired });
    await newField.save();
    res.status(201).json({ message: "Field data saved", data: newField });
  } catch (err) {
    console.error("Error saving Field data:", err);
    res.status(500).json({ message: "Error saving Field data" });
  }
});

// GET route for irrigation data
app.get('/api/irrigation', async (req, res) => {
  try {
    const irrigationData = await Irrigation.find().sort({ timestamp: -1 }).limit(10);
    res.json(irrigationData);
  } catch (err) {
    console.error('Error retrieving irrigation data:', err);
    res.status(500).json({ message: 'Error retrieving irrigation data' });
  }
});

// GET route for field data
app.get("/api/field", async (req, res) => {
  try {
    const fieldData = await Field.find().sort({ timestamp: -1 }).limit(10);
    res.json(fieldData);
  } catch (err) {
    console.error("Error retrieving field data:", err);
    res.status(500).json({ message: "Error retrieving field data" });
  }
});

// DELETE route for irrigation data by ID
app.delete('/api/irrigation/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIrrigation = await Irrigation.findByIdAndDelete(id);
    if (!deletedIrrigation) {
      return res.status(404).json({ message: 'Irrigation record not found' });
    }
    res.json({ message: 'Irrigation record deleted successfully' });
  } catch (err) {
    console.error('Error deleting irrigation data:', err);
    res.status(500).json({ message: 'Error deleting irrigation data' });
  }
});

// DELETE route for field data by ID
app.delete('/api/field/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedField = await Field.findByIdAndDelete(id);
    if (!deletedField) {
      return res.status(404).json({ message: 'Field record not found' });
    }
    res.json({ message: 'Field record deleted successfully' });
  } catch (err) {
    console.error('Error deleting field data:', err);
    res.status(500).json({ message: 'Error deleting field data' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
