const mongoose = require("mongoose");
const fs = require("fs");
const Exam = require("./models/Exam"); // import model

mongoose.connect("mongodb+srv://mahnoor:USMA@cluster0.ccmqiyy.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

async function insertData() {
  const data = JSON.parse(fs.readFileSync("exam-schedule-data.json"));
  await Exam.deleteMany({});
  await Exam.insertMany(data);
  console.log("Data sinserted successfully!");
  mongoose.disconnect();
}

insertData();
