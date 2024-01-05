const mongoose = require("mongoose");

const timing_availabilitySchema = new mongoose.Schema({
  start_time: {
    type: String,
    required: true,
  },
  duration: {
    hours: {
      type: Number,
      required: true,
    },
    minutes: {
      type: Number,
      required: true,
    },
  },
  internal_label: {
    type: String,
  },
  external_label: {
    type: String,
  },
  product_code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "timing_availability",
  timing_availabilitySchema
);
