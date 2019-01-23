const express = require('express');
const router = express.Router();

router.post('/', logout);

function logout(req, res, next) {

  res.statusCode = 200;
  res.send("Ok!");
}

module.exports = router;
