const express = require('express');
const { restart } = require('nodemon');
const minions = express.Router();


const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    getWorkFromDatabase,
  } = require('./db');

module.exports = minions;

minions.param('minionId', (req, res, next, id) => {
    const minionId = id;
    const minionInfo = getFromDatabaseById('minions', minionId)
    if (minionInfo) {
        req.minionInfo = minionInfo;
        next();
    } else {
        res.status(404).send();
    }
});


minions.get('/', (req, res, next) => {
    const minionsArray = getAllFromDatabase('minions');
    res.send(minionsArray);
});

minions.post('/', (req, res, next) => {
    const newMinion = req.body
    addToDatabase('minions', newMinion);
    res.status(201).send(newMinion);
});

minions.get('/:minionId', (req, res, next) => {
        res.send(req.minionInfo);
        next();
});


minions.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
    next();
});

minions.delete('/:minionId', (req, res, next) => {
    deleteFromDatabasebyId('minions', req.minionInfo.id);
    res.status(204).send();
    next();
});

const work = require('./work');
minions.use('/:minionId/work', work);
