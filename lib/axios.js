import axios from "axios";

export default axios.create({
    baseURL: 'https://wadayef.hixvm.com',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});
