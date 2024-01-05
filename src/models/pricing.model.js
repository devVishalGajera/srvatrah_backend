const mongoose = require("mongoose");

/**
 const categories = [
    { label: 'Adult' },
    { label: 'Child' },
    { label: 'Teenager' },
    { label: 'Infant' },
    { label: 'Senior' },
    { label: 'Student' },
    { label: 'Military' },
    { label: 'Group' },
    { label: 'Other' },
];
 */
const pricingSchema = new mongoose.Schema({
  ticket_category: {
    type: String,
    required: true,
    enum: [
      "adult",
      "child",
      "teenager",
      "infant",
      "senior",
      "student",
      "military",
      "group",
      "other",
    ],
    default: "adult",
  },
  occupancy: {
    type: Number,
    required: true,
  },
  min_age: {
    type: Number,
    required: true,
    default: 13,
  },
  max_age: {
    type: Number,
    required: true,
    default: 50,
  },
});

module.exports = mongoose.model("Pricing", pricingSchema);
