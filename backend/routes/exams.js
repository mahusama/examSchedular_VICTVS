const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");

// get all exams - filtering & sort

router.get("/", async (req, res) => {
  try {
    const { candidate, country, status, sortBy, date } = req.query;
    let filter = {};
    if (candidate) filter.candidates = { $in: [candidate] }; // match inside array
    if (status) filter.status = status;
    if (country) filter["location.country"] = country;

    if (date) {
      const dateStart = new Date(date);
      const dateEnd = new Date(date);
      dateEnd.setDate(dateEnd.getDate() + 1);
      filter.datetime = { $gte: dateStart, $lt: dateEnd };
    }

    let query = Exam.find(filter);

    if (sortBy) {
      const sortOptions = {};
      sortOptions[sortBy] = 1;
      query = query.sort(sortOptions);
    }

    const exams = await query;
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id/advance", async (req, res) => {
  const exam = await Exam.findById(req.params.id);
  if (!exam) return res.status(404).json({ error: "Not found" });

  const order = ["Pending", "Started", "Finished"];
  const next = order[order.indexOf(exam.status) + 1];
  if (next) exam.status = next;

  await exam.save();
  res.json(exam);
});

module.exports = router;
