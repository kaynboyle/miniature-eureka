const path = require('path');
const router = require('express').Router();
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

router.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname,'../db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;

        res.json(JSON.parse(data));
    });
});

router.post('/api/notes', (req, res) => {

    const newNote = req.body;
    newNote.id = uuidv4();

    return fs.readFile(path.join(__dirname,'../db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;

        const oldNotes = JSON.parse(data);
        oldNotes.push(newNote);

        fs.writeFile(path.join(__dirname,'../db/db.json'), JSON.stringify(oldNotes),'utf8', () => {
            res.json(newNote);
        });
    });
});

module.exports = router;