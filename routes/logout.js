const express = require('express');
const router = express.Router();

router.post('/', logout);

function logout(req, res, next) {

  res.status(200).json({
    status: 'ok',
    message: 'Logout successful'
  })
}

module.exports = router;
