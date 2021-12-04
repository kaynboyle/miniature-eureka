const path = require('path');
const router = require('express').Router();
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

router.get('/api/notes', (req, res) => {
    //what we want to be displayed on notes is stored in db.json
    fs.readFile(path.join(__dirname,'../db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        //need else? no? why not
        //respnds with the stringified version of the json parsed data are
        //inside of the db.json file
        res.json(JSON.parse(data));
    });
});

router.post('/api/notes', (req, res) => {

    ///req body?? request body ?? being the body of html???
    const newNote = req.body;
    newNote.id = uuidv4();

    return fs.readFile(path.join(__dirname,'../db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;

        const oldNotes = JSON.parse(data);
        oldNotes.push(newNote);

        fs.writeFile(path.join(__dirname,'../db/db.json'), JSON.stringify(oldNotes),'utf8', () => {
            res.json(newNote);
            // res.json(newNote.filter( el => el.id !== newNote.id));
        });
        // fs.unlink(path.join(__dirname,'../db/db.json'), )
        
    });
});
router.delete('/api/notes/:id', (req, res) => {
    console.log("deleting");
    const idtoDelete = req.params.id;  
    console.log(idtoDelete);
    // ///req body?? request body ?? being the body of html???
    // const newNote = req.body;
    // newNote.id = uuidv4();

    // return fs.readFile(path.join(__dirname,'../db/db.json'), 'utf8', (err, data) => {
    //     if (err) throw err;

    //     const oldNotes = JSON.parse(data);
    //     oldNotes.push(newNote);

    //     fs.writeFile(path.join(__dirname,'../db/db.json'), JSON.stringify(oldNotes),'utf8', () => {
    //         res.json(newNote);
    //         // res.json(newNote.filter( el => el.id !== newNote.id));
    //     });
        // fs.unlink(path.join(__dirname,'../db/db.json'), )
        
    // });
});

module.exports = router;