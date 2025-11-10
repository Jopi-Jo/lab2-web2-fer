const express = require('express');
const router = express.Router();
const Query = require('../models/QueryModel');

router.post('/', async (req, res) => {
  try {

    const result = await Query.fetchUserByQuery(req.body.field,req.body.checked);
    return res.json({ message: result, check: req.body.checked });

  } catch (err) {
    console.error("Submit Data Error:", err);
    return res.status(500).json({ error: "Internal server error", detail: err.message });
  }
});

module.exports = router;
