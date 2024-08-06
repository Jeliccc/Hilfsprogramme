const express = require('express');
const router = express.Router();
const PORT = 3000;

// GET Main Page // 
router.get('/', function(req, res, next) {
    res.render('main', { title: 'Express'});
});

module.exports = router;
