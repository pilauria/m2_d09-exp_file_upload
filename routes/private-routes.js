const express = require('express');
const router = express.Router();

const multerUploader = require('../middleware/multerUploader');

const Room = require('./../models/Room.model');

router.get('/profile', (req, res) => {
  res.render('private/profile', { user: req.session.currentUser });
});

router.get('/rooms/add', (req, res) => {
  res.render('rooms/new-room');
});

router.post('/rooms/add', multerUploader.single(imgUrl), (req, res) => {
  //Get the user id from the session
  const userId = req.session.currentUser._id;

  //Get the form data from the body
  const { name, description } = req.body;

  const { path: imgUrl } = req.file; // simpler way is:  const imgUrl = req.file.path

  Room.create({
    name,
    description,
    owner: userId,
  })
    .then(createdRoom => {
      console.log(createdRoom);
      res.redirect('/private/rooms/add');
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
