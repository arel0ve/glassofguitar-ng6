const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {

    req.session.user = null;

    res.statusCode = 200;
    res.send("Ok!");
});

module.exports = router;