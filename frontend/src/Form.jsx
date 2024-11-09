import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

function Form() {
  const [formData, setFormData] = useState({
    fieldArea: '',
    fieldDepth: '',
    waterRequired: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/irrigation', formData);
      console.log('Data sent to MongoDB:', response.data);
      alert('Data submitted successfully!');
    } catch (error) {
      console.error('Error sending data to backend:', error);
      alert('Failed to submit data.');
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center back">
      <div className="relative w-full max-w-2xl px-6 sm:px-10 md:px-16 lg:px-20"> {/* Updated max-width */}
        <form
          className="relative bg-opacity-80 p-6 md:p-10 rounded-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl md:text-3xl text-white font-semibold  text-center whitespace-nowrap overflow-hidden overflow-ellipsis pb-16">
            Irrigation Data Submission
          </h1>
          <div className="space-y-4 md:space-y-5">
            <input
              type="number"
              name="fieldArea"
              value={formData.fieldArea}
              onChange={handleChange}
              className="py-4 px-6 block w-full border border-gray-200 rounded-full text-sm backdrop-blur-md bg-transparent placeholder-white text-white" // Increased padding and changed width style
              placeholder="Field Area (in acres)"
              required
            />
            <input
              type="number"
              name="fieldDepth"
              value={formData.fieldDepth}
              onChange={handleChange}
              className="py-4 px-6 block w-full border border-gray-200 rounded-full text-sm backdrop-blur-md bg-transparent placeholder-white text-white"
              placeholder="Field Depth (in cm)"
              required
            />
            <input
              type="number"
              name="waterRequired"
              value={formData.waterRequired}
              onChange={handleChange}
              className="py-4 px-6 block w-full border border-gray-200 rounded-full text-sm backdrop-blur-md bg-transparent placeholder-white text-white"
              placeholder="Water Required for Crop (in liters)"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-custombutton w-full text-white py-3 rounded-full text-lg mt-12"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
