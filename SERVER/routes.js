const express = require('express');
const { signup, login, isAuth } = require('./auth.js');
const { addHighScore , displayHighScores} = require('./highscore.js');




const router = express.Router();

router.get('/highscores', displayHighScores);
router.post('/add-highscore', addHighScore);

router.post('/login', login);

router.post('/signup', signup);

router.get('/private', isAuth);

router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
});

// will match any other path
router.use('/', (req, res, next) => {
    res.status(404).json({ error: "page not found" });
});

module.exports = router;