var express = require('express');
var router = express.Router();
var Event = require('../models/event');

/* GET about page. */
router.get('/', function (req, res, next) {
  res.render('about.ejs');
});

module.exports = router;
