var axios = require('axios');

var config = {
    method: 'get',
    url: `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&certification_country=IN&with_original_language=hi&api_key=${process.env.API_KEY}`,
    headers: {}
};

const getMovies = () => {
    return axios(config)
}



module.exports = { getMovies }
