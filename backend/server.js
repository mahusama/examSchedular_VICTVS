const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const examRoutes = require("./routes/exams"); 


const app = express();
const MONGO_URI = "mongodb+srv://mahnoor:USMA@cluster0.ccmqiyy.mongodb.net/"
app.use(cors());
app.use(express.json());


mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("Error occured while connecting", err));

app.use("/api/exams", examRoutes);
app.listen(5000, () => console.log("Server running on port 5000"));
