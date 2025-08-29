const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }, // store icon name or ID string
  count: { type: String, required: true }, // e.g., "12,450"
  description: { type: String, required: true },
  color: { type: String, required: true },   // Tailwind color class
  bgColor: { type: String, required: true }  // Tailwind bg class
});

module.exports = mongoose.model("Category",categorySchema);