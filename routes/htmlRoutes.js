const path = require('path');
const router = require('express').Router();

//why doesnt page show? we call /notes and send the file using the propper path, confused
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/notes.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/index.html'));
});


module.exports = router;