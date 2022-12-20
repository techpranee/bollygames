var express = require('express');
var router = express.Router();
let { getMovies } = require("../app/tmdb/movies");

let participants = [
  "bobby",
  "suchi",
  "sandhya",
  "sneha",
  "nikki",
  "pranee",
  "preeti",
  "sravya",
  "aaryan",
  "akshara",
  "nayra"
]

let confirmedParticipants = []

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { participants: participants });
});
/* GET home page. */
router.get('/movies', async function (req, res, next) {
  try {
    let resp = await getMovies();
    data = JSON.parse(JSON.stringify(resp.data))
    res.json(data);
  } catch (error) {
    next(error)
  }
});

router.get('/getunconfirmed', async function (req, res, next) {
  res.render('index', { participants: participants });
});
router.post('/confirm', async function (req, res, next) {
  confirmedParticipants = [...confirmedParticipants, req.body.par]
  res.send(req.body.par)
});
router.get('/sravy', async function (req, res, next) {
  let remainingParticipants = participants.filter(p => confirmedParticipants.indexOf(p) === -1)
  res.render('sravy', { participants: remainingParticipants });
});




module.exports = router;
