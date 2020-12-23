const express = require('express');
const ideas = express.Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');
  const checkMillionDollarIdea = require('./checkMillionDollarIdea');

module.exports = ideas;

ideas.use('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const ideaInfo = getFromDatabaseById('ideas', ideaId);
    if (ideaInfo) {
        req.ideaInfo = ideaInfo;
        next();
    } else {
        res.status(404).send();
    }
});

ideas.get('/', (req, res, next) => {
    const ideasArray = getAllFromDatabase('ideas');
    res.send(ideasArray);
});

ideas.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = req.body
    addToDatabase('ideas', newIdea);
    res.status(201).send(newIdea);
});

ideas.get('/:ideaId', (req, res, next) => {
    res.send(req.ideaInfo);
});

ideas.put('/:ideaId', (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

ideas.delete('/:ideaId', (req, res, next) => {
    deleteFromDatabasebyId('ideas', req.ideaInfo.id);
    res.status(204).send();
});