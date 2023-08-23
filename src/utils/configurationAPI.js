import axios from "axios";
const instance = axios.create({
    baseURL: 'https://server-ts-omega.vercel.app/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export {instance};
