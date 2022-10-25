var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var Remark = require('../models/remark');
//fetch the event
router.get('/', function (req, res, next) {
  Event.find({}, (err, events) => {
    if (err) return next(err);
    res.render('event.ejs', { events: events });
  });
});

router.get('/new', function (req, res, next) {
  res.render('addEvent.ejs');
});

//saving the data
router.post('/', function (req, res, next) {
  Event.create(req.body, (err, addedevent) => {
    if (err) return next(err);
    res.redirect('/events');
  });
});

//fetch single event

router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  Event.findById(id)
    .populate('remarks')
    .exec((err, event) => {
      if (err) return next(err);
      res.render('eventDetails.ejs', { event: event });
    });
});

//update event form
router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Event.findById(id, (err, event) => {
    if (err) return next(err);
    res.render('editEvent.ejs', { event: event });
  });
});

// update event
router.post('/:id/', (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id, req.body, (err, updatedevent) => {
    if (err) return next(err);
    res.redirect('/events/' + id);
  });
});
module.exports = router;

//delete event
router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndDelete(id, (err, event) => {
    if (err) return next(err);
    res.redirect('/events');
  });
});

//increment likes
router.get('/:id/inc', (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, event) => {
    if (err) return next(err);
    res.redirect('/events/' + id);
  });
});

//adding remarks
router.post('/:id/remarks', (req, res, next) => {
  var id = req.params.id;
  req.body.eventId = id;
  Remark.create(req.body, (err, remark) => {
    if (err) return next(err);
    Event.findByIdAndUpdate(
      id,
      { $push: { remarks: remark._id } },
      (err, updatedevent) => {
        if (err) return next(err);
        res.redirect('/events/' + id);
      }
    );
  });
});
