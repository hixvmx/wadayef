import axios from "axios";

export default axios.create({
    baseURL: 'https://yourparfums.com',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin' : '*',
    },
    withCredentials: true,
});
