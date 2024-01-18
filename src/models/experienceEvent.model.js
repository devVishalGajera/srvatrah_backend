const mongoose = require("mongoose");

/**
 too save calender events 
 recurring events
 single events
 */

const eventSchema = new mongoose.Schema({
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  start_time: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TimingAvailability",
  },
  recurring: {
    type: String,
    enum: [
      "weekly",
      "specific_date",
      "between_two_dates",
      "monthly_selected_days",
    ],
    default: "specific_date",
  },
  recurringDetails: {
    daysOfWeek: [
      {
        type: String,
        enum: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },
    ],
    startDate: { type: Date },
    endDate: { type: Date },
    selectedMonth: { type: String },
    selectedDays: [{ type: Number }],
    participant: {
      minimum: {
        type: Number,
        default: 1,
      },
      maximum: {
        type: Number,
        default: 15,
      },
    },
  },
});

module.exports = mongoose.model("Event", eventSchema);