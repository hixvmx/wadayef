import axios from "axios";

export default axios.create({
    baseURL: 'https://yourparfums.com',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});