const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  ID: Number,
  candidates: [String],
  title: String,
  status: { type: String, enum: ["Pending", "Started", "Finished"] },
  datetime: Date,
  language: String,
  location: {
    country: String,
    latitude: Number,
    longitude: Number
  }
});

module.exports = mongoose.model("Exam", examSchema);
