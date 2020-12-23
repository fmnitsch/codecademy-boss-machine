const express = require('express');
const work = express.Router({mergeParams: true});
const {getAllFromDatabase,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    getWorkFromDatabase} = require('./db');

module.exports = work;


work.get('/', (req, res, next) => {
    const workArray = getWorkFromDatabase(req.minionInfo.id);
    res.status(200).send(workArray);
});
    
work.put('/:workId', (req, res, next) => {
    const minionDb = getAllFromDatabase('minions')
    const isValid = minionDb.find(minion => minion.id === req.body.minionId);
    if(!isValid) {
        return res.status(400).send();
    }
    
    const updatedWork = updateInstanceInDatabase('work', req.body);
    res.send(updatedWork);
});
    
work.post('/', (req, res, next) => {
    const newWork = req.body
    addToDatabase('work', newWork);
    res.status(201).send(newWork);
});
    
work.delete('/:workId', (req, res, next) => {
    deleteFromDatabasebyId('work', req.params.workId);
    res.status(204).send();
});
    

