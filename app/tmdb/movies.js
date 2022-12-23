var axios = require('axios');
const getMovies = (page, lang) => {
    let language = lang || 'te'
    let pg = page || 1
    console.log('fetching with p & l', pg, language)
    let url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&certification_country=IN&with_original_language=${language}&page=${pg}&api_key=${process.env.API_KEY}`
    return axios.get(url)
}

module.exports = { getMovies }
