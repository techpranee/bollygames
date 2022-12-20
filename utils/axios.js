const axios = require('axios');
const { BASE_URL } = require('../secrets')
const setupInterceptorsTo = require('./interceptors')

const Axios = setupInterceptorsTo(axios.create({
    baseURL: BASE_URL,
    params: { api_key: '30578880989d317a3d751c8055e6fec9' },
    headers: {
        "Content-Type": "application/json",
    },
}));

Axios.interceptors.request.use((req) => {
    // const token = localStorage.getItem("access_token");
    // req.headers.Authorization = token ? `Bearer ${token}` : "";
    return req;
});

module.exports = { Axios };