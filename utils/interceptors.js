const axios = require('axios');

const onRequest = (config) => {
    // const token = localStorage.getItem("access_token");
    // if (token != null) {
        // config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return config;
};

const onRequestError = (error) => {
    return Promise.reject(error);
};

const onResponse = (response) => {
    return response;
};

const onResponseError = async (error) => {
    if (error.response) {
        // Access Token was expired
        if (
            error.response.status === 401
        ) {
            // const storedToken = localStorage.getItem("access_token");
            // console.log('*************JWT TOKEN EXPIRED !!****************')
            // try {
            //     const rs = await axios.post(`${API_URL}/auth/token`, {
            //         refresh_token: storedToken.refresh_token,
            //     });

            //     const { token, user } = rs.data;

            //     localStorage.setItem("jwtToken", JSON.stringify(token));
            //     localStorage.setItem("user", JSON.stringify(user));

            //     return;
            // } catch (_error) {
            //     return Promise.reject(_error);
            // }
        }
    }
    return Promise.reject(error);
};

const setupInterceptorsTo = (axiosInstance) => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
};

module.exports = setupInterceptorsTo