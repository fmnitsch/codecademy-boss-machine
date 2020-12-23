const express = require('express');
const meetings = express.Router();

const {
    createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
  } = require('./db');

  module.exports = meetings;

meetings.get('/', (req, res, next) => {
    const meetingsArray = getAllFromDatabase('meetings');
    res.send(meetingsArray);
});

meetings.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

meetings.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});