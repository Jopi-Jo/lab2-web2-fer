const express = require('express');
const router = express.Router();
const Query = require('../models/QueryModel');

router.use(express.json())
// Sample route to handle the submitted data
router.post('/', async (req, res) => {
  let checked = req.body.checked
  let result = await Query.fetchUserByQuery(req.body.field,req.body.checked)
  //console.log(req.body.checked)
  res.json({ message: result, check: checked});
});


module.exports = router;


