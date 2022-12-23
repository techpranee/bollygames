var express = require('express');
var router = express.Router();
var cache = require('express-redis-cache')({ prefix: 'test', expire: 60000000 });
let { getMovies } = require("../app/tmdb/movies");


/* GET home page. */
router.get('/', async function (req, res, next) {
  let resp = await getMovies();
  data = JSON.parse(JSON.stringify(resp.data))
  res.render('index', { movies: data.results });
});
/* GET home page. */
router.get('/movies', cache.route({
  expire: {
    200: 60000000,
    xxx: 1
  }
}), async function (req, res, next) {
  try {
    let { page, lang } = req.query
    let resp = await getMovies(page, lang);
    data = JSON.parse(JSON.stringify(resp.data))
    res.json(data);
  } catch (error) {
    next(error)
  }
});





module.exports = router;
