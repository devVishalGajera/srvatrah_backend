const mongoose = require("mongoose");

/**
 too save calender events 
 recurring events
 single events
 */

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  rrule: {
    freq: {
      type: String,
      enum: ["weekly", "monthly", "yearly", "daily"],
    },
    interval: {
      type: Number,
      default: 1,
    },
    dtstart
      : {
      type: String,
    },
    byhour: {
      type: [Number],
      default: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
      ],
    },
    count: {
      type: Number,
    },
    until: {
      type: String
    }
  },
  start_time: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimingAvailability",
    },
  ],
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
});

module.exports = mongoose.model("EventCalender", eventSchema);

/**
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
 */
